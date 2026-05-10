# News Aggregator with React

A high-performance **React + Vite** news aggregator application demonstrating modern web optimization techniques and Core Web Vitals improvements.

---

## Project Overview

This project showcases the transformation of an intentionally unoptimized application into a highly optimized, production-ready React application.

The app fetches the **Top 500 Stories** from the Hacker News API and provides powerful filtering, sorting, and responsive UI features while focusing on performance optimization.

---

## Features

- Fetches top 500 stories from Hacker News API
- Real-time search and filtering
- Sort articles by score
- Responsive modern UI
- Lazy loading and code splitting
- Performance monitoring tools
- Docker containerization support
- Fallback cached data support
- Optimized Core Web Vitals

---

## Tech Stack

### Frontend
- React
- Vite
- CSS3

### Tools & Optimization
- Docker
- Lighthouse
- Performance Profiling
- Lazy Loading
- Code Splitting

---

## Project Structure

```plaintext
News-Aggregator-with-React/
│
├── src/
│   ├── App.jsx
│   ├── StoryInsights.jsx
│   ├── main.jsx
│   └── styles.css
│
├── public/
│   ├── hero-optimized.svg
│   ├── hero-optimized-wide.svg
│   └── hero-slow.svg
│
├── scripts/
│   └── generate-stats.mjs
│
├── Dockerfile
├── docker-compose.yml
├── vite.config.js
├── package.json
├── .env.example
├── PERFORMANCE.md
└── README.md
```

---

## Quick Start

### Prerequisites

Make sure you have installed:

- Node.js 18+
- npm or yarn
- Docker (optional)

---

## Installation

### Clone Repository

```bash
git clone https://github.com/gowthusaidatta/News-Aggregator-with-React.git
cd News-Aggregator-with-React
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Application will run on:

```plaintext
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Docker Setup

### Build Docker Image

```bash
docker build -t news-aggregator .
```

### Run Container

```bash
docker run -p 3000:3000 news-aggregator
```

---

## Performance Optimizations

This project demonstrates several optimization techniques:

- Lazy loading components
- Image optimization
- Efficient rendering
- Bundle splitting
- Memoization
- Optimized API handling
- Responsive rendering
- Core Web Vitals improvements

---

## API Used

Hacker News API:

https://github.com/HackerNews/API

---

## Future Improvements

- Infinite scrolling
- Dark mode
- Category filtering
- Bookmark articles
- User authentication
- AI-powered article summarization

---

## Author

**V V Satya Sai Datta Manikanta**

GitHub:
https://github.com/gowthusaidatta

---

## License

This project is licensed under the MIT License.
