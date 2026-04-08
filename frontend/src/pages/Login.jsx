import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const baseUrl = 'https://serenity-steps-1st-draft-1-backend-1.onrender.com'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/api/auth/login`, form);
      login(data.token, data.user);
      if (data.user.addictions?.length > 0) navigate('/dashboard');
      else navigate('/choice');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background: #06080f;
          background-image:
            radial-gradient(ellipse 60% 60% at 15% 50%, rgba(30,20,80,0.45) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 50%, rgba(15,60,40,0.5) 0%, transparent 60%);
          padding: 20px;
        }

        .login-card {
          position: relative;
          width: 100%;
          max-width: 920px;
          min-height: 460px;
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

        /* LEFT — navy (form side) */
        .bg-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, #0e1535 0%, #090d24 55%, #060818 100%);
          clip-path: polygon(0 0, 52% 0, 38% 100%, 0 100%);
          z-index: 0;
        }

        .bg-left::after {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          top: -40px; left: -20px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* RIGHT — green (welcome side) */
        .bg-right {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, #0a3528 0%, #06200f 55%, #04150c 100%);
          clip-path: polygon(52% 0, 100% 0, 100% 100%, 38% 100%);
          z-index: 0;
        }

        .bg-right::after {
          content: '';
          position: absolute;
          width: 380px; height: 380px;
          top: 50%; right: 10%;
          transform: translate(50%, -50%);
          background: radial-gradient(circle, rgba(34,197,128,0.13) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        .slash-glow {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
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

        /* ── LEFT — form on navy ── */
        .login-left {
          position: relative;
          z-index: 2;
          width: 40%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 52px 28px 52px 48px;
        }

        .login-left h2 {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 22px;
        }

        .login-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
          font-size: 13px;
          padding: 9px 13px;
          border-radius: 10px;
          margin-bottom: 14px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .login-input {
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
        }

        .login-input::placeholder { color: rgba(255,255,255,0.22); }

        .login-input:focus {
          border-color: rgba(52,211,153,0.45);
          background: rgba(52,211,153,0.05);
          box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
        }

        .login-btn {
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

        .login-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(16,185,129,0.4);
        }

        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }

        /* ── RIGHT — welcome on green ── */
        .login-right {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 52px 48px 52px 80px;
          text-align: center;
        }

        .login-right h1 {
          font-size: 42px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 18px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }

        .login-right .register-text {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
        }

        .login-right .register-text a {
          color: #34d399;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid rgba(52,211,153,0.4);
          padding-bottom: 1px;
          transition: color 0.15s, border-color 0.15s;
        }

        .login-right .register-text a:hover {
          color: #6ee7b7;
          border-color: #6ee7b7;
        }

        @media (max-width: 600px) {
          .bg-left, .bg-right, .slash-glow, .login-right { display: none; }
          .login-card {
            background: linear-gradient(160deg, #0e1535 0%, #060818 100%);
            border-radius: 20px;
          }
          .login-left { width: 100%; padding: 36px 24px; }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">

          <div className="bg-left" />
          <div className="bg-right" />
          <div className="slash-glow" />

          {/* LEFT — form on navy bg */}
          <div className="login-left">
            <h2>Welcome back</h2>

            {error && <div className="login-error">{error}</div>}

            <form className="login-form" onSubmit={handleSubmit}>
              <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>

          {/* RIGHT — welcome on green bg */}
          <div className="login-right">
            <h1>Hello Again! 👋</h1>
            <p className="register-text">
              New here? <Link to="/register">Register</Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}