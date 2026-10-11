import { useState, useEffect } from 'react';
import './App.css';

const empty = { name: '', year: 'Freshman', apartment: '', rating: 0, text: '' };

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [inputs, setInputs] = useState(empty);

  useEffect(() => {
    fetch('/api/reviews').then(res => res.json()).then(setReviews);
  }, []);

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

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
    <>
      <header>Carolina Cribs</header>

      <main>
        <h2>Student Reviews</h2>

        <form onSubmit={addReview}>
          <input name="name" placeholder="Your name" value={inputs.name} onChange={handleChange} required />
          <select name="year" value={inputs.year} onChange={handleChange}>
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
          </select>
          <br />
          <input name="apartment" placeholder="Apartment" value={inputs.apartment} onChange={handleChange} required />
          
  {[1, 2, 3, 4, 5].map(n => (
    <button
      key={n}
      type="button"
      className="star"
      onClick={() => setInputs({ ...inputs, rating: n })}
      style={{ color: n <= inputs.rating ? '#d4a017' : '#ccc' }}
    >
      ★
    </button>
  ))}

          <textarea name="text" placeholder="Your review" value={inputs.text} onChange={handleChange} required />
          <button>Add Review</button>
        </form>

        {reviews.map((r, i) => (
          <div className="card" key={i}>
            <strong>{r.apartment}</strong> <span className="stars">{'★'.repeat(r.rating)}</span>
            <p>“{r.text}”</p>
            <div className="info">{r.name} · {r.year} · {r.date}</div>
          </div>
        ))}
      </main>
    </>
  );
}