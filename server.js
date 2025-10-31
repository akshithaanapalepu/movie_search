import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.OMDB_API_KEY;

if (!API_KEY) {
  console.warn('Warning: OMDB_API_KEY not set. Set it in .env');
}

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/search', async (req, res) => {
  const q = req.query.query || '';
  if (!q) return res.status(400).json({ error: 'query required' });
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}`;
  const r = await fetch(url);
  const data = await r.json();
  res.json(data);
});

app.get('/api/movie/:id', async (req, res) => {
  const id = req.params.id;
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
  const r = await fetch(url);
  const data = await r.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log('Movie backend running on http://localhost:' + PORT);
});
