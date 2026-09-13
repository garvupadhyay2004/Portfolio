// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (persists choice in-memory + localStorage)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  localStorage.setItem('portfolio-theme', next);
  syncGiscusTheme(next);
});

// Keep the Giscus comments widget (if present on the page) in sync with the site theme
function syncGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: theme === 'light' ? 'light' : 'dark' } } },
    'https://giscus.app'
  );
}
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://giscus.app') return;
  if (!(typeof event.data === 'object' && event.data.giscus)) return;
  const currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  syncGiscusTheme(currentTheme);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});