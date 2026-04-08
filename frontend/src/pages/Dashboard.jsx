// import React from 'react'
// import Tasks from '../components/Tasks'
// import Rewards from '../components/Rewards'
// import { useAuth } from '../context/AuthContext';

// import { useNavigate } from 'react-router-dom';


// const Dashboard = () => {
//       const { user, logout } = useAuth();
    
//       const navigate = useNavigate();
    
//   return (
//     <div>
//       <Tasks />
//       <Rewards />
//     </div>
//   )
// }

// const styles = {
//   avatar: { width: 72, height: 72, borderRadius: '50%', background: '#2d6a4f', color: '#fff', fontSize: 30, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
// }

// export default Dashboard


// light mode
// import { useAuth } from '../context/AuthContext';
// import Navbar         from '../components/Navbar';
// import QuoteCard      from '../components/QuoteCard';
// import GeneralTasks   from '../components/GeneralTasks';
// import RewardStrip    from '../components/RewardStrip';
// import PremiumSection from '../components/PremiumSection';
// import Tasks from '../components/Tasks';

// export default function Dashboard() {
//   const { user } = useAuth();

//   const hour     = new Date().getHours();
//   const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

//   return (
//     <div style={s.page}>
//       <Navbar />

//       <div style={s.content}>

//         {/* Greeting */}
//         <div>
//           <h1 style={s.greetText}>{greeting}, {user?.name?.split(' ')[0]} 👋</h1>
//           <p style={s.greetSub}>Here's your daily wellness dashboard</p>
//         </div>

//         {/* Quote */}
//         <QuoteCard />

//         <Tasks />

//         {/* General daily tasks */}
//         <GeneralTasks />

//         {/* Reward strip — click to go to full rewards page */}
//         <div>
//           <h2 style={s.stripTitle}>Weekly Rewards</h2>
//           <RewardStrip />
//         </div>

//         {/* Premium features */}
//         <PremiumSection />

//       </div>
//     </div>
//   );
// }

// const s = {
//   page:      { minHeight: '100vh', background: 'black' },
//   content:   { maxWidth: 880, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 28 },
//   greetText: { fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: '#1a1a1a' },
//   greetSub:  { color: '#999', margin: 0, fontSize: 14 },
//   stripTitle:{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: '#1a1a1a' },
// };


// dark mode
import { useAuth } from '../context/AuthContext';
import Navbar         from '../components/Navbar';
import QuoteCard      from '../components/QuoteCard';
import GeneralTasks   from '../components/GeneralTasks';
import RewardStrip    from '../components/RewardStrip';
import PremiumSection from '../components/PremiumSection';
import Tasks          from '../components/Tasks';

export default function Dashboard() {
  const { user } = useAuth();

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.content}>

        {/* Greeting */}
        <div>
          <h1 style={s.greetText}>{greeting}, {user?.name?.split(' ')[0]} 👋</h1>
          <p style={s.greetSub}>Here's your daily wellness dashboard</p>
        </div>

        {/* Quote */}
        <QuoteCard />

        {/* Addiction-specific tasks */}
        <Tasks />

        {/* General daily tasks */}
        <GeneralTasks />

        {/* Reward strip */}
        <div>
          <h2 style={s.stripTitle}>Weekly Rewards</h2>
          <RewardStrip />
        </div>

        {/* Premium features */}
        <PremiumSection />

      </div>
    </div>
  );
}

const s = {
  page:       { minHeight: '100vh', background: '#0f1117' },
  content:    { maxWidth: 880, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 28 },
  greetText:  { fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: '#e8eaf0' },
  greetSub:   { color: '#6b7280', margin: 0, fontSize: 14 },
  stripTitle: { fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: '#e8eaf0' },
};