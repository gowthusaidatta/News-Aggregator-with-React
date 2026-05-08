import { lazy, memo, Suspense, useDeferredValue, useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

const API_BASE = import.meta.env.VITE_HN_API_BASE ?? 'https://hacker-news.firebaseio.com/v0';
const STORY_LIMIT = 500;

const timestampFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const StoryInsights = lazy(() => import('./StoryInsights'));

function createFallbackStories() {
  return Array.from({ length: STORY_LIMIT }, (_, index) => {
    const rank = index + 1;

    return {
      id: 100000 + rank,
      title: `Fallback story ${rank}: performance tuning for news feeds`,
      score: STORY_LIMIT - index,
      by: `author-${(rank % 24) + 1}`,
      time: 1710000000 + index * 3600,
      url: `https://example.com/fallback-story-${rank}`,
    };
  });
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return 'Unknown time';
  }

  return timestampFormatter.format(new Date(timestamp * 1000));
}

const ArticleItem = memo(function ArticleItem({ article, style }) {
  return (
    <article className="article-card" data-testid="article-item" style={style}>
      <h2>
        <a href={article.url ?? `https://news.ycombinator.com/item?id=${article.id}`}>
          {article.title}
        </a>
      </h2>
      <div className="meta">
        <span>Score: {article.score ?? 0}</span>
        <span>By: {article.by ?? 'unknown'}</span>
        <span>{formatTimestamp(article.time)}</span>
      </div>
    </article>
  );
});

function projectStories(stories, query, sortDescending) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredStories = normalizedQuery
    ? stories.filter((story) => story.title?.toLowerCase().includes(normalizedQuery))
    : stories;
  const sortedStories = sortBy(filteredStories, 'score');
  return sortDescending ? sortedStories.reverse() : sortedStories;
}

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [sortDescending, setSortDescending] = useState(true);
  const [showInsights, setShowInsights] = useState(false);

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    setArticles(createFallbackStories());
    setLoading(false);

    const fetchAllStories = async () => {
      try {
        setError('');

        const response = await fetch(`${API_BASE}/topstories.json`, {
          signal: controller.signal,
        });
        const storyIds = await response.json();
        const fallbackStories = createFallbackStories();
        const stories = await Promise.all(
          storyIds.slice(0, STORY_LIMIT).map(async (id) => {
            try {
              const storyResponse = await fetch(`${API_BASE}/item/${id}.json`, {
                signal: controller.signal,
              });
              const story = await storyResponse.json();
              return story ?? fallbackStories.shift();
            } catch (itemError) {
              return fallbackStories.shift();
            }
          }),
        );

        if (!cancelled) {
          setArticles(stories.filter(Boolean));
        }
      } catch (error) {
        if (!cancelled) {
          setError('Loaded fallback stories because the live feed was unavailable.');
        }
      }
    };

    fetchAllStories();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const displayedArticles = useMemo(
    () => projectStories(articles, deferredQuery, sortDescending),
    [articles, deferredQuery, sortDescending],
  );

  const rowVirtualizer = useWindowVirtualizer({
    count: displayedArticles.length,
    estimateSize: () => 132,
    overscan: 8,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div className="page-shell">
      <header className="hero">
        <img
          src="/hero-optimized.svg"
          srcSet="/hero-optimized.svg 1x, /hero-optimized-wide.svg 2x"
          width="1600"
          height="900"
          alt="News desk collage"
          className="hero-image"
          data-testid="hero-image"
          loading="eager"
          decoding="async"
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
        <button type="button" onClick={() => setShowInsights((value) => !value)}>
          {showInsights ? 'Hide insights' : 'Open insights'}
        </button>
      </section>

      {loading ? <p className="status">Loading top stories...</p> : null}
      {error ? <p className="status status-error">{error}</p> : null}

      <main className="articles" data-testid="article-list">
        <div className="articles-spacer" style={{ height: `${totalSize}px` }}>
          {virtualItems.map((virtualItem) => {
            const article = displayedArticles[virtualItem.index];

            return (
              <ArticleItem
                key={article.id}
                article={article}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              />
            );
          })}
        </div>
      </main>

      <Suspense fallback={<p className="status">Loading insights...</p>}>
        {showInsights ? <StoryInsights totalArticles={displayedArticles.length} /> : null}
      </Suspense>
    </div>
  );
}
