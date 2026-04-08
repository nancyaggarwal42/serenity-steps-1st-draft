import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ADDICTIONS = [
  { name: 'Social Media', desc: 'Compulsive checking of Instagram, Twitter, TikTok etc.' },
  { name: 'Gaming', desc: 'Excessive video game playing affecting daily life.' },
  { name: 'Alcohol', desc: 'Dependency or overuse of alcoholic beverages.' },
  { name: 'Smoking', desc: 'Nicotine addiction through cigarettes or vaping.' },
  { name: 'Online Shopping', desc: 'Uncontrolled urge to buy things online.' },
  { name: 'Pornography', desc: 'Compulsive consumption of adult content.' },
];

export default function KnowAddiction() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const toggle = (name) => setSelected(prev =>
    prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
  );

  const baseUrl = 'https://serenity-steps-1st-draft-1-backend-1.onrender.com'

  const handleSubmit = async () => {
    if (!selected.length) return alert('Please select at least one addiction.');
    const { data } = await axios.post(`${baseUrl}/api/addiction/known`, { addictions: selected });
    setUser(u => ({ ...u, addictions: data.addictions }));
    navigate('/profile');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Select your addictions</h1>
      <p style={styles.sub}>You can select one or more</p>
      <div style={styles.grid}>
        {ADDICTIONS.map(a => (
          <div key={a.name} style={{ ...styles.card, border: selected.includes(a.name) ? '2px solid #2d6a4f' : '2px solid #e0e0e0' }}
            onClick={() => toggle(a.name)}>
            <h3 style={styles.cardTitle}>{selected.includes(a.name) ? '✅ ' : ''}{a.name}</h3>
            <p style={styles.cardDesc}>{a.desc}</p>
          </div>
        ))}
      </div>
      <button style={styles.btn} onClick={handleSubmit}>Submit ({selected.length} selected)</button>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f4f8', padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 700 },
  sub: { color: '#666', marginBottom: 32 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, width: '100%', maxWidth: 800 },
  card: { background: '#fff', borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'border 0.2s' },
  cardTitle: { margin: '0 0 8px', fontSize: 16, fontWeight: 600 },
  cardDesc: { margin: 0, fontSize: 13, color: '#666' },
  btn: { marginTop: 32, padding: '14px 40px', borderRadius: 10, background: '#2d6a4f', color: '#fff', border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer' },
};