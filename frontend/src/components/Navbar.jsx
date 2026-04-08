// light mode
// import { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';

// const PRIORITY = {
//   high:   { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', dot: '🔴' },
//   medium: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', dot: '🟡' },
//   low:    { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', dot: '🟢' },
// };

// export default function Navbar() {
//   const { logout, user } = useAuth();
//   const navigate  = useNavigate();
//   const location  = useLocation();

//   // ── ToDo panel state ──
//   const [open,     setOpen]     = useState(false);
//   const [todos,    setTodos]    = useState([]);
//   const [text,     setText]     = useState('');
//   const [time,     setTime]     = useState('');
//   const [priority, setPriority] = useState('medium');
//   const [loading,  setLoading]  = useState(false);
//   const panelRef  = useRef(null);
//   const inputRef  = useRef(null);

//   // Fetch todos when panel opens
//   useEffect(() => {
//     if (!open) return;
//     setLoading(true);
//     axios.get('http://localhost:5000/api/todos')
//       .then(r => setTodos(r.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//     setTimeout(() => inputRef.current?.focus(), 100);
//   }, [open]);

//   // Close on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
//     };
//     if (open) document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, [open]);

//   const addTodo = async () => {
//     if (!text.trim()) return;
//     const { data } = await axios.post('http://localhost:5000/api/todos', { text, time, priority });
//     setTodos(prev => [data, ...prev]);
//     setText('');
//     setTime('');
//     inputRef.current?.focus();
//   };

//   const toggle = async (id) => {
//     const { data } = await axios.patch(`http://localhost:5000/api/todos/${id}/toggle`);
//     setTodos(prev => prev.map(t => t._id === id ? data : t));
//   };

//   const remove = async (id) => {
//     await axios.delete(`http://localhost:5000/api/todos/${id}`);
//     setTodos(prev => prev.filter(t => t._id !== id));
//   };

//   const done  = todos.filter(t =>  t.completed).length;
//   const total = todos.length;
//   const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

//         .nb-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

//         /* ── Navbar ── */
//         .nb { display:flex; justify-content:space-between; align-items:center; padding:14px 32px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06); position:sticky; top:0; z-index:100; }
//         .nb-logo { font-size:20px; font-weight:700; color:#2d6a4f; cursor:pointer; letter-spacing:-0.3px; }
//         .nb-right { display:flex; align-items:center; gap:10px; }

//         .nb-todo-btn {
//           display: flex; align-items: center; gap: 6px;
//           padding: 8px 16px; border-radius: 20px;
//           border: 1.5px solid #e0e0e0; background: #fff;
//           color: #555; font-size: 14px; font-weight: 600;
//           cursor: pointer; transition: all 0.15s;
//         }
//         .nb-todo-btn:hover, .nb-todo-btn.active {
//           background: #fff8e1; color: #b8860b;
//           border-color: #f0d060;
//         }
//         .nb-todo-badge {
//           min-width: 18px; height: 18px; padding: 0 5px;
//           border-radius: 9px; background: #ef4444; color: #fff;
//           font-size: 11px; font-weight: 700;
//           display: flex; align-items: center; justify-content: center;
//         }

//         .nb-rewards-btn {
//           display: flex; align-items: center; gap: 6px;
//           padding: 8px 16px; border-radius: 20px;
//           border: 1.5px solid #e0e0e0; background: #fff;
//           color: #555; font-size: 14px; font-weight: 600;
//           cursor: pointer; transition: all 0.15s;
//         }
//         .nb-rewards-btn:hover, .nb-rewards-btn.active {
//           background: #e8f5e9; color: #2d6a4f;
//           border-color: #b7dfcc;
//         }

//         .nb-avatar {
//           width: 38px; height: 38px; border-radius: 50%;
//           background: linear-gradient(135deg, #2d6a4f, #52b788);
//           color: #fff; font-size: 15px; font-weight: 700;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; user-select: none;
//           box-shadow: 0 2px 8px rgba(45,106,79,0.3);
//           transition: transform 0.15s;
//         }
//         .nb-avatar:hover { transform: scale(1.06); }

