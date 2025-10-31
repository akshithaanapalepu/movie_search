async function api(path) {
  const res = await fetch(`${window.API_BASE}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const results = document.getElementById('results');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const details = document.getElementById('details');

function cardTemplate(m) {
  const poster = m.Poster && m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
  return `
    <div class="card" data-id="${m.imdbID}">
      <img src="${poster}" alt="${m.Title}" />
      <div class="meta">
        <strong>${m.Title}</strong><br />
        ${m.Year} • ${m.Type}
      </div>
    </div>
  `;
}

function showModal(html) {
  details.innerHTML = html;
  modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const q = queryInput.value.trim();
  if (!q) return;
  const data = await api(`/api/search?query=${encodeURIComponent(q)}`);
  results.innerHTML = (data.Search || []).map(cardTemplate).join('') || '<p>No results.</p>';
});

results.addEventListener('click', async (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const id = card.getAttribute('data-id');
  const m = await api(`/api/movie/${id}`);
  const poster = m.Poster && m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/220x330?text=No+Image';
  const html = `
    <div class="detail-grid">
      <img class="poster" src="${poster}" alt="${m.Title}" />
      <div>
        <h2>${m.Title} (${m.Year})</h2>
        <div class="kv">Rated: ${m.Rated || 'N/A'} • Runtime: ${m.Runtime || 'N/A'} • Genre: ${m.Genre || 'N/A'}</div>
        <p>${m.Plot || 'No plot available.'}</p>
        <div class="kv">Actors: ${m.Actors || 'N/A'}</div>
        <div class="kv">IMDB Rating: ${m.imdbRating || 'N/A'}</div>
      </div>
    </div>
  `;
  showModal(html);
});
