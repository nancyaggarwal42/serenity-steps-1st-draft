// light mode
// import Tasks from '../components/Tasks';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const ADDICTION_COLORS = {
//   'Social Media': '#3498db', 'Gaming': '#9b59b6', 'Alcohol': '#e67e22',
//   'Smoking': '#95a5a6', 'Online Shopping': '#e91e63', 'Pornography': '#e74c3c',
// };

// export default function Profile() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => { logout(); navigate('/login'); };

//   return (
//     <div style={styles.container}>
//       <nav style={styles.nav}>
//         <span style={styles.logo}>Serenity Steps</span>
//         <div style={styles.navLinks}>
//           <button style={{...styles.navBtn, border: '2px solid black', borderRadius: '8px', padding: '8px 16px', backgroundColor: 'transparent', transition: 'all 0.3s ease'}} onClick={() => navigate('/dashboard')}>Dashboard</button>
//           <button style={{ ...styles.navBtn, color: '#e74c3c', border: 'none' }} onClick={handleLogout}>Logout</button>
//         </div>
//       </nav>
//       <div style={styles.content}>
//         <div style={styles.card}>
//           <div style={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
//           <h2 style={styles.name}>{user?.name}</h2>
//           <p style={styles.meta}>📧 {user?.email}</p>
//           <p style={styles.meta}>🎂 Age: {user?.age}</p>
//           <p style={styles.meta}>⚧ Gender: {user?.gender}</p>
//         </div>
//         <div style={styles.card}>
//           <h3 style={styles.sectionTitle}>Your Identified Addictions</h3>
//           {user?.addictions?.length > 0 ? (
//             <div style={styles.tagRow}>
//               {user.addictions.map(a => (
//                 <span key={a} style={{ ...styles.tag, background: ADDICTION_COLORS[a] || '#666' }}>{a}</span>
//               ))}
//             </div>
//           ) : (
//             <p style={{ color: '#888' }}>No addictions identified yet.</p>
//           )}
//         </div>
//       </div>
      
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: '100vh', background: '#f0f4f8' },
//   nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
//   logo: { fontSize: 20, fontWeight: 700, color: '#2d6a4f' },
//   navLinks: { display: 'flex', gap: 8 },
//   navBtn: { padding: '8px 16px', color:'black' ,  background: 'transparent', fontWeight: 500, cursor: 'pointer', fontSize: 15 },
//   content: { maxWidth: 640, margin: '40px auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 20 },
//   card: { background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' },
//   avatar: { width: 72, height: 72, borderRadius: '50%', background: '#2d6a4f', color: '#fff', fontSize: 30, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
//   name: { fontSize: 22, fontWeight: 700, margin: '0 0 8px' },
//   meta: { color: '#555', margin: '4px 0' },
//   sectionTitle: { fontSize: 18, fontWeight: 600, marginBottom: 16 },
//   tagRow: { display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
//   tag: { padding: '8px 18px', borderRadius: 20, color: '#fff', fontWeight: 600, fontSize: 14 },
// };

// dark mode
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ADDICTION_COLORS = {
  'Social Media':    '#3b82f6',
  'Gaming':          '#a855f7',
  'Alcohol':         '#f97316',
  'Smoking':         '#22c55e',
  'Online Shopping': '#ec4899',
  'Pornography':     '#ef4444',
};

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <span style={styles.logo}>Serenity Steps</span>
        <div style={styles.navLinks}>
          <button
            style={styles.dashBtn}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div style={styles.content}>
        {/* Profile card */}
        <div style={styles.card}>
          <div style={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <h2 style={styles.name}>{user?.name}</h2>
          <p style={styles.meta}> {user?.email}</p>
          <p style={styles.meta}> Age: {user?.age}</p>
          <p style={styles.meta}>Gender: {user?.gender}</p>
        </div>

        {/* Addictions card */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Your Identified Addictions</h3>
          {user?.addictions?.length > 0 ? (
            <div style={styles.tagRow}>
              {user.addictions.map(a => (
                <span key={a} style={{ ...styles.tag, background: ADDICTION_COLORS[a] || '#3a3d4a' }}>{a}</span>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6b7280' }}>No addictions identified yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container:    { minHeight: '100vh', background: '#0f1117' },
  nav:          { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: '#12151f', borderBottom: '1px solid #2a2d3a' },
  logo:         { fontSize: 20, fontWeight: 700, color: '#52b788' },
  navLinks:     { display: 'flex', gap: 8, alignItems: 'center' },
  dashBtn:      { padding: '8px 16px', color: '#e8eaf0', background: 'transparent', border: '2px solid #2a2d3a', borderRadius: 8, fontWeight: 500, cursor: 'pointer', fontSize: 15, transition: 'border-color 0.2s' },
  logoutBtn:    { padding: '8px 16px', color: '#ef4444', background: 'transparent', border: 'none', fontWeight: 500, cursor: 'pointer', fontSize: 15 },
  content:      { maxWidth: 640, margin: '40px auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 20 },
  card:         { background: '#1a1d27', borderRadius: 16, padding: 32, border: '1px solid #2a2d3a', textAlign: 'center' },
  avatar:       { width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #1b4332, #2d6a4f)', color: '#fff', fontSize: 30, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  name:         { fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: '#e8eaf0' },
  meta:         { color: '#9ca3af', margin: '4px 0' },
  sectionTitle: { fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#e8eaf0' },
  tagRow:       { display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  tag:          { padding: '8px 18px', borderRadius: 20, color: '#fff', fontWeight: 600, fontSize: 14 },
};