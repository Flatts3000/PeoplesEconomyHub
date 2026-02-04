# MVP Implementation Guide

This document translates the PRD requirements into actionable technical implementation.

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js (React) | SSG for performance, built-in routing |
| Styling | Tailwind CSS | Rapid responsive design, high-contrast utilities for accessibility |
| Charts | D3.js or Chart.js with SVG output | Lightweight, accessible, customizable |
| Content | MDX | Markdown with components for non-technical content updates |
| Data Pipeline | Node.js scripts + GitHub Actions | Automated scheduled fetches, version-controlled data |
| Data Storage | JSON files in repo | Simple, no database needed for MVP, easy fallbacks |
| Infrastructure | Terraform | Infrastructure as Code for reproducibility |
| CI/CD | GitHub Actions | Automated testing, deployment, and data updates |
| Hosting | GitHub Pages | Free for public repos, integrated with GitHub |

### Cost Breakdown

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| GitHub Pages | Free (public repo) | $0 |
| GitHub Actions | Free (public repo) | $0 |
| BLS API | Free | $0 |
| **Total** | | **$0** |

---

## Project Structure

```
peopleseconomyhub/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── page.tsx            # Landing page (hero + metrics)
│   │   ├── learn/
│   │   │   └── [slug]/page.tsx # Educational articles
│   │   ├── methodology/
│   │   │   └── page.tsx        # Sources & methods
│   │   └── resources/
│   │       └── page.tsx        # External links
│   ├── components/
│   │   ├── MetricCard.tsx      # Individual metric display
│   │   ├── MetricChart.tsx     # SVG chart component
│   │   ├── Hero.tsx            # Landing hero section
│   │   └── Layout.tsx          # Shared layout with nav/footer
│   └── lib/
│       ├── metrics.ts          # Metric calculation logic
│       └── formatters.ts       # Date/number formatting (America/New_York, USD)
├── data/
│   ├── metrics/
│   │   ├── purchasing-power.json
│   │   ├── essentials-inflation.json
│   │   └── financial-cushion.json
│   └── fallbacks/              # Manual override values
├── content/
│   ├── learn/                  # MDX educational articles
│   │   ├── gdp-vs-wellbeing.mdx
│   │   ├── mean-vs-median.mdx
│   │   ├── inflation-baskets.mdx
│   │   └── labor-market-indicators.mdx
│   └── methodology.mdx         # Sources & methods content
├── scripts/
│   ├── fetch-bls.ts            # BLS API data fetcher
│   ├── fetch-fed.ts            # Federal Reserve data fetcher
│   └── update-metrics.ts       # Orchestrates all fetches
├── terraform/
│   ├── main.tf                 # Main infrastructure config
│   ├── variables.tf            # Input variables
│   ├── outputs.tf              # Output values
│   └── versions.tf             # Provider versions
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, test, build on PR
│       ├── deploy.yml          # Deploy to production
│       └── update-data.yml     # Scheduled data refresh
└── docs/
    ├── PRD.md
    └── IMPLEMENTATION.md
```

---

## Infrastructure (Terraform)

### versions.tf

```hcl
terraform {
  required_version = ">= 1.0"

  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  backend "local" {
    path = "terraform.tfstate"
  }
}
```

### variables.tf

```hcl
variable "github_token" {
  description = "GitHub personal access token with repo permissions"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub organization or username"
  type        = string
}

variable "repository_name" {
  description = "Name of the GitHub repository"
  type        = string
  default     = "peoples-economy-hub"
}

variable "repository_description" {
  description = "Repository description"
  type        = string
  default     = "A not-for-profit platform helping Americans understand household economic metrics"
}

variable "custom_domain" {
  description = "Custom domain for GitHub Pages (optional)"
  type        = string
  default     = ""
}
```

### main.tf

