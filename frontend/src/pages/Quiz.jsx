import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const QUIZ = {
  'Social Media': [
    { q: 'How often do you check social media apps per day?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'How much time do you spend on social media daily?', opts: ['<1hr', '1-3hr', '>3hr'] },
    { q: 'Do you feel anxious when you cannot access social media?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Do you scroll social media before sleeping?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Do you compare yourself to others based on social media?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
  ],
  'Gaming': [
    { q: 'How often do you play games for long hours?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'How many hours do you spend gaming daily?', opts: ['<1hr', '1-3hr', '>3hr'] },
    { q: 'Do you skip meals or sleep to continue gaming?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Do you feel irritable when you cannot play?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Has gaming affected your work, studies, or relationships?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
  ],
  'Alcohol': [
    { q: 'How often do you consume alcohol?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'How much do you drink in a single sitting?', opts: ['<1hr', '1-3hr', '>3hr'] },
    { q: 'Do you drink to cope with stress or emotions?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Do you feel a craving for alcohol during the day?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Has drinking affected your health or relationships?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
  ],
  'Smoking': [
    { q: 'How often do you smoke or vape?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'How many cigarettes/vapes do you use per day?', opts: ['<1hr', '1-3hr', '>3hr'] },
    { q: 'Do you smoke to deal with stress?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Have you tried quitting and failed?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Do you feel irritable without smoking?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
  ],
  'Online Shopping': [
    { q: 'How often do you browse shopping apps without a specific need?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'How much time do you spend on shopping apps daily?', opts: ['<1hr', '1-3hr', '>3hr'] },
    { q: 'Do you buy things impulsively and regret them later?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Do you hide purchases from family members?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Have online purchases caused financial stress?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
  ],
  'Pornography': [
    { q: 'How often do you consume adult content?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'How much time do you spend on it daily?', opts: ['<1hr', '1-3hr', '>3hr'] },
    { q: 'Do you feel you cannot stop even when you want to?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Has it affected your real-life relationships?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'Do you feel guilt or shame after consuming it?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
  ],
};

const categories = Object.keys(QUIZ);

export default function Quiz() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [catIdx, setCatIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  const category = categories[catIdx];
  const questions = QUIZ[category];
  const catAnswers = answers[category] || [];
  const allAnswered = catAnswers.length === questions.length && catAnswers.every(Boolean);

  const answer = (qIdx, val) => {
    setAnswers(prev => {
      const arr = [...(prev[category] || [])];
      arr[qIdx] = val;
      return { ...prev, [category]: arr };
    });
  };

  const next = () => {
    if (catIdx < categories.length - 1) setCatIdx(i => i + 1);
    else submit();
  };

  const baseUrl = 'https://serenity-steps-1st-draft-1-backend-1.onrender.com'

  const submit = async () => {
    const { data } = await axios.post(`${baseUrl}/api/addiction/quiz`, { answers });
    setUser(u => ({ ...u, addictions: data.addictions }));
    navigate('/profile');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.progress}>{catIdx + 1} / {categories.length}</span>
        <h2 style={styles.category}>{category} Addiction Assessment</h2>
        <div style={styles.bar}><div style={{ ...styles.fill, width: `${((catIdx) / categories.length) * 100}%` }} /></div>
      </div>
      <div style={styles.questions}>
        {questions.map((q, qi) => (
          <div key={qi} style={styles.qCard}>
            <p style={styles.qText}>{qi + 1}. {q.q}</p>
            <div style={styles.opts}>
              {q.opts.map(opt => (
                <button key={opt} style={{ ...styles.opt, background: catAnswers[qi] === opt ? '#2d6a4f' : '#f5f5f5', color: catAnswers[qi] === opt ? '#fff' : '#333' }}
                  onClick={() => answer(qi, opt)}>{opt}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button style={{ ...styles.btn, opacity: allAnswered ? 1 : 0.5 }} disabled={!allAnswered} onClick={next}>
        {catIdx < categories.length - 1 ? `Next: ${categories[catIdx + 1]} →` : 'See My Results'}
      </button>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f4f8', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  header: { width: '100%', maxWidth: 640, marginBottom: 24 },
  progress: { fontSize: 13, color: '#888' },
  category: { fontSize: 22, fontWeight: 700, margin: '4px 0 12px' },
  bar: { height: 6, background: '#e0e0e0', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', background: '#2d6a4f', transition: 'width 0.4s' },
  questions: { width: '100%', maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 16 },
  qCard: { background: '#fff', borderRadius: 12, padding: 20 },
  qText: { fontWeight: 500, marginBottom: 12 },
  opts: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  opt: { padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all 0.15s' },
  btn: { marginTop: 32, padding: '14px 48px', borderRadius: 10, background: '#2d6a4f', color: '#fff', border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer' },
};