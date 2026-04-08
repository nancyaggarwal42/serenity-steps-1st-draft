// light mode
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function GeneralTasks() {
//   const [tasks,   setTasks]   = useState([]);
//   const [stats,   setStats]   = useState({ total: 0, completed: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/general-tasks')
//       .then(r => {
//         setTasks(r.data.tasks);
//         setStats({ total: r.data.total, completed: r.data.completed });
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   const toggle = async (id) => {
//     const { data } = await axios.patch(`http://localhost:5000/api/general-tasks/${id}/complete`);
//     setTasks(prev => prev.map(t => t._id === id ? { ...t, completed: data.completed } : t));
//     setStats(prev => ({ ...prev, completed: prev.completed + (data.completed ? 1 : -1) }));
//   };

//   const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

//   return (
//     <section>
//       {/* Header */}
//       <div style={s.header}>
//         <div>
//           <h2 style={s.title}>Daily Tasks</h2>
//           <p style={s.sub}>Same wellness habits — every day</p>
//         </div>
//         <div style={s.badge}>{stats.completed}/{stats.total} done</div>
//       </div>

//       {/* Progress bar */}
//       <div style={s.track}>
//         <div style={{ ...s.fill, width: `${pct}%` }} />
//       </div>

//       {/* Grid */}
//       {loading ? (
//         <div style={s.grid}>
//           {Array(7).fill(0).map((_, i) => <div key={i} style={s.skeleton} />)}
//         </div>
//       ) : (
//         <div style={s.grid}>
//           {tasks.map(task => (
//             <div
//               key={task._id}
//               style={{ ...s.card, background: task.completed ? '#d5f0e0' : '#fff', border: `2px solid ${task.completed ? '#52b788' : '#ebebeb'}` }}
//               onClick={() => toggle(task._id)}
//             >
//               <span style={s.icon}>{task.icon}</span>
//               <p style={{ ...s.taskTitle, color: task.completed ? '#1a6b3a' : '#1a1a1a', textDecoration: task.completed ? 'line-through' : 'none' }}>
//                 {task.title}
//               </p>
//               <p style={s.desc}>{task.description}</p>
//               <div style={{ ...s.chip, background: task.completed ? '#52b788' : '#f0f0f0', color: task.completed ? '#fff' : '#888' }}>
//                 {task.completed ? '✓ Completed' : 'Tap to complete'}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* All done banner */}
//       {!loading && pct === 100 && (
//         <div style={s.allDone}>🎉 All daily habits done! You're on a great streak.</div>
//       )}
//     </section>
//   );
// }

// const s = {
//   header:    { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
//   title:     { fontSize: 18, fontWeight: 700, margin: '0 0 2px', color: '#1a1a1a' },
//   sub:       { fontSize: 12, color: '#999', margin: 0 },
//   badge:     { background: '#d5f0e0', color: '#1a6b3a', padding: '5px 13px', borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' },
//   track:     { height: 7, background: '#e8e8e8', borderRadius: 4, overflow: 'hidden', marginBottom: 18 },
//   fill:      { height: '100%', background: 'linear-gradient(90deg, #52b788, #2d6a4f)', borderRadius: 4, transition: 'width 0.4s ease' },
//   grid:      { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 },
//   card:      { borderRadius: 14, padding: '16px 14px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', display: 'flex', flexDirection: 'column', gap: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
//   icon:      { fontSize: 26 },
//   taskTitle: { fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.4 },
//   desc:      { fontSize: 11, color: '#888', margin: 0, lineHeight: 1.5, flex: 1 },
//   chip:      { marginTop: 6, padding: '5px 0', borderRadius: 7, fontSize: 11, fontWeight: 600, textAlign: 'center', transition: 'all 0.2s' },
//   skeleton:  { height: 160, borderRadius: 14, background: '#f0f0f0', animation: 'pulse 1.4s ease infinite' },
//   allDone:   { marginTop: 14, background: '#d5f0e0', color: '#1a6b3a', borderRadius: 12, padding: '14px 18px', fontWeight: 600, fontSize: 14, textAlign: 'center' },
// };

// dark mode
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GeneralTasks() {
  const [tasks,   setTasks]   = useState([]);
  const [stats,   setStats]   = useState({ total: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/general-tasks')
      .then(r => {
        setTasks(r.data.tasks);
        setStats({ total: r.data.total, completed: r.data.completed });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggle = async (id) => {
    const { data } = await axios.patch(`http://localhost:5000/api/general-tasks/${id}/complete`);
    setTasks(prev => prev.map(t => t._id === id ? { ...t, completed: data.completed } : t));
    setStats(prev => ({ ...prev, completed: prev.completed + (data.completed ? 1 : -1) }));
  };

  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <section style={s.section}>

      {/* ── Header ── */}
      <div style={s.pageHeader}>
        <div>
          <p style={s.eyebrow}>WELLNESS HABITS</p>
          <h2 style={s.title}>Daily Tasks</h2>
          <p style={s.sub}>Same wellness habits — every day</p>
        </div>
        <div style={s.scorePill}>
          <span style={s.scoreNumBig}>{stats.completed}</span>
          <span style={s.scoreDivider}>/</span>
          <span style={s.scoreNumTotal}>{stats.total}</span>
          <span style={s.scoreWordLabel}>done</span>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={s.progressWrap}>
        <div style={s.progressLabelRow}>
          <span style={s.progressLabel}>Overall Progress</span>
          <span style={s.progressPct}>{pct}%</span>
        </div>
        <div style={s.track}>
          <div style={{ ...s.fill, width: `${pct}%` }} />
        </div>
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div style={s.grid}>
          {Array(7).fill(0).map((_, i) => <div key={i} style={s.skeleton} />)}
        </div>
      ) : (
        <div style={s.grid}>
          {tasks.map(task => (
            <div
              key={task._id}
              style={{
                ...s.card,
                background:  task.completed ? '#0a1a10' : '#111318',
                borderColor: task.completed ? '#52b788' : '#252830',
              }}
              onClick={() => toggle(task._id)}
            >
              {task.completed && <div style={s.cardTopBar} />}

              <p style={{
                ...s.taskTitle,
                color:          task.completed ? '#52b788' : '#dde1ea',
                textDecoration: task.completed ? 'line-through' : 'none',
              }}>
                {task.title}
              </p>

              <p style={s.desc}>{task.description}</p>

              <div style={{
                ...s.chip,
                background:  task.completed ? '#52b78822' : '#1a1d27',
                color:       task.completed ? '#52b788'   : '#555b6b',
                borderColor: task.completed ? '#52b78855' : '#252830',
              }}>
                {task.completed ? '✓  Completed' : 'Mark complete'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── All done ── */}
      {!loading && pct === 100 && (
        <div style={s.allDone}>
          <p style={s.allDoneTitle}>All habits completed</p>
          <p style={s.allDoneSub}>Outstanding work today. Keep the streak going.</p>
        </div>
      )}

    </section>
  );
}

const s = {
  section: { background: '#0e1016', borderRadius: 18, padding: '22px 22px 26px', border: '1px solid #1e2130' },

  /* Header */
  pageHeader:    { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  eyebrow:       { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#52b788', margin: '0 0 6px', textTransform: 'uppercase' },
  title:         { fontSize: 22, fontWeight: 700, margin: '0 0 4px', color: '#f0f2f8', letterSpacing: '-0.2px' },
  sub:           { fontSize: 13, color: '#4b5263', margin: 0, fontWeight: 400 },

  scorePill:     { display: 'flex', alignItems: 'baseline', gap: 4, background: '#13161f', border: '1px solid #252830', borderRadius: 14, padding: '14px 22px', justifyContent: 'center', flexShrink: 0 },
  scoreNumBig:   { fontSize: 32, fontWeight: 700, color: '#52b788', lineHeight: 1 },
  scoreDivider:  { fontSize: 22, color: '#2a2d3a', fontWeight: 300 },
  scoreNumTotal: { fontSize: 22, fontWeight: 500, color: '#4b5263', lineHeight: 1 },
  scoreWordLabel:{ fontSize: 11, color: '#4b5263', marginLeft: 6, alignSelf: 'center', letterSpacing: '0.05em' },

  /* Progress */
  progressWrap:     { background: '#13161f', border: '1px solid #1e2130', borderRadius: 14, padding: '16px 20px', marginBottom: 20 },
  progressLabelRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel:    { fontSize: 12, fontWeight: 600, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase' },
  progressPct:      { fontSize: 13, fontWeight: 700, color: '#52b788' },
  track:            { height: 6, background: '#1e2130', borderRadius: 3, overflow: 'hidden' },
  fill:             { height: '100%', background: 'linear-gradient(90deg, #1b4332, #52b788)', borderRadius: 3, transition: 'width 0.5s ease' },

  /* Grid */
  grid:      { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 },
  skeleton:  { height: 160, borderRadius: 12, background: '#13161f', border: '1px solid #1e2130' },

  /* Card */
  card:      { borderRadius: 12, padding: '18px 16px 14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, border: '1px solid', transition: 'border-color 0.2s, background 0.2s', position: 'relative', overflow: 'hidden' },
  cardTopBar:{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#52b788' },
  taskTitle: { fontSize: 14, fontWeight: 600, margin: 0, lineHeight: 1.45 },
  desc:      { fontSize: 12, color: '#4b5263', margin: 0, lineHeight: 1.6, flex: 1 },
  chip:      { marginTop: 4, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: 'center', border: '1px solid', letterSpacing: '0.02em', transition: 'all 0.2s' },

  /* All done */
  allDone:      { marginTop: 16, background: '#0a1a10', border: '1px solid #1b3a22', borderRadius: 14, padding: '22px 20px', textAlign: 'center' },
  allDoneTitle: { fontSize: 16, fontWeight: 700, color: '#52b788', margin: '0 0 4px' },
  allDoneSub:   { fontSize: 13, color: '#4b7a5a', margin: 0 },
};