```hcl
provider "github" {
  token = var.github_token
  owner = var.github_owner
}

# GitHub repository
resource "github_repository" "site" {
  name        = var.repository_name
  description = var.repository_description
  visibility  = "public"

  has_issues   = true
  has_projects = false
  has_wiki     = false

  pages {
    build_type = "workflow"
    cname      = var.custom_domain != "" ? var.custom_domain : null
  }

  # Protect the main branch
  allow_merge_commit = true
  allow_squash_merge = true
  allow_rebase_merge = false

  delete_branch_on_merge = true
}

# Branch protection for main
resource "github_branch_protection" "main" {
  repository_id = github_repository.site.node_id
  pattern       = "main"

  required_status_checks {
    strict   = true
    contexts = ["Lint", "Type Check", "Test", "Build"]
  }

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    required_approving_review_count = 1
  }

  enforce_admins = false
}

# Repository secrets for GitHub Actions
resource "github_actions_secret" "bls_api_key" {
  repository      = github_repository.site.name
  secret_name     = "BLS_API_KEY"
  plaintext_value = var.bls_api_key
}

variable "bls_api_key" {
  description = "BLS API key for data fetching"
  type        = string
  sensitive   = true
  default     = ""
}

# Repository variables
resource "github_actions_variable" "site_url" {
  repository    = github_repository.site.name
  variable_name = "SITE_URL"
  value         = var.custom_domain != "" ? "https://${var.custom_domain}" : "https://${var.github_owner}.github.io/${var.repository_name}"
}

# Environment for production deployments
resource "github_repository_environment" "production" {
  repository  = github_repository.site.name
  environment = "github-pages"

  deployment_branch_policy {
    protected_branches     = true
    custom_branch_policies = false
  }
}
```

### outputs.tf

```hcl
output "pages_url" {
  description = "GitHub Pages URL"
  value       = var.custom_domain != "" ? "https://${var.custom_domain}" : "https://${var.github_owner}.github.io/${var.repository_name}"
}

output "repository_url" {
  description = "GitHub repository URL"
  value       = github_repository.site.html_url
}

output "repository_name" {
  description = "Repository name"
  value       = github_repository.site.name
}
```

### Terraform Usage

```bash
# Initialize
cd terraform
terraform init

# Plan (review changes)
terraform plan -var-file="terraform.tfvars"

# Apply
terraform apply -var-file="terraform.tfvars"
```

### terraform.tfvars.example

```hcl
github_owner    = "your-org"
repository_name = "peoples-economy-hub"

# Optional: BLS API key (can also be set manually in GitHub)
# bls_api_key = "your-bls-api-key"

# Optional: custom domain
# custom_domain = "peopleseconomyhub.org"
```

---

## CI/CD (GitHub Actions)

### .github/workflows/ci.yml

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check formatting
        run: npm run format:check

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Run TypeScript compiler
        run: npm run typecheck

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Run unit tests
        run: npm run test

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: github.event_name == 'push'
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://peoples-economy-hub.pages.dev

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: out/
          retention-days: 1

  accessibility:
    name: Accessibility Audit
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Download build
        uses: actions/download-artifact@v4
        with:
          name: build-output
          path: out/

      - name: Run accessibility tests
        run: npm run test:a11y

  lighthouse:
    name: Lighthouse Audit
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Download build
        uses: actions/download-artifact@v4
        with:
          name: build-output
          path: out/

      - name: Serve and audit
        run: |
          npx serve out -l 3000 &
          sleep 3
          npx lighthouse http://localhost:3000 \
            --output=json \
            --output-path=./lighthouse-report.json \
            --chrome-flags="--headless --no-sandbox"

      - name: Check scores
        run: |
          node -e "
            const report = require('./lighthouse-report.json');
            const perf = report.categories.performance.score * 100;
            const a11y = report.categories.accessibility.score * 100;
            console.log('Performance:', perf);
            console.log('Accessibility:', a11y);
            if (perf < 90) process.exit(1);
            if (a11y < 90) process.exit(1);
          "
```

### .github/workflows/deploy.yml

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: pages
  cancel-in-progress: false

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ vars.SITE_URL }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: out/

  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### .github/workflows/update-data.yml

```yaml
name: Update Economic Data

on:
  schedule:
    # Monthly CPI data (around 10th of each month)
    - cron: '0 14 10-15 * *'
    # Quarterly median wage data
    - cron: '0 14 15-20 1,4,7,10 *'
  workflow_dispatch:
    inputs:
      force_update:
        description: 'Force update even if no new data'
        required: false
        type: boolean
        default: false