//         /* ── Overlay ── */
//         .todo-overlay {
//           position: fixed; inset: 0;
//           background: rgba(0,0,0,0.25);
//           z-index: 200;
//           animation: fadeIn 0.2s ease;
//         }
//         @keyframes fadeIn { from{opacity:0} to{opacity:1} }

//         /* ── Slide panel ── */
//         .todo-panel {
//           position: fixed; top: 0; right: 0; bottom: 0;
//           width: 420px; max-width: 95vw;
//           background: #f8fafc;
//           box-shadow: -8px 0 40px rgba(0,0,0,0.15);
//           z-index: 201;
//           display: flex; flex-direction: column;
//           animation: slideIn 0.3s cubic-bezier(0.22,1,0.36,1);
//           overflow: hidden;
//         }
//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to   { transform: translateX(0); }
//         }

//         /* Panel header */
//         .tp-header {
//           padding: 20px 24px 16px;
//           background: linear-gradient(135deg, #2d6a4f, #52b788);
//           color: #fff;
//         }
//         .tp-header-top {
//           display: flex; justify-content: space-between; align-items: center;
//           margin-bottom: 12px;
//         }
//         .tp-title { font-size: 20px; font-weight: 700; }
//         .tp-close {
//           width: 32px; height: 32px; border-radius: 50%;
//           border: none; background: rgba(255,255,255,0.2);
//           color: #fff; font-size: 18px; cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           transition: background 0.15s;
//         }
//         .tp-close:hover { background: rgba(255,255,255,0.35); }

//         /* Progress inside header */
//         .tp-progress-wrap { display: flex; align-items: center; gap: 10px; }
//         .tp-track { flex: 1; height: 6px; background: rgba(255,255,255,0.25); border-radius: 3px; overflow: hidden; }
//         .tp-fill  { height: 100%; background: #fff; border-radius: 3px; transition: width 0.4s ease; }
//         .tp-pct   { font-size: 13px; font-weight: 700; opacity: 0.9; min-width: 36px; text-align: right; }

//         /* Add form */
//         .tp-form {
//           padding: 16px 20px;
//           background: #fff;
//           border-bottom: 1px solid #f0f0f0;
//           display: flex; flex-direction: column; gap: 10px;
//         }
//         .tp-input-row { display: flex; gap: 8px; }
//         .tp-text-input {
//           flex: 1; padding: 10px 14px;
//           border-radius: 10px; border: 1.5px solid #e8e8e8;
//           font-size: 14px; outline: none; font-family: inherit;
//           color: #1a1a1a; transition: border-color 0.15s;
//         }
//         .tp-text-input:focus { border-color: #52b788; }
//         .tp-text-input::placeholder { color: #bbb; }

//         .tp-time-input {
//           padding: 10px 12px;
//           border-radius: 10px; border: 1.5px solid #e8e8e8;
//           font-size: 14px; outline: none; font-family: inherit;
//           color: #1a1a1a; cursor: pointer; transition: border-color 0.15s;
//           min-width: 120px;
//         }
//         .tp-time-input:focus { border-color: #52b788; }

//         .tp-priority-row { display: flex; gap: 6px; }
//         .tp-p-btn {
//           flex: 1; padding: 7px 4px; border-radius: 8px;
//           font-size: 12px; font-weight: 600; cursor: pointer;
//           border: 1.5px solid #eee; background: #f9f9f9; color: #999;
//           transition: all 0.15s;
//         }

//         .tp-add-btn {
//           padding: 10px; border-radius: 10px; border: none;
//           background: linear-gradient(135deg, #2d6a4f, #52b788);
//           color: #fff; font-size: 14px; font-weight: 700;
//           cursor: pointer; transition: opacity 0.15s;
//         }
//         .tp-add-btn:hover { opacity: 0.88; }

