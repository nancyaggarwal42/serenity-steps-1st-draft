// light mode
// import { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import axios from 'axios';

// const ADDICTION_CONFIG = {
//   'Social Media':    { accent: '#2980b9', light: '#d0eaf9', bg: '#e8f4fd', icon: '📱' },
//   'Gaming':          { accent: '#8e44ad', light: '#e8d5f9', bg: '#f3e8fd', icon: '🎮' },
//   'Alcohol':         { accent: '#e67e22', light: '#fde8cc', bg: '#fef3e8', icon: '🍺' },
//   'Smoking':         { accent: '#27ae60', light: '#d5ecd5', bg: '#eaf4ea', icon: '🚬' },
//   'Online Shopping': { accent: '#e91e63', light: '#fbd0e0', bg: '#fde8f0', icon: '🛍️' },
//   'Pornography':     { accent: '#d35400', light: '#fde0cc', bg: '#fff3e8', icon: '🔒' },
// };

// export default function Tasks() {
//   const [data,    setData]    = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/tasks')
//       .then(r => setData(r.data))
//       .catch(e => setError(e.response?.data?.message || 'Failed to load tasks'))
//       .finally(() => setLoading(false));
//   }, []);

//   const toggle = async (taskId, addiction) => {
//     try {
//       const { data: updated } = await axios.patch(`http://localhost:5000/api/tasks/${taskId}/complete`);
//       setData(prev => {
//         const newGrouped = { ...prev.grouped };
//         newGrouped[addiction] = newGrouped[addiction].map(t => t._id === taskId ? updated : t);
//         const allTasks = Object.values(newGrouped).flat();
//         return { ...prev, grouped: newGrouped, completed: allTasks.filter(t => t.completed).length };
//       });
//     } catch {
//       alert('Could not update task.');
//     }
//   };

//   const percent = data ? Math.round((data.completed / data.total) * 100) : 0;

//   return (
//     <div style={s.page}>
//       <Navbar />

//       <div style={s.content}>

//         {/* Header */}
//         <div style={s.header}>
//           <div>
//             <h1 style={s.heading}>Today's Tasks</h1>
//             <p style={s.date}>
//               {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//             </p>
//           </div>
//           {data && (
//             <div style={s.scoreBox}>
//               <span style={s.scoreNum}>{data.completed}/{data.total}</span>
//               <span style={s.scoreLabel}>completed</span>
//             </div>
//           )}
//         </div>

//         {/* Progress bar */}
//         {data && (
//           <div style={s.progressWrap}>
//             <div style={s.progressTrack}>
//               <div style={{ ...s.progressFill, width: `${percent}%` }} />
//             </div>
//             <span style={s.progressText}>{percent}% done{percent === 100 ? ' 🎉' : ''}</span>
//           </div>
//         )}

//         {loading && <div style={s.center}>Loading your tasks...</div>}
//         {error   && <div style={s.errorBox}>{error}</div>}

//         {/* Addiction task groups */}
//         {data && Object.entries(data.grouped).map(([addiction, tasks]) => {
//           const cfg       = ADDICTION_CONFIG[addiction] || { accent: '#555', light: '#eee', bg: '#f5f5f5', icon: '📌' };
//           const doneCount = tasks.filter(t => t.completed).length;
//           const secPct    = Math.round((doneCount / tasks.length) * 100);

//           return (
//             <div key={addiction} style={{ ...s.section, background: cfg.bg }}>

//               {/* Section header */}
//               <div style={s.sectionTop}>
//                 <div style={{ ...s.sectionBadge, background: cfg.accent }}>
//                   {cfg.icon} {addiction}
//                 </div>
//                 <span style={{ ...s.sectionCount, color: cfg.accent }}>
//                   {doneCount}/{tasks.length} done
//                 </span>
//               </div>

//               {/* Mini progress */}
//               <div style={s.miniTrack}>
//                 <div style={{ ...s.miniFill, width: `${secPct}%`, background: cfg.accent }} />
//               </div>

