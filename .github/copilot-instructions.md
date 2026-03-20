# Copilot Instructions for `space-retro`

## Build, run, and verify

- Install dependencies with `npm install`.
- Start the app locally with `npm run dev`.
- Create a production build with `npm run build`.
- Lint the project with `npm run lint`.
- Preview the production build with `npm run preview`.

This repository does not define a test script yet, so there is no single-test command to run. Use `npm run lint` and `npm run build` to verify changes.

## High-level architecture

- This is a Vite + React single-page app.
- `src/main.jsx` is the entry point and mounts `App` into `#root`.
- `src/App.jsx` contains the full page UI and the article-fetching logic.
- On mount, `App` fetches the latest articles from `https://api.spaceflightnewsapi.net/v4/articles/?limit=4` and renders loading, featured, secondary, and sidebar sections from that data.
- Styling is split between Tailwind utility classes in JSX, custom utilities in `src/index.css`, and theme tokens in `tailwind.config.js`.
- `tailwind.config.js` defines the retro palette, font families, and zero-radius defaults used throughout the UI.
- `src/index.css` adds the custom `scanline`, `animate-blink`, and `animate-float` effects, plus global body and icon styling.

## Key conventions

- Keep most visual changes in `src/App.jsx` as Tailwind utility classes unless a pattern is reused enough to belong in `src/index.css`.
- Prefer the existing retro arcade aesthetic: thick black borders, shadow offsets, uppercase labels, and high-contrast accent colors.
- Use the color and font tokens already defined in `tailwind.config.js` instead of introducing new ad hoc palette values.
- The app currently assumes browser-only execution; keep side effects like `fetch` inside React effects and avoid server-only APIs.
- External links opened from the feed should continue to use `target="_blank"` with `rel="noreferrer"`.
- Maintain the current React 18 and Vite setup in `src/main.jsx`; the app is wrapped in `React.StrictMode`.
- ESLint is configured with React and React Hooks rules, so keep hooks top-level and avoid adding patterns that trigger `react-hooks` or `react-refresh` warnings.