//         /* List */
//         .tp-list {
//           flex: 1; overflow-y: auto; padding: 14px 20px;
//           display: flex; flex-direction: column; gap: 8px;
//         }
//         .tp-list::-webkit-scrollbar { width: 4px; }
//         .tp-list::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

//         .tp-empty {
//           text-align: center; padding: 48px 0;
//           color: #bbb; font-size: 14px;
//         }

//         /* Todo item */
//         .tp-item {
//           background: #fff; border-radius: 12px;
//           padding: 12px 14px;
//           display: flex; align-items: flex-start; gap: 12px;
//           box-shadow: 0 1px 4px rgba(0,0,0,0.05);
//           border-left: 3px solid #ddd;
//           transition: opacity 0.2s;
//         }

//         .tp-cb {
//           width: 20px; height: 20px; border-radius: 6px;
//           border: 2px solid #ddd; cursor: pointer; flex-shrink: 0;
//           display: flex; align-items: center; justify-content: center;
//           margin-top: 1px; transition: all 0.15s;
//         }
//         .tp-cb.done { background: #2d6a4f; border-color: #2d6a4f; }
//         .tp-cb-check { color: #fff; font-size: 11px; font-weight: 700; }

//         .tp-item-body { flex: 1; min-width: 0; }
//         .tp-item-text {
//           font-size: 14px; font-weight: 500; color: #1a1a1a;
//           line-height: 1.4; word-break: break-word;
//         }
//         .tp-item-text.done { text-decoration: line-through; color: #aaa; }

//         .tp-item-meta {
//           display: flex; align-items: center; gap: 8px; margin-top: 4px;
//         }
//         .tp-time-tag {
//           font-size: 11px; color: #888; font-weight: 600;
//           display: flex; align-items: center; gap: 3px;
//         }
//         .tp-p-tag {
//           font-size: 11px; font-weight: 700;
//           padding: 2px 8px; border-radius: 8px;
//         }

//         .tp-del {
//           background: none; border: none; cursor: pointer;
//           color: #ddd; font-size: 16px; padding: 2px;
//           transition: color 0.15s; flex-shrink: 0;
//           line-height: 1;
//         }
//         .tp-del:hover { color: #ef4444; }

//         /* Footer */
//         .tp-footer {
//           padding: 12px 20px;
//           background: #fff; border-top: 1px solid #f0f0f0;
//           display: flex; justify-content: space-between; align-items: center;
//         }
//         .tp-footer-text { font-size: 13px; color: #999; }
//         .tp-clear-btn {
//           font-size: 12px; font-weight: 600; color: #ef4444;
//           background: none; border: none; cursor: pointer;
//           padding: 4px 8px; border-radius: 6px;
//           transition: background 0.15s;
//         }
//         .tp-clear-btn:hover { background: #fef2f2; }
//       `}</style>

//       {/* ── Navbar ── */}
//       <nav className="nb nb-root">
//         <span className="nb-logo" onClick={() => navigate('/dashboard')}>Serenity Steps</span>

//         <div className="nb-right">
//           {/* Self To-Do button */}
//           <button
//             className={`nb-todo-btn ${open ? 'active' : ''}`}
//             onClick={() => setOpen(o => !o)}
//           >
//             ✏️ Self To-Do
//             {todos.filter(t => !t.completed).length > 0 && (
//               <span className="nb-todo-badge">{todos.filter(t => !t.completed).length}</span>
//             )}
//           </button>

//           {/* Rewards */}
//           {/* <button
//             className={`nb-rewards-btn ${location.pathname === '/rewards' ? 'active' : ''}`}
//             onClick={() => navigate('/rewards')}
//           >
//             🏆 Rewards
//           </button> */}

//           {/* Profile circle */}
//           <div className="nb-avatar" onClick={() => navigate('/profile')} title={user?.name}>
//             {user?.name?.[0]?.toUpperCase() || '?'}
//           </div>
//         </div>
//       </nav>

