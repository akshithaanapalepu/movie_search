# Movie Backend (OMDb proxy)

## Setup
```bash
cd backend
cp .env.example .env
# Edit .env and paste your OMDb API key (get free key at http://www.omdbapi.com/apikey.aspx)
npm install
npm start
```
Backend runs on `http://localhost:4000` and enables CORS.

## Endpoints
- `GET /api/search?query=batman`
- `GET /api/movie/:imdbID`
