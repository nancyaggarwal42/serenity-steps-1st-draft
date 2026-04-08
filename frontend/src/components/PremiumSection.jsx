// light mode
// const FEATURES = [
//   { avatar: '🧑‍⚕️', name: 'Expert Counsellors', post: 'Certified Therapist',   desc: 'Book 1-on-1 sessions with addiction recovery specialists from the comfort of your home.' },
//   { avatar: '👥',    name: 'Support Groups',      post: 'Community Circles',    desc: 'Join anonymous peer groups for your addiction type. Share, listen, and heal together.'  },
//   { avatar: '📊',    name: 'Advanced Analytics',  post: 'Progress Insights',    desc: 'Deep-dive reports on your habit patterns, streaks, and weekly recovery trends.'          },
//   { avatar: '🔔',    name: 'Smart Reminders',     post: 'AI-Powered Nudges',    desc: 'Personalised reminders at your weakest moments based on your usage patterns.'           },
// ];

// export default function PremiumSection() {
//   return (
//     <section>
//       <div style={s.header}>
//         <div>
//           <h2 style={s.title}>Premium Features</h2>
//           <p style={s.sub}>Unlock advanced tools for faster recovery</p>
//         </div>
//         <div style={s.comingSoon}>Coming Soon</div>
//       </div>

//       <div style={s.grid}>
//         {FEATURES.map((f, i) => (
//           <div key={i} style={s.card}>
//             <div style={s.avatarWrap}>
//               <span style={s.avatar}>{f.avatar}</span>
//             </div>
//             <div style={s.info}>
//               <p style={s.name}>{f.name}</p>
//               <p style={s.post}>{f.post}</p>
//               <p style={s.desc}>{f.desc}</p>
//             </div>
//             <button style={s.btn} disabled>Unlock</button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// const s = {
//   header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
//   title:      { fontSize: 18, fontWeight: 700, margin: '0 0 2px', color: '#1a1a1a' },
//   sub:        { fontSize: 12, color: '#999', margin: 0 },
//   comingSoon: { background: '#fff3cd', color: '#856404', padding: '5px 13px', borderRadius: 20, fontSize: 12, fontWeight: 700 },
//   grid:       { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 },
//   card:       { background: '#fff', borderRadius: 14, padding: '18px 16px', display: 'flex', alignItems: 'flex-start', gap: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' },
//   avatarWrap: { width: 48, height: 48, borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
//   avatar:     { fontSize: 22 },
//   info:       { flex: 1 },
//   name:       { fontWeight: 700, fontSize: 14, margin: '0 0 2px', color: '#1a1a1a' },
//   post:       { fontSize: 11, color: '#2d6a4f', fontWeight: 600, margin: '0 0 6px' },
//   desc:       { fontSize: 12, color: '#777', margin: 0, lineHeight: 1.55 },
//   btn:        { marginTop: 4, padding: '6px 14px', borderRadius: 8, background: '#f5f5f5', color: '#bbb', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'not-allowed', flexShrink: 0 },
// };

// dark mode
const FEATURES = [
  { avatar: '🧑‍⚕️', name: 'Expert Counsellors', post: 'Certified Therapist',   desc: 'Book 1-on-1 sessions with addiction recovery specialists from the comfort of your home.' },
  { avatar: '👥',    name: 'Support Groups',      post: 'Community Circles',    desc: 'Join anonymous peer groups for your addiction type. Share, listen, and heal together.'  },
  { avatar: '📊',    name: 'Advanced Analytics',  post: 'Progress Insights',    desc: 'Deep-dive reports on your habit patterns, streaks, and weekly recovery trends.'          },
  { avatar: '🔔',    name: 'Smart Reminders',     post: 'AI-Powered Nudges',    desc: 'Personalised reminders at your weakest moments based on your usage patterns.'           },
];

export default function PremiumSection() {
  return (
    <section style={s.section}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Premium Features</h2>
          <p style={s.sub}>Unlock advanced tools for faster recovery</p>
        </div>
        <div style={s.comingSoon}>Coming Soon</div>
      </div>

      <div style={s.grid}>
        {FEATURES.map((f, i) => (
          <div key={i} style={s.card}>
            <div style={s.avatarWrap}>
              <span style={s.avatar}>{f.avatar}</span>
            </div>
            <div style={s.info}>
              <p style={s.name}>{f.name}</p>
              <p style={s.post}>{f.post}</p>
              <p style={s.desc}>{f.desc}</p>
            </div>
            <button style={s.btn} disabled>Unlock</button>
          </div>
        ))}
      </div>
    </section>
  );
}

const s = {
  section:    { background: '#12151f', borderRadius: 20, padding: 20, border: '1px solid #2a2d3a' },
  header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  title:      { fontSize: 18, fontWeight: 700, margin: '0 0 2px', color: '#e8eaf0' },
  sub:        { fontSize: 12, color: '#6b7280', margin: 0 },
  comingSoon: { background: '#2d2410', color: '#f59e0b', padding: '5px 13px', borderRadius: 20, fontSize: 12, fontWeight: 700, border: '1px solid #5a4010' },
  grid:       { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 },
  card:       { background: '#1a1d27', borderRadius: 14, padding: '18px 16px', display: 'flex', alignItems: 'flex-start', gap: 14, border: '1px solid #2a2d3a' },
  avatarWrap: { width: 48, height: 48, borderRadius: '50%', background: '#102d18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  avatar:     { fontSize: 22 },
  info:       { flex: 1 },
  name:       { fontWeight: 700, fontSize: 14, margin: '0 0 2px', color: '#e8eaf0' },
  post:       { fontSize: 11, color: '#52b788', fontWeight: 600, margin: '0 0 6px' },
  desc:       { fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.55 },
  btn:        { marginTop: 4, padding: '6px 14px', borderRadius: 8, background: '#0f1117', color: '#3a3d4a', border: '1px solid #2a2d3a', fontSize: 12, fontWeight: 600, cursor: 'not-allowed', flexShrink: 0 },
};