import { useEffect, useState } from 'react';
import _ from 'lodash';

const API_BASE = import.meta.env.VITE_HN_API_BASE ?? 'https://hacker-news.firebaseio.com/v0';
const STORY_LIMIT = 500;

function formatTimestamp(timestamp) {
  return new Date(timestamp * 1000).toLocaleString();
}

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortDescending, setSortDescending] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchAllStories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/topstories.json`);
        const storyIds = await response.json();
        const stories = [];

        for (const id of storyIds.slice(0, STORY_LIMIT)) {
          const storyResponse = await fetch(`${API_BASE}/item/${id}.json`);
          const storyData = await storyResponse.json();
          if (storyData) {
            stories.push(storyData);
          }
        }

        if (!cancelled) {
          setArticles(stories);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAllStories();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(query.toLowerCase()),
  );

  const sortedArticles = _.sortBy(filteredArticles, 'score');
  const displayedArticles = sortDescending ? sortedArticles.reverse() : sortedArticles;

  return (
    <div className="page-shell">
      <header className="hero">
        <img
          src="/hero-slow.svg"
          alt="News desk collage"
          className="hero-image"
          data-testid="hero-image"
        />
        <div className="hero-copy">
          <p className="eyebrow">Partnr Logo</p>
          <h1>Build and Optimize a High-Performance News Aggregator with React</h1>
          <p>
            A deliberately slow Hacker News reader used to study filtering, sorting, image loading,
            and rendering bottlenecks.
          </p>
        </div>
      </header>

      <section className="toolbar">
        <label htmlFor="filter-input">Filter by title</label>
        <input
          id="filter-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search stories"
        />
        <button type="button" onClick={() => setSortDescending((value) => !value)}>
          Sort by score
        </button>
      </section>

      {loading ? <p className="status">Loading top stories...</p> : null}

      <main className="articles" data-testid="article-list">
        {displayedArticles.map((article) => (
          <article className="article-card" key={article.id} data-testid="article-item">
            <h2>
              <a href={article.url ?? `https://news.ycombinator.com/item?id=${article.id}`}>
                {article.title}
              </a>
            </h2>
            <div className="meta">
              <span>Score: {article.score ?? 0}</span>
              <span>By: {article.by ?? 'unknown'}</span>
              <span>{formatTimestamp(article.time ?? 0)}</span>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
