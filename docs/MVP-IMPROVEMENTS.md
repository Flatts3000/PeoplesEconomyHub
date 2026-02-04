# MVP Improvement Plan

This document outlines prioritized improvements to evolve the MVP into a production-ready application.

---

## Phase 1: Production Readiness

### 1.1 Testing Coverage

**Current State:** Test infrastructure exists but no tests written.

| Task | Priority | Effort |
|------|----------|--------|
| Add unit tests for metric calculations (`src/lib/metrics.ts`) | High | Low |
| Add unit tests for formatters (`src/lib/formatters.ts`) | High | Low |
| Add component tests for MetricCard, MetricChart | High | Medium |
| Add data validation tests for JSON schema | High | Low |
| Add E2E tests for critical user paths with Playwright | Medium | Medium |
| Add accessibility tests with axe-core | High | Low |

**Files to create:**
```
src/__tests__/
├── lib/
│   ├── metrics.test.ts
│   └── formatters.test.ts
├── components/
│   ├── MetricCard.test.tsx
│   └── MetricChart.test.tsx
└── data/
    └── validation.test.ts
```

### 1.2 Error Handling

**Current State:** No error boundaries or fallback UI.

| Task | Priority | Effort |
|------|----------|--------|
| Add React error boundary component | High | Low |
| Add fallback UI for chart loading failures | High | Low |
| Add graceful degradation when JavaScript disabled | Medium | Medium |
| Add error logging to data pipeline scripts | High | Low |
| Add retry logic for BLS API failures | Medium | Medium |

**Implementation:**
```tsx
// src/components/ErrorBoundary.tsx
// Wrap MetricChart components to catch rendering errors

// src/components/ChartFallback.tsx
// Static table display when charts fail to render
```

### 1.3 Loading States

**Current State:** No loading indicators.

| Task | Priority | Effort |
|------|----------|--------|
| Add skeleton loaders for metric cards | Medium | Low |
| Add Suspense boundaries for client components | Medium | Low |
| Add loading.tsx for route segments | Low | Low |

---

## Phase 2: Accessibility & SEO

### 2.1 Accessibility Improvements

**Current State:** Basic ARIA labels present, needs enhancement.

| Task | Priority | Effort |
|------|----------|--------|
| Add skip-to-content link | High | Low |
| Add visible focus indicators (focus-visible) | High | Low |
| Add keyboard navigation for mobile menu | High | Low |
| Add screen reader announcements for metric updates | Medium | Medium |
| Add high-contrast mode toggle | Medium | Medium |
| Add reduced-motion support for charts | Medium | Low |
| Conduct WCAG 2.1 AA audit | High | Medium |

**CSS additions:**
```css
/* Focus indicators */
:focus-visible {
  outline: 2px solid var(--color-positive);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

### 2.2 SEO Enhancements

**Current State:** Basic meta tags only.

| Task | Priority | Effort |
|------|----------|--------|
| Add JSON-LD structured data for articles | Medium | Low |
| Add Open Graph images for social sharing | Medium | Medium |
| Add sitemap.xml generation | Medium | Low |
| Add robots.txt | Low | Low |
| Add canonical URLs | Low | Low |
| Add metric-specific meta descriptions | Medium | Low |

**Files to create:**
```
public/
├── robots.txt
├── og-image.png
└── favicon.ico

src/app/
├── sitemap.ts
└── opengraph-image.tsx
```

---

## Phase 3: Data Pipeline Hardening

### 3.1 Reliability Improvements

**Current State:** Basic fetch scripts without error handling.

| Task | Priority | Effort |
|------|----------|--------|
| Add exponential backoff retry for API calls | High | Low |
| Add data validation before writing to JSON | High | Low |
| Add checksum verification for data integrity | Medium | Low |
| Add alerting for stale data (GitHub Issues) | Medium | Low |
| Add data diff notifications in PRs | Low | Medium |

**Script enhancements:**
```typescript
// scripts/lib/retry.ts
export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response>

