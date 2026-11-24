const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const searchInput = document.getElementById('publication-search');
const yearFilter = document.getElementById('year-filter');
const publicationItems = [...document.querySelectorAll('.publication')];
const noResults = document.getElementById('no-results');

function filterPublications() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  const year = yearFilter?.value || 'all';
  let visible = 0;
  publicationItems.forEach(item => {
    const matchesQuery = item.textContent.toLowerCase().includes(query);
    const matchesYear = year === 'all' || item.dataset.year === year;
    const show = matchesQuery && matchesYear;
    item.hidden = !show;
    if (show) visible += 1;
  });
  if (noResults) noResults.hidden = visible > 0;
}
searchInput?.addEventListener('input', filterPublications);
yearFilter?.addEventListener('change', filterPublications);
document.getElementById('current-year').textContent = new Date().getFullYear();
