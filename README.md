# News Aggregator Performance Lab

A React + Vite Hacker News aggregator built in two states:

- `slow-version` contains the intentionally unoptimized baseline.
- `main` contains the optimized implementation with parallel fetching, virtualization, memoization, image optimization, and code splitting.

## Run locally

Install dependencies:

```bash
npm install
```

Start the optimized app:

```bash
npm run dev
```

Switch to the baseline branch and run the same dev server to compare behavior:

```bash
git checkout slow-version
npm run dev
```

Build for production:

```bash
npm run build
```

## Docker

Build and run the production image with Docker Compose:

```bash
docker compose up --build
```

The app is exposed on port `3000` by default.

## Notes

- `PERFORMANCE.md` documents the baseline and optimization plan.
- `stats.html` is generated during production builds by the bundle visualizer.
