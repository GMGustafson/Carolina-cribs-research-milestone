import { useState, useEffect } from 'react';

const empty = { name: '', year: 'Freshman', apartment: '', rating: 5, text: '' };

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [inputs, setInputs] = useState(empty);

  // Load reviews when the page opens
  useEffect(() => {
    fetch('/api/reviews').then(res => res.json()).then(setReviews);
  }, []);

  // Update inputs when the user types
  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  // Send the new review to the server
  const addReview = async (event) => {
    event.preventDefault();
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    });
    setReviews(await res.json());
    setInputs(empty);
  };

  return (
    <main style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#73000a' }}>Carolina Cribs Reviews</h1>

      <form onSubmit={addReview}>
        <input name="name" placeholder="Your name" value={inputs.name}
          onChange={handleChange} required />
        <select name="year" value={inputs.year} onChange={handleChange}>
          <option>Freshman</option>
          <option>Sophomore</option>
          <option>Junior</option>
          <option>Senior</option>
          <option>Grad Student</option>
        </select>
        <br />
        <input name="apartment" placeholder="Apartment" value={inputs.apartment}
          onChange={handleChange} required />
        <select name="rating" value={inputs.rating} onChange={handleChange}>
          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★</option>)}
        </select>
        <br />
        <textarea name="text" placeholder="Your review" value={inputs.text}
          onChange={handleChange} required style={{ width: '100%' }} />
        <button>Add Review</button>
      </form>

      {reviews.map((r, i) => (
        <div key={i} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10, marginTop: 10 }}>
          <strong>{r.apartment}</strong> {'★'.repeat(r.rating)}
          <p>"{r.text}"</p>          
          <small>{r.name} · {r.year} · {r.date}</small>
        </div>
      ))}
    </main>
  );
}