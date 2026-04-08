// light mode
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function QuoteCard() {
//   const [quote,   setQuote]   = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/quote')
//       .then(r => setQuote(r.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div style={s.skeleton} />;
//   if (!quote)  return null;

//   return (
//     <div style={s.card}>
//       <span style={s.bigQuote}>"</span>
//       <div style={s.body}>
//         <p style={s.text}>{quote.text}</p>
//         {/* <p style={s.author}>— {quote.author}</p> */}
//       </div>
//       <span style={s.tag}>Quote of the day</span>
//     </div>
//   );
// }

// const s = {
//   card:     { background: 'linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%)', borderRadius: 16, padding: '28px 32px', position: 'relative', overflow: 'hidden'},
//   bigQuote: { fontSize: 80, color: 'rgba(255,255,255,0.1)', position: 'absolute', top: -8, left: 20, lineHeight: 1, fontFamily: 'Georgia, serif', userSelect: 'none' },
//   body:     { position: 'relative' },
//   text:     { fontSize: 17, color: '#fff', lineHeight: 1.75, margin: '0 0 12px', fontStyle: 'italic' },
//   author:   { fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 },
//   tag:      { position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', fontSize: 11, padding: '4px 10px', borderRadius: 20, fontWeight: 600 },
//   skeleton: { height: 130, borderRadius: 16, background: 'linear-gradient(90deg,#d4edda,#b7dfcc,#d4edda)', backgroundSize: '200%', animation: 'shimmer 1.4s infinite' },
// };

// dark mode
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuoteCard() {
  const [quote,   setQuote]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/quote')
      .then(r => setQuote(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={s.skeleton} />;
  if (!quote)  return null;

  return (
    <div style={s.card}>
      <span style={s.bigQuote}>"</span>
      <div style={s.body}>
        <p style={s.text}>{quote.text}</p>
      </div>
      <span style={s.tag}>Quote of the day</span>
    </div>
  );
}

const s = {
  card:     { background: 'linear-gradient(135deg, #0d2b1f 0%, #1b4332 100%)', borderRadius: 16, padding: '28px 32px', position: 'relative', overflow: 'hidden', border: '1px solid #2d6a4f' },
  bigQuote: { fontSize: 80, color: 'rgba(255,255,255,0.07)', position: 'absolute', top: -8, left: 20, lineHeight: 1, fontFamily: 'Georgia, serif', userSelect: 'none' },
  body:     { position: 'relative', marginTop: '2%', marginBottom: 0 },
  text:     { fontSize: 17, color: '#d1fae5', lineHeight: 1.75, margin: '0 0 12px', fontStyle: 'italic' },
  tag:      { position: 'absolute', top: 10, left: '41%', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontSize: 14, padding: '4px 10px', borderRadius: 20, fontWeight: 600 },
  skeleton: { height: 110, borderRadius: 16, background: '#1a1d27', animation: 'pulse 1.4s ease infinite', border: '1px solid #2a2d3a' },
};