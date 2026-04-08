import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Choice from './pages/Choice';
import KnowAddiction from './pages/KnowAddiction';
import Quiz from './pages/Quiz';
import Profile from './components/Profile';
import Dashboard from './pages/Dashboard';
import RewardStrip from './components/RewardStrip';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/choice" element={<PrivateRoute><Choice /></PrivateRoute>} />
          <Route path="/know-addiction" element={<PrivateRoute><KnowAddiction /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/register" />} />
          <Route path="/rewards" element={<PrivateRoute><RewardStrip /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}