# Sha'ar HaNegev Homepage Prototype

A Vite + React + Tailwind prototype for a redesigned homepage for **מועצה אזורית שער הנגב**.

The current version is the **Pastel Dream** UI direction: soft pastel palette, RTL Hebrew layout, quick service actions, smart status bar, village personalization, deep search, emergency floating actions, and mobile-first bottom navigation.

## Tech stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Heebo font

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL that Vite prints, usually:

```bash
http://localhost:5173
```

## Build for production

```bash
npm run build
npm run preview
```

## Push to GitHub

Create an empty repository on GitHub first, then run:

```bash
git init
git add .
git commit -m "Initial homepage prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Notes for production

- Replace static arrays in `src/App.jsx` with API or CMS data.
- The emergency state should come from `/api/emergency` or a realtime channel.
- The council logo currently loads from the public `sng.org.il` URL. For production, move it to local assets or the CMS.
- Current weather, waste pickup, village notices, and feed items are placeholder data.
- Search is client-side for the prototype. For production, use server search or a search provider.


## Important: GitHub Pages deployment

Do not open `index.html` directly on GitHub Pages and do not deploy the raw source files as the website.

This is a Vite app. GitHub Pages should serve the compiled `dist/` output.

This repo includes `.github/workflows/deploy.yml`, so after pushing to `main`:

1. Go to your GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Push to `main`.
5. Wait for the workflow to finish.
6. Open the Pages URL.

The `vite.config.js` file uses `base: "./"` so the built assets work correctly under a repository subpath like:

```txt
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

If you see `main.jsx 404`, it usually means GitHub Pages is serving the unbuilt source app instead of `dist/`, or the app was opened from the wrong folder/path.
