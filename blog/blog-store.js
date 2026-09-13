/*
  blog-store.js
  Shared helpers for the "owner posts" feature.

  IMPORTANT — read this before relying on it:
  - Posts added through admin.html are saved to *this browser's* localStorage,
    under the key below. localStorage is per-browser, per-device — it is NOT
    a shared database. So a post you add on your laptop will show up for you
    on your laptop, but a visitor on their own phone or laptop will NOT see it,
    because their browser has its own separate storage.
  - To make a new post visible to everyone, use the "Download standalone post"
    button in the admin panel after saving. That gives you a real .html file —
    drop it into blog/posts/, add one card to blog/index.html (there's a ready
    -to-copy snippet printed alongside the download), and re-deploy/upload your
    site. That file is then part of the site itself, same as the two starter
    posts, and everyone sees it.
  - The password check in admin.html is a soft lock, not real security — this
    is a static site with no server, so there's no way to truly hide a secret
    from someone willing to view the page source. It's enough to keep casual
    visitors from finding or using the editor.
*/

const BLOG_STORE_KEY = 'gu-owner-blog-posts';

function getOwnerPosts() {
  try {
    const raw = localStorage.getItem(BLOG_STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Could not read saved posts:', e);
    return [];
  }
}

function saveOwnerPosts(posts) {
  localStorage.setItem(BLOG_STORE_KEY, JSON.stringify(posts));
}

function upsertOwnerPost(post) {
  const posts = getOwnerPosts();
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) posts[idx] = post; else posts.unshift(post);
  saveOwnerPosts(posts);
}

function deleteOwnerPost(id) {
  saveOwnerPosts(getOwnerPosts().filter(p => p.id !== id));
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'post';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Renders one post-card <article> element for the blog list page. */
function renderOwnerPostCard(post) {
  const article = document.createElement('article');
  article.className = 'post-card';
  const href = `post-view.html?id=${encodeURIComponent(post.id)}`;
  article.innerHTML = `
    <a href="${href}" class="post-thumb">
      ${post.cover ? `<img src="${post.cover}" alt="" />` : ''}
    </a>
    <div class="post-card-body">
      <span class="post-date">${escapeHtml(post.date || '')}</span>
      <h2><a href="${href}">${escapeHtml(post.title)}</a></h2>
      <p>${escapeHtml(post.excerpt || '')}</p>
      <a class="read-more" href="${href}">Read the post ↗</a>
    </div>
  `;
  if (!post.cover) article.querySelector('.post-thumb').classList.add('no-photo');
  return article;
}

/** Builds a full standalone HTML file (string) for a saved post, matching the site's post template. */
function buildStandalonePostHtml(post) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(post.title)} — Gaurav Upadhyay</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../styles.css" />
<link rel="stylesheet" href="../blog.css" />
</head>
<body>

<header class="nav">
  <div class="nav-inner">
    <a href="../../index.html" class="brand">
      <span class="brand-mark">GU</span>
      <span class="brand-name">GAURAV UPADHYAY</span>
    </a>
    <nav class="nav-links">
      <a href="../../index.html#work">Work</a>
      <a href="../../index.html#experience">Experience</a>
      <a href="../../index.html#skills">Skills</a>
      <a href="../../index.html#about">About</a>
      <a href="../index.html" class="nav-cta">Blog</a>
    </nav>
    <button id="themeToggle" class="theme-toggle" aria-label="Toggle light and dark theme">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
      </svg>
    </button>
    <button id="navToggle" class="nav-toggle" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main>
  <article>
    <header class="post-header">
      <span class="post-date">${escapeHtml(post.date || '')}</span>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="post-meta">${escapeHtml(post.readTime || '')}</p>
    </header>

    ${post.cover ? `<div class="post-cover"><img src="${post.cover}" alt="" /></div>` : ''}

    <div class="post-body">
      ${post.bodyHtml || ''}
    </div>

    <div class="post-back">
      <a href="../index.html">← Back to all posts</a>
    </div>

    <section class="comments">
      <h3>Comments</h3>
      <!-- Powered by Giscus (GitHub Discussions). Setup steps are in README.md. -->
      <script src="https://giscus.app/client.js"
        data-repo="garvupadhyay2004/Portfolio"
        data-repo-id="R_kgDOUZafjw"
        data-category="General"
        data-category-id="DIC_kwDOUZafj84DFhrm"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="dark"
        data-lang="en"
        crossorigin="anonymous"
        async>
      </script>
    </section>
  </article>
</main>

<footer class="footer">
  <span>© <span id="year"></span> Gaurav Upadhyay</span>
  <a href="../../index.html">← Back to portfolio</a>
  <span>Built around real data</span>
</footer>

<script src="../../script.js"></script>
</body>
</html>
`;
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** The ready-to-paste <article class="post-card"> snippet for blog/index.html. */
function buildIndexCardSnippet(post, filename) {
  return `<article class="post-card">
  <a href="posts/${filename}" class="post-thumb">
    <img src="${post.cover || '../assets/blog/your-cover.jpg'}" alt="" onerror="this.parentElement.classList.add('no-photo')" />
  </a>
  <div class="post-card-body">
    <span class="post-date">${escapeHtml(post.date || '')}</span>
    <h2><a href="posts/${filename}">${escapeHtml(post.title)}</a></h2>
    <p>${escapeHtml(post.excerpt || '')}</p>
    <a class="read-more" href="posts/${filename}">Read the post ↗</a>
  </div>
</article>`;
}