//       {/* ── ToDo slide panel ── */}
//       {open && (
//         <>
//           <div className="todo-overlay" onClick={() => setOpen(false)} />

//           <div className="todo-panel nb-root" ref={panelRef}>

//             {/* Header */}
//             <div className="tp-header">
//               <div className="tp-header-top">
//                 <span className="tp-title">✏️ Self To-Do</span>
//                 <button className="tp-close" onClick={() => setOpen(false)}>×</button>
//               </div>
//               <div className="tp-progress-wrap">
//                 <div className="tp-track">
//                   <div className="tp-fill" style={{ width: `${pct}%` }} />
//                 </div>
//                 <span className="tp-pct">{done}/{total} done</span>
//               </div>
//             </div>

//             {/* Add form */}
//             <div className="tp-form">
//               <div className="tp-input-row">
//                 <input
//                   ref={inputRef}
//                   className="tp-text-input"
//                   placeholder="Add a task..."
//                   value={text}
//                   onChange={e => setText(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && addTodo()}
//                 />
//                 <input
//                   className="tp-time-input"
//                   type="time"
//                   value={time}
//                   onChange={e => setTime(e.target.value)}
//                   title="Set a time"
//                 />
//               </div>

//               {/* Priority */}
//               <div className="tp-priority-row">
//                 {Object.entries(PRIORITY).map(([key, val]) => (
//                   <button
//                     key={key}
//                     className="tp-p-btn"
//                     style={priority === key ? {
//                       background: val.bg, color: val.color,
//                       border: `1.5px solid ${val.border}`,
//                     } : {}}
//                     onClick={() => setPriority(key)}
//                   >
//                     {val.dot} {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </button>
//                 ))}
//               </div>

//               <button className="tp-add-btn" onClick={addTodo}>+ Add Task</button>
//             </div>

//             {/* List */}
//             <div className="tp-list">
//               {loading && <div className="tp-empty">Loading...</div>}

//               {!loading && todos.length === 0 && (
//                 <div className="tp-empty">
//                   <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
//                   No tasks yet — add one above!
//                 </div>
//               )}

//               {todos.map(todo => {
//                 const p = PRIORITY[todo.priority] || PRIORITY.medium;
//                 return (
//                   <div
//                     key={todo._id}
//                     className="tp-item"
//                     style={{
//                       borderLeftColor: p.color,
//                       opacity: todo.completed ? 0.6 : 1,
//                     }}
//                   >
//                     {/* Checkbox */}
//                     <div
//                       className={`tp-cb ${todo.completed ? 'done' : ''}`}
//                       onClick={() => toggle(todo._id)}
//                     >
//                       {todo.completed && <span className="tp-cb-check">✓</span>}
//                     </div>

//                     {/* Body */}
//                     <div className="tp-item-body">
//                       <div className={`tp-item-text ${todo.completed ? 'done' : ''}`}>
//                         {todo.text}
//                       </div>
//                       <div className="tp-item-meta">
//                         {todo.time && (
//                           <span className="tp-time-tag">
//                             🕐 {todo.time}
//                           </span>
//                         )}
//                         <span
//                           className="tp-p-tag"
//                           style={{ background: p.bg, color: p.color }}
//                         >
//                           {todo.priority}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Delete */}
//                     <button className="tp-del" onClick={() => remove(todo._id)}>×</button>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Footer */}
//             <div className="tp-footer">
//               <span className="tp-footer-text">
//                 {todos.filter(t => !t.completed).length} task{todos.filter(t => !t.completed).length !== 1 ? 's' : ''} remaining
//               </span>
//               {todos.some(t => t.completed) && (
//                 <button
//                   className="tp-clear-btn"
//                   onClick={async () => {
//                     const completed = todos.filter(t => t.completed);
//                     await Promise.all(completed.map(t => axios.delete(`http://localhost:5000/api/todos/${t._id}`)));
//                     setTodos(prev => prev.filter(t => !t.completed));
//                   }}
//                 >
//                   Clear completed
//                 </button>
//               )}
//             </div>

