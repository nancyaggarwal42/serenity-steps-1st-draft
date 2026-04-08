import { useNavigate } from 'react-router-dom';

export default function Choice() {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Let's understand your journey</h1>
      <p style={styles.sub}>Do you already know what you're struggling with?</p>
      <div style={styles.btnRow}>
        <button style={{ ...styles.btn, background: '#2d6a4f' }} onClick={() => navigate('/know-addiction')}>
          ✅ Yes, I know my addiction
        </button>
        <button style={{ ...styles.btn, background: '#1a6fa8' }} onClick={() => navigate('/quiz')}>
          🤔 I'm not sure — take the quiz
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8', padding: 24 },
  title: { fontSize: 28, fontWeight: 700, color: '#222', textAlign: 'center' },
  sub: { color: '#555', fontSize: 16, marginBottom: 40, textAlign: 'center' },
  btnRow: { display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' },
  btn: { padding: '16px 32px', borderRadius: 12, color: '#fff', border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer', minWidth: 200 },
};