jobs:
  update:
    name: Fetch and Update Data
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Fetch BLS data
        env:
          BLS_API_KEY: ${{ secrets.BLS_API_KEY }}
        run: npm run fetch:bls

      - name: Calculate metrics
        run: npm run calculate:metrics

      - name: Validate data
        run: npm run validate:data

      - name: Check for changes
        id: changes
        run: |
          if git diff --quiet data/; then
            echo "has_changes=false" >> $GITHUB_OUTPUT
          else
            echo "has_changes=true" >> $GITHUB_OUTPUT
          fi

      - name: Commit and push
        if: steps.changes.outputs.has_changes == 'true' || inputs.force_update
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/
          git commit -m "chore(data): update economic metrics $(date +%Y-%m-%d)"
          git push

      - name: Notify on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Data update failed',
              body: `The scheduled data update workflow failed. [View run](${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId})`,
              labels: ['bug', 'data-pipeline']
            });
```

### .github/workflows/terraform.yml

```yaml
name: Terraform

on:
  push:
    branches: [main]
    paths:
      - 'terraform/**'
  pull_request:
    branches: [main]
    paths:
      - 'terraform/**'
  workflow_dispatch:

defaults:
  run:
    working-directory: terraform

jobs:
  plan:
    name: Terraform Plan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: '1.6'

      - name: Terraform Init
        run: terraform init

      - name: Terraform Format Check
        run: terraform fmt -check

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        run: terraform plan -no-color -input=false
        env:
          TF_VAR_github_token: ${{ secrets.TF_GITHUB_TOKEN }}
          TF_VAR_github_owner: ${{ github.repository_owner }}

  apply:
    name: Terraform Apply
    runs-on: ubuntu-latest
    needs: plan
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: '1.6'

      - name: Terraform Init
        run: terraform init

      - name: Terraform Apply
        run: terraform apply -auto-approve -input=false
        env:
          TF_VAR_github_token: ${{ secrets.TF_GITHUB_TOKEN }}
          TF_VAR_github_owner: ${{ github.repository_owner }}
```

---

## Data Pipeline

### API Endpoints

#### BLS (Bureau of Labor Statistics)

**Base URL:** `https://api.bls.gov/publicAPI/v2/timeseries/data/`

| Metric | Series ID | Description |
|--------|-----------|-------------|
| Median weekly earnings | LEU0252881500 | Median usual weekly earnings, full-time workers |
| CPI All Items | CUUR0000SA0 | Consumer Price Index, all urban consumers |
| CPI Shelter | CUUR0000SAH1 | Shelter component |
| CPI Food at Home | CUUR0000SAF11 | Food at home component |
| CPI Energy | CUUR0000SA0E | Energy component |
| CPI Transportation | CUUR0000SAT1 | Transportation services |
| CPI Medical Care | CUUR0000SAM | Medical care component |

**Rate Limits:** 500 requests/day without key, 500 requests/day with free key (register at bls.gov)

**Fetch Script:**
```typescript
async function fetchBLSSeries(seriesIds: string[], startYear: number, endYear: number) {
  const response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      seriesid: seriesIds,
      startyear: startYear.toString(),
      endyear: endYear.toString(),
      registrationkey: process.env.BLS_API_KEY
    })
  });
  return response.json();
}
```

#### Federal Reserve SHED Data

**Source:** Published annually as downloadable CSV/Excel at federalreserve.gov

**Relevant Variables:**
- `EF3`: Could cover $400 emergency expense
- `EF5A`: Has 3+ months emergency savings

**Approach:** Download annual release, parse, store as JSON. No real-time API—manual annual update.

### Metric Calculations

#### Purchasing Power of the Median Paycheck

```typescript
function calculatePurchasingPower(earnings: number[], cpi: number[]): number {
  const currentReal = earnings[0] / (cpi[0] / 100);
  const priorReal = earnings[4] / (cpi[4] / 100); // 4 quarters ago
  return ((currentReal - priorReal) / priorReal) * 100;
}
```

#### Essentials Cost Pressure

```typescript
function calculateEssentialsInflation(
  shelter: number[], food: number[], energy: number[],
  transport: number[], medical: number[]
): number {
  const weights = { shelter: 0.33, food: 0.13, energy: 0.07, transport: 0.17, medical: 0.08 };
  const yoyChange = (series: number[]) => ((series[0] - series[12]) / series[12]) * 100;

  return (
    weights.shelter * yoyChange(shelter) +
    weights.food * yoyChange(food) +
    weights.energy * yoyChange(energy) +
    weights.transport * yoyChange(transport) +
    weights.medical * yoyChange(medical)
  ) / (weights.shelter + weights.food + weights.energy + weights.transport + weights.medical);
}
```