//               {/* Card grid — same layout as GeneralTasks */}
//               <div style={s.grid}>
//                 {tasks.map(task => (
//                   <div
//                     key={task._id}
//                     style={{
//                       ...s.card,
//                       background:   task.completed ? cfg.light  : '#fff',
//                       border:       `2px solid ${task.completed ? cfg.accent : '#ebebeb'}`,
//                       opacity:      task.completed ? 0.85 : 1,
//                     }}
//                     onClick={() => toggle(task._id, addiction)}
//                   >
//                     <span style={s.cardIcon}>{cfg.icon}</span>
//                     <p style={{
//                       ...s.cardTitle,
//                       color:          task.completed ? cfg.accent : '#1a1a1a',
//                       textDecoration: task.completed ? 'line-through' : 'none',
//                     }}>
//                       {task.title}
//                     </p>
//                     <p style={s.cardDesc}>{task.description}</p>
//                     <div style={{
//                       ...s.chip,
//                       background: task.completed ? cfg.accent : '#f0f0f0',
//                       color:      task.completed ? '#fff'     : '#888',
//                     }}>
//                       {task.completed ? '✓ Completed' : 'Tap to complete'}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           );
//         })}

//         {/* All done */}
//         {data && data.completed === data.total && data.total > 0 && (
//           <div style={s.allDone}>
//             🎉 Amazing! You completed all tasks for today. See you tomorrow!
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// const s = {
//   page:         { minHeight: '100vh', background: '#f0f4f8' },
//   content:      { maxWidth: 900, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 28 },

//   header:       { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
//   heading:      { fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: '#1a1a1a' },
//   date:         { color: '#999', fontSize: 13, margin: 0 },
//   scoreBox:     { background: '#fff', borderRadius: 12, padding: '12px 20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
//   scoreNum:     { display: 'block', fontSize: 28, fontWeight: 700, color: '#2d6a4f' },
//   scoreLabel:   { fontSize: 12, color: '#888' },

//   progressWrap: { display: 'flex', alignItems: 'center', gap: 12 },
//   progressTrack:{ flex: 1, height: 8, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden' },
//   progressFill: { height: '100%', background: 'linear-gradient(90deg, #2d6a4f, #52b788)', borderRadius: 4, transition: 'width 0.4s ease' },
//   progressText: { fontSize: 13, color: '#555', minWidth: 90, textAlign: 'right' },

//   center:       { textAlign: 'center', color: '#888', padding: 40 },
//   errorBox:     { background: '#fde8e8', color: '#c0392b', borderRadius: 12, padding: 16, textAlign: 'center' },

//   section:      { borderRadius: 20, padding: '20px 20px 24px' },

//   sectionTop:   { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
//   sectionBadge: { color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 },
//   sectionCount: { fontSize: 13, fontWeight: 700 },

//   miniTrack:    { height: 5, background: 'rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden', marginBottom: 18 },
//   miniFill:     { height: '100%', borderRadius: 3, transition: 'width 0.4s ease' },

//   /* Same grid + card as GeneralTasks */
//   grid:         { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 },
//   card:         { borderRadius: 14, padding: '16px 14px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', display: 'flex', flexDirection: 'column', gap: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
//   cardIcon:     { fontSize: 26 },
//   cardTitle:    { fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.4 },
//   cardDesc:     { fontSize: 11, color: '#777', margin: 0, lineHeight: 1.5, flex: 1 },
//   chip:         { marginTop: 6, padding: '5px 0', borderRadius: 7, fontSize: 11, fontWeight: 600, textAlign: 'center', transition: 'all 0.2s' },

//   allDone:      { background: '#d5f0e0', color: '#1a6b3a', borderRadius: 14, padding: 20, textAlign: 'center', fontSize: 16, fontWeight: 600 },
// };

// dark mode
import { useEffect, useState } from 'react';
import axios from 'axios';

const ADDICTION_CONFIG = {
  'Social Media':    { accent: '#3b82f6', light: '#1e2d4a', bg: '#0e1520', border: '#1e3a5f' },
  'Gaming':          { accent: '#a855f7', light: '#2d1a4a', bg: '#110d1a', border: '#3b1f5e' },
  'Alcohol':         { accent: '#f97316', light: '#3d2010', bg: '#150e06', border: '#5e2d0e' },
  'Smoking':         { accent: '#22c55e', light: '#102d18', bg: '#061510', border: '#0f3d1e' },
  'Online Shopping': { accent: '#ec4899', light: '#3d1028', bg: '#15060f', border: '#5e0f2d' },
  'Pornography':     { accent: '#ef4444', light: '#3d1010', bg: '#150606', border: '#5e0f0f' },
};

