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
