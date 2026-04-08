// light mode
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const TIER = {
//   none:   { emoji: '🎯', color: '#aaa',    label: 'No reward yet'    },
//   bronze: { emoji: '🥉', color: '#cd7f32', label: 'Bronze unlocked'  },
//   silver: { emoji: '🥈', color: '#7d7d7d', label: 'Silver unlocked'  },
//   gold:   { emoji: '🥇', color: '#d4a000', label: 'Gold unlocked'    },
// };

// export default function RewardStrip() {
//   const navigate = useNavigate();
//   const [data,    setData]    = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/rewards')
//       .then(r => setData(r.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading || !data) return <div style={{ height: 80, borderRadius: 14, background: '#f0f0f0' }} />;

//   const tier = TIER[data.tier] || TIER.none;
//   const pct  = data.percent;

//   const nextHint = () => {
//     if (data.tier === 'none')   return `${Math.max(0, Math.ceil(data.totalTasks * 0.33) - data.completedTasks)} more tasks for Bronze 🥉`;
//     if (data.tier === 'bronze') return `${Math.max(0, Math.ceil(data.totalTasks * 0.50) - data.completedTasks)} more tasks for Silver 🥈`;
//     if (data.tier === 'silver') return `${Math.max(0, data.totalTasks - data.completedTasks)} more tasks for Gold 🥇`;
//     return 'Maximum reward unlocked! 🎉';
//   };

//   return (
//     <div style={s.strip} onClick={() => navigate('/rewards')}>
//       <div style={s.left}>
//         <span style={s.emoji}>{tier.emoji}</span>
//         <div>
//           <p style={{ ...s.label, color: tier.color }}>{tier.label}</p>
//           <p style={s.hint}>{nextHint()}</p>
//         </div>
//       </div>
//       <div style={s.right}>
//         <div style={s.barWrap}>
//           <div style={{ ...s.barFill, width: `${pct}%`, background: tier.color === '#aaa' ? '#52b788' : tier.color }} />
//         </div>
//         <span style={{ ...s.pct, color: tier.color }}>{pct}%</span>
//         <span style={s.arrow}>›</span>
//       </div>
//     </div>
//   );
// }

// const s = {
//   strip:  { background: '#fff', borderRadius: 14, padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer', border: '1px solid #eee', transition: 'box-shadow 0.2s' },
//   left:   { display: 'flex', alignItems: 'center', gap: 14 },
//   emoji:  { fontSize: 34 },
//   label:  { fontWeight: 700, fontSize: 15, margin: '0 0 3px' },
//   hint:   { fontSize: 12, color: '#999', margin: 0 },
//   right:  { display: 'flex', alignItems: 'center', gap: 10 },
//   barWrap:{ width: 110, height: 8, background: '#ebebeb', borderRadius: 4, overflow: 'hidden' },
//   barFill:{ height: '100%', borderRadius: 4, transition: 'width 0.5s ease' },
//   pct:    { fontSize: 13, fontWeight: 700, minWidth: 34 },
//   arrow:  { fontSize: 22, color: '#ccc' },
// };

// dark mode
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TIER = {
  none:   { emoji: '🎯', color: '#6b7280', label: 'No reward yet'    },
  bronze: { emoji: '🥉', color: '#cd7f32', label: 'Bronze unlocked'  },
  silver: { emoji: '🥈', color: '#9ca3af', label: 'Silver unlocked'  },
  gold:   { emoji: '🥇', color: '#fbbf24', label: 'Gold unlocked'    },
};

export default function RewardStrip() {
  const navigate = useNavigate();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rewards')
      .then(r => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) return <div style={{ height: 80, borderRadius: 14, background: '#1a1d27', border: '1px solid #2a2d3a' }} />;

  const tier = TIER[data.tier] || TIER.none;
  const pct  = data.percent;

  const nextHint = () => {
    if (data.tier === 'none')   return `${Math.max(0, Math.ceil(data.totalTasks * 0.33) - data.completedTasks)} more tasks for Bronze 🥉`;
    if (data.tier === 'bronze') return `${Math.max(0, Math.ceil(data.totalTasks * 0.50) - data.completedTasks)} more tasks for Silver 🥈`;
    if (data.tier === 'silver') return `${Math.max(0, data.totalTasks - data.completedTasks)} more tasks for Gold 🥇`;
    return 'Maximum reward unlocked! 🎉';
  };

  return (
    <div style={s.strip} onClick={() => navigate('/rewards')}>
      <div style={s.left}>
        <span style={s.emoji}>{tier.emoji}</span>
        <div>
          <p style={{ ...s.label, color: tier.color }}>{tier.label}</p>
          <p style={s.hint}>{nextHint()}</p>
        </div>
      </div>
      <div style={s.right}>
        <div style={s.barWrap}>
          <div style={{ ...s.barFill, width: `${pct}%`, background: tier.color }} />
        </div>
        <span style={{ ...s.pct, color: tier.color }}>{pct}%</span>
        <span style={s.arrow}>›</span>
      </div>
    </div>
  );
}

const s = {
  strip:  { background: '#1a1d27', borderRadius: 14, padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #2a2d3a', cursor: 'pointer', transition: 'border-color 0.2s' },
  left:   { display: 'flex', alignItems: 'center', gap: 14 },
  emoji:  { fontSize: 34 },
  label:  { fontWeight: 700, fontSize: 15, margin: '0 0 3px' },
  hint:   { fontSize: 12, color: '#6b7280', margin: 0 },
  right:  { display: 'flex', alignItems: 'center', gap: 10 },
  barWrap:{ width: 110, height: 8, background: '#0f1117', borderRadius: 4, overflow: 'hidden' },
  barFill:{ height: '100%', borderRadius: 4, transition: 'width 0.5s ease' },
  pct:    { fontSize: 13, fontWeight: 700, minWidth: 34 },
  arrow:  { fontSize: 22, color: '#3a3d4a' },
}; 