// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';

// export default function Register() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', email: '', password: '', age: '', gender: '' });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/register', form);
//       login(data.token, data.user);
//       navigate('/choice');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h1 style={styles.title}>Serenity Steps</h1>
//         <h2 style={styles.subtitle}>Create your account</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input style={styles.input} placeholder="Full Name" value={form.name}
//             onChange={e => setForm({ ...form, name: e.target.value })} required />
//           <input style={styles.input} type="email" placeholder="Email" value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })} required />
//           <input style={styles.input} type="number" placeholder="Age" value={form.age}
//             onChange={e => setForm({ ...form, age: e.target.value })} required />
//           <select style={styles.input} value={form.gender}
//             onChange={e => setForm({ ...form, gender: e.target.value })} required>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <input style={styles.input} type="password" placeholder="Password" value={form.password}
//             onChange={e => setForm({ ...form, password: e.target.value })} required />
//           <button style={styles.btn} type="submit">Register</button>
//         </form>
//         <p style={{ textAlign: 'center', marginTop: 12 }}>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' },
//   card: { background: '#fff', borderRadius: 16, padding: 40, width: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
//   title: { textAlign: 'center', fontSize: 26, fontWeight: 700, color: '#2d6a4f', margin: '0 0 4px' },
//   subtitle: { textAlign: 'center', fontSize: 16, fontWeight: 400, color: '#555', margin: '0 0 24px' },
//   form: { display: 'flex', flexDirection: 'column', gap: 12 },
//   input: { padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, outline: 'none' },
//   btn: { padding: '12px', borderRadius: 8, background: '#2d6a4f', color: '#fff', border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer' },
//   error: { color: '#e74c3c', fontSize: 14, textAlign: 'center' },
// };
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', gender: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', form);
      login(data.token, data.user);
      navigate('/choice');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          /* Deep indigo-slate page bg */
          background: #06080f;
          background-image:
            radial-gradient(ellipse 60% 60% at 15% 50%, rgba(15,60,40,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 50%, rgba(30,20,80,0.45) 0%, transparent 60%);
          padding: 20px;
        }

        /* ── OUTER CARD ── */
        .reg-card {
          position: relative;
          width: 100%;
          max-width: 920px;
          min-height: 560px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.07),
            0 40px 120px rgba(0,0,0,0.7);
          animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
          display: flex;
          align-items: stretch;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─────────────────────────────────────────
           Background layers — the diagonal split
           Left  bg: polygon top-left → 52% top → 38% bottom → bottom-left
           Right bg: the inverse
        ───────────────────────────────────────── */
        .bg-left {
          position: absolute;
          inset: 0;
          /* Warm deep teal-emerald */
          background: linear-gradient(160deg, #0a3528 0%, #06200f 55%, #04150c 100%);
          clip-path: polygon(0 0, 52% 0, 38% 100%, 0 100%);
          z-index: 0;
        }

        /* soft glow inside left */
        .bg-left::after {
          content: '';
          position: absolute;
          width: 380px; height: 380px;
          top: 50%; left: 22%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(34,197,128,0.13) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        .bg-right {
          position: absolute;
          inset: 0;
          /* Cool deep violet-navy */
          background: linear-gradient(160deg, #0e1535 0%, #090d24 55%, #060818 100%);
          clip-path: polygon(52% 0, 100% 0, 100% 100%, 38% 100%);
          z-index: 0;
        }

        .bg-right::after {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          top: -40px; right: -20px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* The glowing slash line sitting exactly on the polygon edge */
        .slash-glow {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          /* A 2px strip along the diagonal using clip-path */
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(52,211,153,0.0)  10%,
            rgba(52,211,153,0.55) 35%,
            rgba(52,211,153,0.7)  50%,
            rgba(52,211,153,0.55) 65%,
            rgba(52,211,153,0.0)  90%,
            transparent 100%
          );
          clip-path: polygon(
            calc(52% - 1px) 0%,
            calc(52% + 1px) 0%,
            calc(38% + 1px) 100%,
            calc(38% - 1px) 100%
          );
        }

        /* ── LEFT CONTENT ── */
        .reg-left {
          position: relative;
          z-index: 2;
          /* Width matches where the slash starts — content stays safely left of it */
          width: 40%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 28px 48px 44px;
          text-align: center;
        }

        .reg-left h1 {
          font-size: 42px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 18px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }

        .reg-left .login-text {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
        }

        .reg-left .login-text a {
          color: #34d399;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid rgba(52,211,153,0.4);
          padding-bottom: 1px;
          transition: color 0.15s, border-color 0.15s;
        }

        .reg-left .login-text a:hover {
          color: #6ee7b7;
          border-color: #6ee7b7;
        }

        /* ── RIGHT CONTENT ── */
        .reg-right {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          /* Push content right so nothing overlaps the slash */
          padding: 44px 48px 44px 80px;
        }

        .reg-right h2 {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 22px;
        }

        .reg-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
          font-size: 13px;
          padding: 9px 13px;
          border-radius: 10px;
          margin-bottom: 14px;
        }

        .reg-form {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .reg-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 11px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.05);
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          outline: none;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
          -webkit-appearance: none;
        }

        .reg-input::placeholder { color: rgba(255,255,255,0.22); }

        .reg-input:focus {
          border-color: rgba(52,211,153,0.45);
          background: rgba(52,211,153,0.05);
          box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
        }

        .reg-input option { background: #0e1535; color: #fff; }

        .reg-btn {
          padding: 14px;
          border-radius: 11px;
          border: none;
          background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 2px;
          letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(16,185,129,0.3);
        }

        .reg-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(16,185,129,0.4);
        }

        .reg-btn:active:not(:disabled) { transform: translateY(0); }
        .reg-btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }

        @media (max-width: 600px) {
          .bg-left, .bg-right, .slash-glow, .reg-left { display: none; }
          .reg-card {
            background: linear-gradient(160deg, #0e1535 0%, #060818 100%);
            border-radius: 20px;
          }
          .reg-right { padding: 36px 24px; }
        }
      `}</style>

      <div className="reg-page">
        <div className="reg-card">

          {/* Diagonal background layers */}
          <div className="bg-left" />
          <div className="bg-right" />
          <div className="slash-glow" />

          {/* Left — welcome */}
          <div className="reg-left">
            <h1>Welcome! 🙏</h1>
            <p className="login-text">
              Already Registered? <Link to="/login">Login</Link>
            </p>
          </div>

          {/* Right — form */}
          <div className="reg-right">
            <h2>Create your account</h2>

            {error && <div className="reg-error">{error}</div>}

            <form className="reg-form" onSubmit={handleSubmit}>
              <input
                className="reg-input"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="reg-input"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                className="reg-input"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={e => setForm({ ...form, age: e.target.value })}
                required
              />
              <select
                className="reg-input"
                value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value })}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                className="reg-input"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button className="reg-btn" type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}