// scripts/lib/validate.ts
export function validateMetricData(
  data: unknown,
  schema: ZodSchema
): ValidationResult
```

### 3.2 Monitoring & Observability

**Current State:** No monitoring.

| Task | Priority | Effort |
|------|----------|--------|
| Add data freshness badge to site | Medium | Low |
| Add last-updated timestamps to footer | High | Low |
| Add GitHub Actions workflow status badge | Low | Low |
| Add Sentry error tracking (free tier) | Medium | Medium |
| Add Uptime monitoring (UptimeRobot free tier) | Low | Low |

---

## Phase 4: Feature Enhancements

### 4.1 Data Visualization

**Current State:** Basic line and bar charts.

| Task | Priority | Effort |
|------|----------|--------|
| Add comparison view (essentials vs headline CPI) | High | Medium |
| Add historical context annotations on charts | Medium | Medium |
| Add data point tooltips with more context | Medium | Low |
| Add chart download as PNG/SVG | Low | Medium |
| Add data export as CSV | Low | Medium |
| Add interactive zoom for long time series | Low | High |

### 4.2 Content Expansion

**Current State:** 4 educational articles.

| Task | Priority | Effort |
|------|----------|--------|
| Add "How to read this chart" explanations | High | Low |
| Add FAQ page | Medium | Low |
| Add glossary of economic terms | Medium | Medium |
| Add monthly/quarterly update summaries | Medium | Medium |
| Add "What changed this month" highlights | High | Medium |

**New pages:**
```
src/app/
├── faq/page.tsx
├── glossary/page.tsx
└── updates/
    ├── page.tsx
    └── [date]/page.tsx
```

### 4.3 User Engagement

**Current State:** Static content only.

| Task | Priority | Effort |
|------|----------|--------|
| Add newsletter signup (ConvertKit/Buttondown free tier) | Medium | Low |
| Add social sharing buttons | Low | Low |
| Add "Cite this metric" copy button | Medium | Low |
| Add feedback widget | Low | Medium |
| Add print-friendly styles | Low | Low |

---

## Phase 5: Performance Optimization

### 5.1 Core Web Vitals

**Current State:** Not measured.

| Task | Priority | Effort |
|------|----------|--------|
| Add Lighthouse CI to GitHub Actions | High | Low |
| Optimize chart bundle size (lazy load Chart.js) | Medium | Medium |
| Add font subsetting for system fonts | Low | Low |
| Add image optimization for any future images | Low | Low |
| Implement ISR if moving away from static export | Low | High |

**Target metrics:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### 5.2 Bundle Optimization

**Current State:** ~150KB first load JS (estimated).

| Task | Priority | Effort |
|------|----------|--------|
| Analyze bundle with @next/bundle-analyzer | Medium | Low |
| Code-split chart components | Medium | Medium |
| Lazy load below-fold metric cards | Low | Medium |
| Preload critical fonts | Low | Low |

---

## Phase 6: Future Features (Post-MVP)

Per PRD Section 9, planned for later phases:

### 6.1 Regional Breakdowns
- State-level metric filtering
- City-level data where available
- Regional comparison views

### 6.2 Demographic Filters
- Income bracket filtering
- Age group filtering
- Race/ethnicity breakdowns

### 6.3 Interactive Budget Tool
- Personal inflation calculator
- Expense input form
- Comparison to national metrics

### 6.4 Multi-language Support
- Spanish translation
- i18n infrastructure with next-intl
- RTL support for future languages

### 6.5 Additional Metrics
- Prime-age employment-to-population ratio
- Wealth distribution indicators
- Debt burden metrics

---

## Implementation Priorities

### Immediate (Week 1-2)
1. Add unit tests for calculations and formatters
2. Add error boundary component
3. Add skip-to-content link
4. Add last-updated timestamps to footer
5. Add retry logic to BLS fetch script

### Short-term (Week 3-4)
1. Add component tests
2. Add accessibility audit and fixes
3. Add data validation tests
4. Add comparison view for inflation metrics
5. Add "What changed" highlights

### Medium-term (Month 2)
1. Add E2E tests with Playwright
2. Add structured data for SEO
3. Add newsletter signup
4. Add FAQ and glossary pages
5. Add Lighthouse CI

### Long-term (Month 3+)
1. Regional breakdowns
2. Interactive budget tool
3. Spanish translation
4. Additional metrics

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Test coverage | 0% | >80% |
| Lighthouse Performance | TBD | >90 |
| Lighthouse Accessibility | TBD | 100 |
| WCAG 2.1 AA compliance | Partial | Full |
| Data update reliability | Manual | 99% automated |
| Time to first meaningful paint | TBD | <1.5s |

---

## Technical Debt

Items to address as codebase grows:

1. **Type safety:** Add Zod schemas for all JSON data files
2. **Code organization:** Extract chart config to separate files
3. **CSS:** Consider CSS Modules or component-scoped styles
4. **Dependencies:** Audit and update quarterly
5. **Documentation:** Add JSDoc comments to utility functions
