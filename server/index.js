import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

const reviews = JSON.parse(fs.readFileSync('reviews.json'));

app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const review = { ...req.body, date: new Date().toDateString() };
  reviews.unshift(review);
  fs.writeFileSync('reviews.json', JSON.stringify(reviews, null, 2));
  res.json(reviews);
    if (!req.body.name || !req.body.text) {
    return res.status(400).json({ error: 'Name and review are required' });
  }
});

app.listen(3001);