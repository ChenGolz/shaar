# שער הנגב דיגיטל — Homepage Prototype

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

This repo includes a GitHub Actions workflow.

1. Push this repo to GitHub.
2. Go to Settings → Pages.
3. Under Build and deployment, choose GitHub Actions.
4. Push to `main`.
5. Wait for the Deploy Vite app to GitHub Pages workflow to finish.

If you see `main.jsx 404`, GitHub Pages is serving raw source files instead of the compiled Vite `dist` build.