//           </div>
//         </>
//       )}
//     </>
//   );
// }

// dark mode
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PRIORITY = {
  high:   { color: '#ef4444', bg: '#2d1515', border: '#5a2020', dot: '🔴' },
  medium: { color: '#f59e0b', bg: '#2d2410', border: '#5a4010', dot: '🟡' },
  low:    { color: '#22c55e', bg: '#102d18', border: '#1a5c2a', dot: '🟢' },
};

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const [open,     setOpen]     = useState(false);
  const [todos,    setTodos]    = useState([]);
  const [text,     setText]     = useState('');
  const [time,     setTime]     = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading,  setLoading]  = useState(false);
  const panelRef  = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    axios.get('http://localhost:5000/api/todos')
      .then(r => setTodos(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const addTodo = async () => {
    if (!text.trim()) return;
    const { data } = await axios.post('http://localhost:5000/api/todos', { text, time, priority });
    setTodos(prev => [data, ...prev]);
    setText('');
    setTime('');
    inputRef.current?.focus();
  };

  const toggle = async (id) => {
    const { data } = await axios.patch(`http://localhost:5000/api/todos/${id}/toggle`);
    setTodos(prev => prev.map(t => t._id === id ? data : t));
  };

  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  const done  = todos.filter(t =>  t.completed).length;
  const total = todos.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .nb-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        .nb {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 32px;
          background: #12151f;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          position: sticky; top: 0; z-index: 100;
          border-bottom: 1px solid #2a2d3a;
        }
        .nb-logo { font-size: 20px; font-weight: 700; color: #52b788; cursor: pointer; letter-spacing: -0.3px; }
        .nb-right { display: flex; align-items: center; gap: 10px; }

        .nb-todo-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 20px;
          border: 1.5px solid #2a2d3a; background: #1a1d27;
          color: #9ca3af; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.15s;
        }
        .nb-todo-btn:hover, .nb-todo-btn.active {
          background: #2d2410; color: #f59e0b; border-color: #5a4010;
        }
        .nb-todo-badge {
          min-width: 18px; height: 18px; padding: 0 5px;
          border-radius: 9px; background: #ef4444; color: #fff;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }

        .nb-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #2d6a4f, #52b788);
          color: #fff; font-size: 15px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; user-select: none;
          box-shadow: 0 2px 8px rgba(45,106,79,0.4);
          transition: transform 0.15s;
        }
        .nb-avatar:hover { transform: scale(1.06); }

        .todo-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 200;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        .todo-panel {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 420px; max-width: 95vw;
          background: #12151f;
          box-shadow: -8px 0 40px rgba(0,0,0,0.5);
          z-index: 201;
          display: flex; flex-direction: column;
          animation: slideIn 0.3s cubic-bezier(0.22,1,0.36,1);
          overflow: hidden;
          border-left: 1px solid #2a2d3a;
        }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

        .tp-header {
          padding: 20px 24px 16px;
          background: linear-gradient(135deg, #1b4332, #2d6a4f);
          color: #fff;
        }
        .tp-header-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 12px;
        }
        .tp-title { font-size: 20px; font-weight: 700; }
        .tp-close {
          width: 32px; height: 32px; border-radius: 50%;
          border: none; background: rgba(255,255,255,0.15);
          color: #fff; font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .tp-close:hover { background: rgba(255,255,255,0.3); }

        .tp-progress-wrap { display: flex; align-items: center; gap: 10px; }
        .tp-track { flex: 1; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden; }
        .tp-fill  { height: 100%; background: #fff; border-radius: 3px; transition: width 0.4s ease; }
        .tp-pct   { font-size: 13px; font-weight: 700; opacity: 0.9; min-width: 36px; text-align: right; }

        .tp-form {
          padding: 16px 20px;
          background: #1a1d27;
          border-bottom: 1px solid #2a2d3a;
          display: flex; flex-direction: column; gap: 10px;
        }
        .tp-input-row { display: flex; gap: 8px; }
        .tp-text-input {
          flex: 1; padding: 10px 14px;
          border-radius: 10px; border: 1.5px solid #2a2d3a;
          font-size: 14px; outline: none; font-family: inherit;
          color: #e8eaf0; background: #0f1117;
          transition: border-color 0.15s;
        }
        .tp-text-input:focus { border-color: #52b788; }
        .tp-text-input::placeholder { color: #4b5563; }

        .tp-time-input {
          padding: 10px 12px;
          border-radius: 10px; border: 1.5px solid #2a2d3a;
          font-size: 14px; outline: none; font-family: inherit;
          color: #e8eaf0; background: #0f1117;
          cursor: pointer; transition: border-color 0.15s;
          min-width: 120px;
          color-scheme: dark;
        }
        .tp-time-input:focus { border-color: #52b788; }

        .tp-priority-row { display: flex; gap: 6px; }
        .tp-p-btn {
          flex: 1; padding: 7px 4px; border-radius: 8px;
          font-size: 12px; font-weight: 600; cursor: pointer;
          border: 1.5px solid #2a2d3a; background: #0f1117; color: #6b7280;
          transition: all 0.15s;
        }

        .tp-add-btn {
          padding: 10px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, #1b4332, #2d6a4f);
          color: #fff; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: opacity 0.15s;
        }
        .tp-add-btn:hover { opacity: 0.85; }

        .tp-list {
          flex: 1; overflow-y: auto; padding: 14px 20px;
          display: flex; flex-direction: column; gap: 8px;
          background: #0f1117;
        }
        .tp-list::-webkit-scrollbar { width: 4px; }
        .tp-list::-webkit-scrollbar-thumb { background: #2a2d3a; border-radius: 2px; }

        .tp-empty { text-align: center; padding: 48px 0; color: #4b5563; font-size: 14px; }

        .tp-item {
          background: #1a1d27; border-radius: 12px;
          padding: 12px 14px;
          display: flex; align-items: flex-start; gap: 12px;
          border-left: 3px solid #2a2d3a;
          transition: opacity 0.2s;
        }

        .tp-cb {
          width: 20px; height: 20px; border-radius: 6px;
          border: 2px solid #3a3d4a; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px; transition: all 0.15s;
        }
        .tp-cb.done { background: #2d6a4f; border-color: #2d6a4f; }
        .tp-cb-check { color: #fff; font-size: 11px; font-weight: 700; }

        .tp-item-body { flex: 1; min-width: 0; }
        .tp-item-text { font-size: 14px; font-weight: 500; color: #e8eaf0; line-height: 1.4; word-break: break-word; }
        .tp-item-text.done { text-decoration: line-through; color: #4b5563; }

        .tp-item-meta { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
        .tp-time-tag { font-size: 11px; color: #6b7280; font-weight: 600; display: flex; align-items: center; gap: 3px; }
        .tp-p-tag { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 8px; }

        .tp-del {
          background: none; border: none; cursor: pointer;
          color: #3a3d4a; font-size: 16px; padding: 2px;
          transition: color 0.15s; flex-shrink: 0; line-height: 1;
        }
        .tp-del:hover { color: #ef4444; }

        .tp-footer {
          padding: 12px 20px;
          background: #1a1d27; border-top: 1px solid #2a2d3a;
          display: flex; justify-content: space-between; align-items: center;
        }
        .tp-footer-text { font-size: 13px; color: #6b7280; }
        .tp-clear-btn {
          font-size: 12px; font-weight: 600; color: #ef4444;
          background: none; border: none; cursor: pointer;
          padding: 4px 8px; border-radius: 6px; transition: background 0.15s;
        }
        .tp-clear-btn:hover { background: #2d1515; }
      `}</style>

      {/* Navbar */}
      <nav className="nb nb-root">
        <span className="nb-logo" onClick={() => navigate('/dashboard')}>Serenity Steps</span>
        <div className="nb-right">
          <button
            className={`nb-todo-btn ${open ? 'active' : ''}`}
            onClick={() => setOpen(o => !o)}
          >
            ✏️ To-Do
            {todos.filter(t => !t.completed).length > 0 && (
              <span className="nb-todo-badge">{todos.filter(t => !t.completed).length}</span>
            )}
          </button>

          <div className="nb-avatar" onClick={() => navigate('/profile')} title={user?.name}>
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
        </div>
      </nav>

      {/* ToDo slide panel */}
      {open && (
        <>
          <div className="todo-overlay" onClick={() => setOpen(false)} />
          <div className="todo-panel nb-root" ref={panelRef}>

            <div className="tp-header">
              <div className="tp-header-top">
                <span className="tp-title">✏️ Self To-Do</span>
                <button className="tp-close" onClick={() => setOpen(false)}>×</button>
              </div>
              <div className="tp-progress-wrap">
                <div className="tp-track">
                  <div className="tp-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="tp-pct">{done}/{total} done</span>
              </div>
            </div>

            <div className="tp-form">
              <div className="tp-input-row">
                <input
                  ref={inputRef}
                  className="tp-text-input"
                  placeholder="Add a task..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTodo()}
                />
                <input
                  className="tp-time-input"
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  title="Set a time"
                />
              </div>

              <div className="tp-priority-row">
                {Object.entries(PRIORITY).map(([key, val]) => (
                  <button
                    key={key}
                    className="tp-p-btn"
                    style={priority === key ? {
                      background: val.bg, color: val.color, border: `1.5px solid ${val.border}`,
                    } : {}}
                    onClick={() => setPriority(key)}
                  >
                    {val.dot} {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>

              <button className="tp-add-btn" onClick={addTodo}>+ Add Task</button>
            </div>

            <div className="tp-list">
              {loading && <div className="tp-empty">Loading...</div>}
              {!loading && todos.length === 0 && (
                <div className="tp-empty">
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
                  No tasks yet — add one above!
                </div>
              )}
              {todos.map(todo => {
                const p = PRIORITY[todo.priority] || PRIORITY.medium;
                return (
                  <div
                    key={todo._id}
                    className="tp-item"
                    style={{ borderLeftColor: p.color, opacity: todo.completed ? 0.5 : 1 }}
                  >
                    <div className={`tp-cb ${todo.completed ? 'done' : ''}`} onClick={() => toggle(todo._id)}>
                      {todo.completed && <span className="tp-cb-check">✓</span>}
                    </div>
                    <div className="tp-item-body">
                      <div className={`tp-item-text ${todo.completed ? 'done' : ''}`}>{todo.text}</div>
                      <div className="tp-item-meta">
                        {todo.time && <span className="tp-time-tag">🕐 {todo.time}</span>}
                        <span className="tp-p-tag" style={{ background: p.bg, color: p.color }}>{todo.priority}</span>
                      </div>
                    </div>
                    <button className="tp-del" onClick={() => remove(todo._id)}>×</button>
                  </div>
                );
              })}
            </div>

            <div className="tp-footer">
              <span className="tp-footer-text">
                {todos.filter(t => !t.completed).length} task{todos.filter(t => !t.completed).length !== 1 ? 's' : ''} remaining
              </span>
              {todos.some(t => t.completed) && (
                <button
                  className="tp-clear-btn"
                  onClick={async () => {
                    const completed = todos.filter(t => t.completed);
                    await Promise.all(completed.map(t => axios.delete(`http://localhost:5000/api/todos/${t._id}`)));
                    setTodos(prev => prev.filter(t => !t.completed));
                  }}
                >
                  Clear completed
                </button>
              )}
            </div>

          </div>
        </>
      )}
    </>
  );
}