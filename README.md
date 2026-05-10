# News Aggregator with React

A high-performance React + Vite news aggregator application demonstrating web performance optimization techniques and Core Web Vitals improvements.

## Project Overview

This project showcases building a news aggregator from an intentionally unoptimized baseline to a highly optimized production-ready application. It fetches the top 500 stories from the Hacker News API and displays them with filtering, sorting, and responsive features.

## Key Features

- Fetch top 500 stories from Hacker News API
- Real-time filtering by article title
- Sort articles by score
- Responsive, modern UI design
- Performance monitoring and profiling tools
- Docker containerization for easy deployment
- Fallback to cached data if API is unavailable

## Project Structure
'''
\\\
News-Aggregator-with-React/
├── src/
│   ├── App.jsx                 # Main app component with optimizations
│   ├── StoryInsights.jsx       # Lazy-loaded insights panel
│   ├── main.jsx                # React entry point
│   └── styles.css              # Responsive styling
├── public/
│   ├── hero-optimized.svg      # Optimized hero image
│   ├── hero-optimized-wide.svg # 2x resolution variant
│   └── hero-slow.svg           # Unoptimized version
├── scripts/
│   └── generate-stats.mjs      # Bundle analysis script
├── Dockerfile                  # Multi-stage production build
├── docker-compose.yml          # Docker Compose configuration
├── vite.config.js              # Vite build configuration
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variables template
├── PERFORMANCE.md              # Performance optimization documentation
└── README.md                   # This file
\\\
'''
## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository
\\\ash
git clone https://github.com/gowthusaidatta/News-Aggregator-with-React.git
cd News-Aggregator-with-React
\\\

2. Install dependencies
\\\ash
npm install
\\\

3. Configure environment variables
\\\ash
cp .env.example .env
\\\

### Development

Run the optimized development server:
\\\ash
npm run dev
\\\

The app will be available at \http://localhost:5173\

Compare with the unoptimized version:
\\\ash
git checkout slow-version
npm install
npm run dev
\\\

Then switch back to main:
\\\ash
git checkout main
npm install
\\\

### Production Build

Build for production:
\\\ash
npm run build
\\\

This will:
- Generate optimized JavaScript bundles with code splitting
- Create \dist/\ directory with production assets
- Generate \stats.html\ for bundle analysis
- Output multiple JS chunks for efficient loading

Preview production build locally:
\\\ash
npm run preview
\\\

## Docker Deployment

Build and run with Docker Compose:
\\\ash
docker compose up --build
\\\

The app will be available at \http://localhost:3000\

Custom port:
\\\ash
PORT=8080 docker compose up --build
\\\

Health check:
\\\ash
docker compose ps
\\\

## Performance Optimizations

### Implemented Optimizations

| Optimization | Impact |
|---|---|
| Parallel Fetching | Eliminates N+1 network waterfall |
| List Virtualization | Reduces DOM size from 500+ to 20-50 nodes |
| Memoization | Prevents unnecessary re-renders |
| Dependency Trimming | Cherry-picked lodash imports |
| Image Optimization | Compressed hero image with srcset |
| Code Splitting | Lazy-loaded secondary features |
| Bundle Analysis | Generated stats.html for visibility |

### Measuring Performance

Using Lighthouse:
1. Open the app in Chrome
2. Press F12 to open DevTools
3. Go to the Lighthouse tab
4. Click Analyze page load
5. Check Core Web Vitals scores: LCP, INP, CLS

Using Chrome DevTools Performance Panel:
1. Open DevTools > Performance tab
2. Record user interactions (filtering, sorting)
3. Analyze flame chart for long tasks
4. Identify bottlenecks

See PERFORMANCE.md for detailed results.

## Technologies Used

- React 18 - UI library
- Vite 5 - Fast build tool
- @tanstack/react-virtual - List virtualization
- Lodash - Cherry-picked utilities
- Docker & Docker Compose - Containerization
- Rollup Plugin Visualizer - Bundle analysis

## Environment Variables

Create a \.env\ file based on \.env.example\:

\\\
PORT=3000
VITE_HN_API_BASE=https://hacker-news.firebaseio.com/v0
\\\

## Git Branches

- \main\ - Optimized, production-ready version
- \slow-version\ - Intentionally unoptimized baseline

Switch between branches:
\\\ash
git checkout slow-version
git checkout main
\\\

## Testing Checklist

- Hero image has width, height, and srcset attributes
- Article list uses virtualization (DOM size < 50 nodes)
- Production build generates multiple JS chunks
- Bundle includes only cherry-picked lodash imports
- Docker Compose deployment works with health checks
- Fallback stories display when API is unavailable
- Filtering and sorting remain responsive

## License

This project is part of the Partnr Performance Lab exercise.

## Acknowledgments

- Hacker News for the free API
- React and Vite communities
- Tanstack for the virtual scroller library