#### Household Financial Cushion

```typescript
interface FinancialCushion {
  canCover400: number;
  cannotCover400: number;
  has3MonthSavings: number;
  year: number;
}
```

### Fallback Strategy

```typescript
// data/fallbacks/purchasing-power.json
{
  "value": 1.2,
  "asOf": "2025-Q4",
  "isFallback": true,
  "reason": "BLS API unavailable"
}
```

---

## Frontend Components

### MetricCard Props

```typescript
interface MetricCardProps {
  title: string;
  value: number;
  format: 'percent' | 'percentage-point';
  trend: 'up' | 'down' | 'flat';
  trendIsPositive: boolean;
  lastUpdated: string;
  summary: string;
  whyItMatters: string;
  commonMisinterpretation: string;
  methodologyLink: string;
  chartData: ChartDataPoint[];
}
```

### Accessibility Requirements

```typescript
<svg role="img" aria-labelledby="chart-title chart-desc">
  <title id="chart-title">Purchasing Power Change Over Time</title>
  <desc id="chart-desc">
    Line chart showing year-over-year percent change in real median wages
    from 2015 to 2025. Current value: +1.2%.
  </desc>
</svg>
```

### Color Palette (WCAG AA Compliant)

```css
:root {
  --positive: #047857;    /* Green - meets 4.5:1 on white */
  --negative: #b91c1c;    /* Red - meets 4.5:1 on white */
  --neutral: #374151;     /* Gray - primary text */
  --muted: #6b7280;       /* Secondary text */
  --background: #ffffff;
  --surface: #f9fafb;
  --border: #e5e7eb;
}
```

---

## Testing Strategy

| Test Type | Tool | Coverage |
|-----------|------|----------|
| Unit | Vitest | Metric calculations, formatters |
| Component | React Testing Library | MetricCard, charts render correctly |
| Accessibility | axe-core | All pages pass WCAG AA |
| E2E | Playwright | Critical user paths |
| Data Pipeline | Vitest | API response parsing, fallback logic |

---

## Environment Variables & Secrets

### GitHub Repository Secrets

| Secret | Description |
|--------|-------------|
| `TF_GITHUB_TOKEN` | GitHub PAT with repo permissions (for Terraform) |
| `BLS_API_KEY` | BLS API registration key |

### GitHub Repository Variables

| Variable | Description |
|----------|-------------|
| `SITE_URL` | Production site URL (e.g., `https://org.github.io/peoples-economy-hub`) |

### Local Development

Create `.env.local`:
```bash
BLS_API_KEY=your-bls-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Deployment Checklist

- [ ] GitHub repository created (public for free Pages)
- [ ] GitHub Pages enabled (Settings > Pages > Source: GitHub Actions)
- [ ] GitHub PAT created with repo permissions for Terraform
- [ ] GitHub secrets configured (`TF_GITHUB_TOKEN`, `BLS_API_KEY`)
- [ ] Terraform initialized and applied
- [ ] BLS API key obtained (free registration at bls.gov)
- [ ] Initial data fetch completed
- [ ] All fallback files in place
- [ ] WCAG AA audit passed
- [ ] Mobile responsive verified (320px - 1440px)
- [ ] Lighthouse performance score > 90

---

## NPM Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:a11y": "vitest run --config vitest.a11y.config.ts",
    "fetch:bls": "tsx scripts/fetch-bls.ts",
    "fetch:fed": "tsx scripts/fetch-fed.ts",
    "calculate:metrics": "tsx scripts/update-metrics.ts",
    "validate:data": "tsx scripts/validate-data.ts"
  }
}
```

---

## Next.js Configuration

GitHub Pages requires static export. Configure `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Required if not using custom domain (repo name becomes base path)
  // basePath: '/peoples-economy-hub',
  // assetPrefix: '/peoples-economy-hub/',
};

module.exports = nextConfig;
```

If using a custom domain, remove `basePath` and `assetPrefix`. If deploying to `username.github.io/repo-name`, uncomment them.
