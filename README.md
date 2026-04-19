# Shaar HaNegev GitHub Pages Ready Site

This is the safest GitHub Pages version: no Vite, no build step, no `/src/main.jsx`.

## How to publish

1. Upload these files to the root of your GitHub repository:
   - `index.html`
   - `404.html`
   - `.nojekyll`
   - `README.md`

2. In GitHub, go to:
   **Settings → Pages**

3. Set:
   **Build and deployment → Source → Deploy from a branch**

4. Choose:
   **Branch: main**
   **Folder: / (root)**

5. Save.

Your site should work at:

`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

Example:

`https://chengolz.github.io/shaar/`

## Why this fixes `main.jsx 404`

The previous Vite source version had:

`<script type="module" src="/src/main.jsx"></script>`

GitHub Pages cannot serve that raw source as a built app.

This version is a complete static page, so it has no `/src/main.jsx` request at all.
