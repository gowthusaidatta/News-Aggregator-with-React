# Performance Audit

## Baseline Report

| Metric / Issue | Baseline Score | Root Cause | Proposed Solution |
| --- | --- | --- | --- |
| LCP | 9.4s | Large unoptimized hero image | Compress to WebP, add width/height, srcset |
| INP (via TBT) | TBT: 1,340ms | Re-rendering 500 DOM nodes on keystroke | List virtualization with @tanstack/react-virtual |
| CLS | 0.48 | Hero image has no dimensions | Add explicit width and height attributes |
| Bundle Size | 1.4MB (main.js) | Full lodash imported, no code splitting | Cherry-picked imports + React.lazy code splitting |
| Network Waterfall | 501 serial requests | Sequential for-loop fetching | Promise.all for parallel requests |

## Optimization Log

| Step | Change | Before | After | Why |
| --- | --- | --- | --- | --- |
| Parallel fetching | Promise.all | 501 serial requests (~45s load) | Parallel (~8s load) | Browser handles concurrent requests |
| Virtualization | @tanstack/react-virtual | TBT: 1340ms, 500 DOM nodes | TBT: 180ms, <20 DOM nodes | Smaller DOM = faster paint and interaction |
| Lodash trimming | Cherry-picked import | 1.4MB bundle | 310KB bundle | Only sortBy included in output |
| Hero optimization | WebP + srcset + dimensions | LCP: 9.4s, CLS: 0.48 | LCP: 1.8s, CLS: 0.01 | Image preloaded with stable dimensions |
| Code splitting | React.lazy + Suspense | 1 JS chunk | 3 JS chunks | Smaller initial payload |

## Verification Notes

- The optimized app must expose `data-testid="hero-image"` with `width`, `height`, and `srcset` attributes.
- The article container must expose `data-testid="article-list"` and keep the rendered item count well below 50.
- Production builds should generate `stats.html` and multiple JavaScript chunks.
