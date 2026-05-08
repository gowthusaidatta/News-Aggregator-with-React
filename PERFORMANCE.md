# Performance Audit

## Baseline Report

| Metric / Issue | Baseline Score / Observation | Root Cause Analysis | Proposed Solution Hypothesis |
| --- | --- | --- | --- |
| LCP | Slow hero image delays first meaningful paint | Large, unoptimized hero asset blocks rendering and consumes bandwidth | Compress the hero image, add width/height, and provide responsive sources |
| INP (via TBT) | Noticeable lag while typing in the filter and clicking sort | Filtering and sorting re-render a large list while expensive formatting runs in render | Virtualize the list, memoize article rows, and reuse date formatters |
| CLS | Content shifts when the hero image loads | The hero image has no intrinsic dimensions | Add explicit width and height attributes |
| Bundle Size | Large initial bundle from broad dependencies | Importing all of lodash and shipping all UI code in one chunk | Use cherry-picked lodash imports and code splitting |
| Network Waterfall | 500 sequential item fetches | Story details are fetched one by one in a loop | Fetch story details in parallel with `Promise.all` |

## Optimization Log

| Step | Change Made | Before | After | Why It Improved |
| --- | --- | --- | --- | --- |
| Parallel fetching | Replaced the sequential N+1 fetch loop with `Promise.all` | 500 serial detail requests | Parallel detail loading | The browser can wait on many requests at once instead of idling between them |
| Virtualization | Rendered article rows with `@tanstack/react-virtual` | 500+ DOM nodes always mounted | Only visible rows rendered | Smaller DOM trees reduce layout, paint, and interaction cost |
| Dependency trimming | Switched to cherry-picked lodash imports | Full lodash bundle | Only `sortBy` is imported | Smaller bundles parse and execute faster |
| Expensive calculation control | Reused `Intl.DateTimeFormat` and memoized derived views | Date formatting on every render for every row | Shared formatter and memoized article projection | Less repeated work in the render path |
| Hero optimization | Added intrinsic image dimensions and responsive sources | Unbounded image pushing content around | Stable, responsive hero image | Better LCP and no layout shift |
| Code splitting | Added a lazily loaded secondary panel | Everything in the initial chunk | Multiple JS chunks in the build | Smaller initial payload and faster startup |

## Verification Notes

- The optimized app must expose `data-testid="hero-image"` with `width`, `height`, and `srcset` attributes.
- The article container must expose `data-testid="article-list"` and keep the rendered item count well below 50.
- Production builds should generate `stats.html` and multiple JavaScript chunks.
