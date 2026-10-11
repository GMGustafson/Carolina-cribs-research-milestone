import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

// Load reviews from the file when the server starts
const FILE = new URL('./reviews.json', import.meta.url);
const reviews = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Send all reviews
app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

// Add a review
app.post('/api/reviews', (req, res) => {
  if (!req.body.name || !req.body.text) {
    return res.status(400).json({ error: 'Name and review are required' });
  }
  const review = {
    ...req.body,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
  reviews.unshift(review);

  // Save all reviews back to the file
  fs.writeFileSync(FILE, JSON.stringify(reviews, null, 2));

  res.json(reviews);
});

app.listen(3001);