export default function Tasks() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const baseUrl = 'https://serenity-steps-1st-draft-1-backend-1.onrender.com'


  useEffect(() => {
    axios.get(`${baseUrl}/api/tasks`)
      .then(r => setData(r.data))
      .catch(e => setError(e.response?.data?.message || 'Failed to load tasks'))
      .finally(() => setLoading(false));
  }, []);

  const toggle = async (taskId, addiction) => {
    try {
      const { data: updated } = await axios.patch(`http://localhost:5000/api/tasks/${taskId}/complete`);
      setData(prev => {
        const newGrouped = { ...prev.grouped };
        newGrouped[addiction] = newGrouped[addiction].map(t => t._id === taskId ? updated : t);
        const allTasks = Object.values(newGrouped).flat();
        return { ...prev, grouped: newGrouped, completed: allTasks.filter(t => t.completed).length };
      });
    } catch {
      alert('Could not update task.');
    }
  };

  const percent = data ? Math.round((data.completed / data.total) * 100) : 0;

  return (
    <div style={s.page}>
      <div style={s.content}>

        {/* ── Page Header ── */}
        <div style={s.pageHeader}>
          <div>
            <p style={s.pageEyebrow}>RECOVERY PLAN</p>
            <h1 style={s.pageTitle}>Today's Tasks</h1>
            <p style={s.pageDate}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          {data && (
            <div style={s.scorePill}>
              <span style={s.scoreNumBig}>{data.completed}</span>
              <span style={s.scoreDivider}>/</span>
              <span style={s.scoreNumTotal}>{data.total}</span>
              <span style={s.scoreWordLabel}>completed</span>
            </div>
          )}
        </div>

        {/* ── Overall Progress ── */}
        {data && (
          <div style={s.overallProgress}>
            <div style={s.progressLabelRow}>
              <span style={s.progressLabel}>Overall Progress</span>
              <span style={s.progressPct}>{percent}%</span>
            </div>
            <div style={s.progressTrack}>
              <div style={{ ...s.progressFill, width: `${percent}%` }} />
            </div>
          </div>
        )}

        {loading && <div style={s.center}>Loading your tasks...</div>}
        {error   && <div style={s.errorBox}>{error}</div>}

        {/* ── Addiction Groups ── */}
        {data && Object.entries(data.grouped).map(([addiction, tasks]) => {
          const cfg       = ADDICTION_CONFIG[addiction] || { accent: '#6b7280', light: '#1e2130', bg: '#0f1117', border: '#2a2d3a' };
          const doneCount = tasks.filter(t => t.completed).length;
          const secPct    = Math.round((doneCount / tasks.length) * 100);

          return (
            <div key={addiction} style={{ ...s.section, background: cfg.bg, borderColor: cfg.border }}>

              {/* Section header */}
              <div style={s.sectionHeader}>
                <div style={s.sectionLeft}>
                  <div style={{ ...s.accentBar, background: cfg.accent }} />
                  <div>
                    <h2 style={{ ...s.sectionTitle, color: cfg.accent }}>{addiction}</h2>
                    <p style={s.sectionSub}>{doneCount} of {tasks.length} tasks complete</p>
                  </div>
                </div>
                <div style={{ ...s.sectionPct, color: cfg.accent, borderColor: cfg.border }}>
                  {secPct}%
                </div>
              </div>

              {/* Mini progress */}
              <div style={s.miniTrack}>
                <div style={{ ...s.miniFill, width: `${secPct}%`, background: cfg.accent }} />
              </div>

              {/* Task grid */}
              <div style={s.grid}>
                {tasks.map(task => (
                  <div
                    key={task._id}
                    style={{
                      ...s.card,
                      background:   task.completed ? cfg.light  : '#111318',
                      borderColor:  task.completed ? cfg.accent : '#252830',
                    }}
                    onClick={() => toggle(task._id, addiction)}
                  >
                    {/* Completed glow bar on top */}
                    {task.completed && (
                      <div style={{ ...s.cardTopBar, background: cfg.accent }} />
                    )}

                    <p style={{
                      ...s.cardTitle,
                      color:          task.completed ? cfg.accent : '#dde1ea',
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}>
                      {task.title}
                    </p>

                    <p style={s.cardDesc}>{task.description}</p>

                    <div style={{
                      ...s.chip,
                      background:  task.completed ? cfg.accent + '22' : '#1a1d27',
                      color:       task.completed ? cfg.accent        : '#555b6b',
                      borderColor: task.completed ? cfg.accent + '55' : '#252830',
                    }}>
                      {task.completed ? '✓  Completed' : 'Mark complete'}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}

        {/* ── All done ── */}
        {data && data.completed === data.total && data.total > 0 && (
          <div style={s.allDone}>
            <p style={s.allDoneTitle}>All tasks completed</p>
            <p style={s.allDoneSub}>Outstanding work today. See you tomorrow.</p>
          </div>
        )}

      </div>
    </div>
  );
}

const s = {
  page:    { background: '#0f1117' },
  content: { display: 'flex', flexDirection: 'column', gap: 24 },

  /* Page header */
  pageHeader:    { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 4 },
  pageEyebrow:   { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#3b82f6', margin: '0 0 6px', textTransform: 'uppercase' },
  pageTitle:     { fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: '#f0f2f8', letterSpacing: '-0.3px' },
  pageDate:      { fontSize: 13, color: '#4b5263', margin: 0, fontWeight: 400 },

  scorePill:     { display: 'flex', alignItems: 'baseline', gap: 4, background: '#13161f', border: '1px solid #252830', borderRadius: 14, padding: '14px 22px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  scoreNumBig:   { fontSize: 32, fontWeight: 700, color: '#52b788', lineHeight: 1 },
  scoreDivider:  { fontSize: 22, color: '#2a2d3a', fontWeight: 300 },
  scoreNumTotal: { fontSize: 22, fontWeight: 500, color: '#4b5263', lineHeight: 1 },
  scoreWordLabel:{ fontSize: 11, color: '#4b5263', marginLeft: 6, alignSelf: 'center', letterSpacing: '0.05em' },

  /* Overall progress */
  overallProgress:  { background: '#13161f', border: '1px solid #1e2130', borderRadius: 14, padding: '16px 20px' },
  progressLabelRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel:    { fontSize: 12, fontWeight: 600, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase' },
  progressPct:      { fontSize: 13, fontWeight: 700, color: '#52b788' },
  progressTrack:    { height: 6, background: '#1e2130', borderRadius: 3, overflow: 'hidden' },
  progressFill:     { height: '100%', background: 'linear-gradient(90deg, #1b4332, #52b788)', borderRadius: 3, transition: 'width 0.5s ease' },

  center:   { textAlign: 'center', color: '#6b7280', padding: 40 },
  errorBox: { background: '#2d1515', color: '#ef4444', borderRadius: 12, padding: 16, textAlign: 'center', fontSize: 14 },

  /* Section */
  section:       { borderRadius: 18, padding: '22px 22px 26px', border: '1px solid' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionLeft:   { display: 'flex', alignItems: 'center', gap: 14 },
  accentBar:     { width: 4, height: 40, borderRadius: 2, flexShrink: 0 },
  sectionTitle:  { fontSize: 16, fontWeight: 700, margin: '0 0 2px', letterSpacing: '-0.1px' },
  sectionSub:    { fontSize: 12, color: '#4b5263', margin: 0, fontWeight: 400 },
  sectionPct:    { fontSize: 15, fontWeight: 700, padding: '6px 14px', borderRadius: 8, border: '1px solid', background: 'rgba(0,0,0,0.2)' },

  miniTrack: { height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden', marginBottom: 20 },
  miniFill:  { height: '100%', borderRadius: 2, transition: 'width 0.5s ease' },

  /* Cards */
  grid:       { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 },
  card:       { borderRadius: 12, padding: '18px 16px 14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, border: '1px solid', transition: 'border-color 0.2s, background 0.2s', position: 'relative', overflow: 'hidden' },
  cardTopBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 3 },
  cardTitle:  { fontSize: 14, fontWeight: 600, margin: 0, lineHeight: 1.45 },
  cardDesc:   { fontSize: 12, color: '#4b5263', margin: 0, lineHeight: 1.6, flex: 1 },
  chip:       { marginTop: 4, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: 'center', border: '1px solid', letterSpacing: '0.02em', transition: 'all 0.2s' },

  /* All done */
  allDone:      { background: '#0a1a10', border: '1px solid #1b3a22', borderRadius: 14, padding: '24px 20px', textAlign: 'center' },
  allDoneTitle: { fontSize: 16, fontWeight: 700, color: '#52b788', margin: '0 0 4px' },
  allDoneSub:   { fontSize: 13, color: '#4b7a5a', margin: 0 },
};