# Amina Bibi — Portfolio Site

A static, no-build portfolio site: `index.html` + `styles.css` + `script.js`,
plus your project PDFs in `assets/`. No server or framework required.

## Preview it locally

Open `index.html` directly in a browser, or, for the most reliable experience,
serve the folder:

```bash
cd site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Edit your content

- **Profile, skills, experience, contact:** edit the text directly in
  `index.html`.
- **Projects:** the pre-loaded project cards live in the `PRELOADED_PROJECTS`
  array near the top of `script.js`. Edit the title, summary, tools, and
  `link` (point it at a PDF in `assets/`, or any URL).
- **Add projects without touching code:** open the live site, scroll to
  Projects, and use "Add a project." Those entries are saved in your
  browser's local storage on that device only — use "Export my projects"
  to download them as JSON, and "Import" to load them on another device or
  merge them into `PRELOADED_PROJECTS` for good.
- **Colors and type:** all design tokens (colors, fonts, spacing) are defined
  at the top of `styles.css` under `:root`.

## Publish it for free

**GitHub Pages**
1. Create a new GitHub repository and push everything in this `site/` folder
   to it (as the repo root).
2. In the repo, go to Settings → Pages → Source, and choose the `main`
   branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

**Netlify / Vercel**
Drag and drop this folder onto netlify.com/drop, or connect the repo on
vercel.com — both auto-detect a static site and need no build settings.

## Notes

- The "Add a project" form saves to the browser's local storage, so it only
  persists on the device/browser you used to add it — it won't sync across
  visitors. For a shared, always-on database of projects, you'd need a small
  backend (e.g. a free tier on Supabase or Firebase) — ask if you'd like that
  added.
- Swap `assets/Amina_Bibi_CV.pdf` for an updated CV any time; the filename is
  referenced in two places in `index.html` ("Download CV" in the nav and in
  Contact).
