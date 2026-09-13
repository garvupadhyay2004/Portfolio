# Gaurav Upadhyay — Portfolio

A static recreation of the portfolio site (hero, selected work, experience, toolkit, about, credentials, contact), built with plain HTML/CSS/JS — no build step required.

## Run it in VS Code

1. Open this folder in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (Ritwick Dey) from the Extensions panel, if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.
   - Or, without any extension: just double-click `index.html` to open it in your browser directly.

## Files

- `index.html` — page structure and content
- `styles.css` — dark/light theme, layout, and typography
- `script.js` — theme toggle, mobile menu, footer year
- `assets/` — put your photo here as `assets/profile.jpg`, your résumé PDF as `assets/Gaurav_Upadhyay_Resume.pdf`, and your employer logo as `assets/airtel-logo.png`
- `blog/` — a self-contained mini-blog, linked from the "Blog" nav item

## Customizing

- **Photo**: drop a photo into `assets/profile.jpg` — the hero frame will pick it up automatically.
- **Résumé**: drop your PDF into `assets/Gaurav_Upadhyay_Resume.pdf` so the "Download résumé" button works.
- **Company logo**: drop a small square PNG into `assets/airtel-logo.png` — it shows up under "Gurugram" on both experience entries. If the file is missing, the logo just quietly hides itself instead of showing a broken image.
- **Colors**: edit the `:root` and `[data-theme="light"]` variables at the top of `styles.css`.
- **Content**: all text lives directly in `index.html` — projects, experience bullets, skills, and credentials are plain list items you can edit freely.
- **Social links**: LinkedIn and GitHub are wired up in the nav and the "Let's connect" section (pulled from your resume). Find `YOUR-USERNAME` in `index.html` and swap in your real LeetCode profile URL — it appears twice.

## The blog

`blog/index.html` lists post previews; each post is its own HTML file under `blog/posts/`, sharing `styles.css` plus a small extra stylesheet, `blog/blog.css`.

**To add a new post:**
1. Duplicate `blog/posts/_template.html`, rename it (e.g. `synaptiq-build-notes.html`), and fill in the title, date, and body content. Instructions are commented at the top of the template.
2. Put any images for the post in `assets/blog/` (create the folder if it doesn't exist) and point the `<img src="...">` tags at them — the cover image and any inline `<figure>` images both work the same way.
3. Copy one of the `<article class="post-card">` blocks in `blog/index.html`, update its link, thumbnail, date, title, and excerpt so the new post shows up in the list.

Two starter posts are already drafted from your resume content — `blog/posts/business-analyst-internship.html` and `blog/posts/marketing-trainee-internship.html` — with the real bullet points but placeholder narrative text in brackets for you to write in your own voice, and image slots for screenshots.

## Notes

This was rebuilt from the content and design of your existing preview (`gaurav-data.preview.emergentagent.com`), not copied from its source — that site's underlying code isn't accessible to me. Some visual details (exact spacing, font metrics, animation timing) will differ slightly from the original.
