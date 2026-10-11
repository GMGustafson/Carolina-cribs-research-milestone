import express from 'express';
const app = express();
app.use(express.json());

const reviews = [
  { apartment: 'The Hub', rating: 5, text: 'Great location!' },
  { apartment: 'VERVE', rating: 3, text: 'Parking is expensive.' },
];

// Send all reviews
app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

// Add a review
app.post('/api/reviews', (req, res) => {
  if (!req.body.text) return res.status(400).json({ error: 'Write something!' });
  reviews.push(req.body);
  res.json(reviews);
});

app.listen(3001);