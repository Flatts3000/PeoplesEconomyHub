# PRD: People's Economy Hub

## 1. Project Overview

**Name:** People's Economy Hub (PEH)

**Summary:** A not-for-profit digital platform that helps everyday Americans understand how the economy is actually affecting their households. It focuses on a small set of clear, household-centered metrics, plain-language explanations, and transparent methodology.

**Goal:** Translate technically public economic data into a single source of truth that is accessible, neutral, and trusted.

**Problem Addressed:** The gap between headline economic indicators (GDP, stock indices) and the lived experience of typical families—a gap recognized by leading economists such as Joseph Stiglitz, who argues that GDP alone tells "not much" about people's well-being and advocates tracking median household income instead.

---

## 2. Problem Statement & Background

Traditional economic reporting emphasizes aggregate measures (GDP, stock market indices) that can rise while the average household stagnates or suffers.

**Key Issues:**
- Median household income fell even as GDP per capita rose, illustrating how averages can be distorted by top earners
- Public trust erodes when official pronouncements of prosperity conflict with people's day-to-day experience
- Official inflation measures (CPI) may understate pressure on necessities like housing, energy, and medical care
- BLS data show that prices of "household essentials" rose faster than non-essentials between 2005 and 2020
- In 2024, 37% of adults could not cover a $400 emergency expense using cash or its equivalent, and 13% said they would be unable to pay at all
- Prime-age labor force participation and employment-to-population ratios better capture job-market strength than headline unemployment

---

## 3. Goals & Success Criteria

### 3.1 Goals

| Goal | Description |
|------|-------------|
| Clarity | Provide a concise, intuitive snapshot of how typical households are faring economically. Users should grasp the core message within 90 seconds on their phone. |
| Neutrality & Trust | Maintain a non-ideological tone, focusing on what the data show and do not show. Clearly document sources, methods, and uncertainties. |
| Accessibility | Use plain language, mobile-friendly design, and simple visualizations. Avoid jargon. |
| Stability & Sustainability | Select metrics with reliable, publicly available data that can be updated on a regular cadence without intensive resources. |
| Public Engagement | Encourage sharing, bookmarking, and citation by designing content useful to citizens, journalists, educators, and policymakers. |

### 3.2 Success Metrics

| Metric | Target |
|--------|--------|
| Reach | 100k unique visitors within first year |
| Engagement | Average time on page > 2 minutes; > 20% click-through to methodology |
| Trust | User surveys rating neutrality and clarity >= 80% positive |
| Citation | Track usage by journalists, academics, policymakers |
| Update cadence | Monthly metric updates within 7 days of new data release |

---

## 4. Target Audience

- **Non-expert citizens** who want to understand how national economic trends affect their household budgets
- **Journalists and educators** seeking simple, authoritative charts and explanations for stories or classroom use
- **Local leaders and policymakers** looking for non-partisan evidence about household conditions
- **Students and researchers** needing a gateway to more detailed data sources

---

## 5. Scope and Functional Requirements (MVP)

The MVP focuses on a **single landing page** that answers: "How are American households doing right now?"

The page displays three metrics with accompanying text and visual elements. Additional pages provide short explainers and methodological transparency.

### 5.1 Core Metrics

#### Metric 1: Purchasing Power of the Median Paycheck

| Attribute | Value |
|-----------|-------|
| Definition | Measures how median take-home wages have changed after inflation over the past year |
| Purpose | Reflects whether typical paychecks are gaining or losing real value (addresses Stiglitz's call to focus on median income rather than GDP) |
| Data Sources | Median weekly earnings from BLS Current Population Survey; CPI or PCE price index for inflation adjustment |
| Visualization | Line chart showing year-over-year percent change in real median wages over 10 years |
| Update Cadence | Quarterly (aligning with BLS release) |

#### Metric 2: Essentials Cost Pressure

| Attribute | Value |
|-----------|-------|
| Definition | Year-over-year inflation for a basket of unavoidable expenses—housing (rent + owners' equivalent), food at home, energy, transportation, and healthcare—compared against headline CPI |
| Purpose | Highlights the gap between official inflation and what families feel. BLS analysis shows essentials have historically risen faster than non-essential items. |
| Data Sources | CPI sub-indexes for shelter, food at home, energy, transportation services, and medical care |
| Visualization | Two lines or bars comparing essentials inflation to headline CPI; optionally a five-year trend chart |
| Update Cadence | Monthly (CPI release) |

#### Metric 3: Household Financial Cushion

| Attribute | Value |
|-----------|-------|
| Definition | Proportion of households with sufficient liquid savings to cover emergencies. Two indicators: (a) Share who can cover $400 expense with cash/equivalent, (b) Share with 3+ months emergency savings |
| Purpose | Captures financial resilience. Fed surveys show 37% cannot cover $400 emergency with cash/savings/credit card paid off quickly; 13% could not cover at all; only 55% have 3-month rainy-day funds. |
| Data Sources | Federal Reserve's Survey of Household Economics and Decisionmaking (SHED) |
| Visualization | Bar chart showing percentages for each category; optionally a multi-year line chart |
| Update Cadence | Annual (after SHED release) |

### 5.2 Page Structure

**Hero Section:**
- Short headline ("How are American households doing?")
- Quick summary of three metrics with simple icons
- Each metric includes: concise percent change or proportion, updated date, link to details

**Metric Modules (for each metric):**
- One-sentence explanation of what the metric shows
- Why it matters for households
- Common misinterpretation (e.g., "This does not capture high-income households; GDP can rise even if this falls")
- Small chart (thumbnail) and "Methodology" link

**Learn/Explain Section (secondary page):**
- Plain-language articles on topics:
  - "Why GDP ≠ household well-being"
  - "Mean vs. median"
  - "Understanding inflation baskets"
  - "Labor market indicators (prime-age LFPR and EPOP)"

**Sources & Methods Page:**
- Data series used
- Calculation formulas
- Update frequency
- Caveats
- Links to original data sets (BLS, Fed, Census)
- Citations

**Resources Page:**
- Curate external links: calculators (MIT Living Wage), inequality dashboards (Equitable Growth), cost-of-living reports, educational videos

### 5.3 Non-Functional Requirements

| Requirement | Description |
|-------------|-------------|
| Neutral Tone | Avoid ideological or partisan framing. Present alternative interpretations when appropriate and state limitations. |
| Responsiveness & Accessibility | Responsive design, alt text for charts/images, high-contrast color scheme, ARIA labels, keyboard navigation |
| Performance | Lightweight charts (SVG/Canvas), deferred loading to minimize page weight |
| Data Pipeline | Automate data retrieval via APIs (BLS, BEA, Fed). Updates must not break the site. Implement manual overrides with fallback values. |
| Localization | Display update dates in America/New_York timezone (prototype). Note currency (USD). |
| Content Management | Use markdown or simple CMS for explanations to allow non-technical staff updates |

---

## 6. User Stories

1. **As an everyday user**, I want to know whether my paycheck's purchasing power is rising or falling so that I can understand if I am financially keeping up with prices.

2. **As a journalist**, I need trustworthy charts and brief explanations to quickly reference in an article about household well-being.

3. **As a policymaker**, I want a neutral dashboard to gauge how typical households are faring before drafting economic policy.

4. **As an educator**, I want to show students examples of why median measures and prime-age employment ratios are important for understanding economic health.

5. **As a student**, I need links to primary data sources to explore further after reading the summaries.

---

## 7. Stakeholders & Team Roles

| Role | Responsibility |
|------|----------------|
| Product Owner | Sets vision and prioritizes features; ensures alignment with mission |
| Data Analyst | Designs metrics, sources data, maintains data pipeline |
| Content Strategist | Writes explanations, manages tone, oversees citations |
| Designer | Crafts UI/UX for clarity, accessibility, responsiveness |
| Engineer | Builds front-end components, data ingestion scripts, hosting infrastructure |
| Advisory Board | Economists and community organization representatives to review methodology and ensure neutrality |

---

## 8. Milestones & Timeline

| Milestone | Description | Target Date |
|-----------|-------------|-------------|
| Project kickoff & planning | Define scope, confirm metrics, assemble team | Feb 15, 2026 |
| Data sourcing & pipeline setup | Prototype API calls for median wage, CPI components, SHED survey; design calculations | Mar 15, 2026 |
| Design & content wireframes | Draft homepage layout, chart prototypes, initial copy; conduct user tests | Apr 15, 2026 |
| MVP build | Develop front-end pages, integrate automated data feed, implement responsive design | May 30, 2026 |
| Content finalization & review | Finalize explanations, citations, sources page; review with advisory board | Jun 15, 2026 |
| Soft launch & feedback | Release beta to pilot group (journalists, educators); collect feedback and bug reports | Jul 1, 2026 |
| Public launch | Launch site publicly; announce on social media and via partner organizations | Jul 31, 2026 |
| Post-launch evaluation | Analyze engagement metrics, survey user feedback; refine metrics and plan next phase | Sep 1, 2026 |

---

## 9. Future Considerations (Post-MVP)

- **Regional & Demographic Breakdowns:** Add state/city-level metrics and demographic filters (income, age, race)
- **Interactive Budget Tool:** Allow users to input expenses and compare personal inflation rates to national metrics
- **Additional Metrics:** Wealth distribution, consumption poverty, debt burdens; prime-age employment-to-population ratio
- **Educational Partnerships:** Develop lesson plans and interactive modules for schools and community organizations
- **Multi-language Support:** Translations (e.g., Spanish) to reach broader audience

---

## 10. Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| **Perceived Bias** – Users may distrust the site if metrics appear cherry-picked | Transparently describe why each metric was chosen; present alternative views; publish methodology and caveats |
| **Data Delays or Revisions** – Government data releases can be late or revised | Include clear update timestamps; provide explanations of revisions; use fallback values with explicit warnings |
| **Technical Complexity of Data Integration** – API changes or data format shifts could break updates | Modularize data pipeline; write automated tests; monitor endpoints; maintain manual fallback processes |
| **Information Overload** – Expanding beyond a few metrics could confuse users | Start with three metrics; group future additions into separate dashboards; maintain clear hierarchies |
| **Resource Constraints** – Limited funding for ongoing maintenance | Keep MVP scope small; automate wherever possible; seek partnerships and grants for long-term sustainability |

---

## 11. Conclusion

The People's Economy Hub addresses the disconnect between headline economic statistics and the lived experience of typical households. By focusing on median income purchasing power, essential cost pressures, and financial cushions, and by grounding explanations in reputable sources, it aims to build a trusted, non-partisan public resource.

Success will be measured not by page views alone, but by whether the site helps people, journalists, and policymakers understand how Americans are really doing—and prompts more nuanced conversations about economic policy.

---

## References

1. The State of the USA | Measuring Economic Well-being: GDP vs. Median Income - https://www.stateoftheusa.org/content/measuring-economic-well-being.php

2. BLS Spotlight on Statistics: Inflation Experiences for Lower and Higher Income Households - https://www.bls.gov/spotlight/2022/inflation-experiences-for-lower-and-higher-income-households/home.htm

3. Federal Reserve Report on the Economic Well-Being of U.S. Households in 2024 (May 2025) - Savings and Investments - https://www.federalreserve.gov/publications/2025-economic-well-being-of-us-households-in-2024-savings-and-investments.htm

4. CBPP Economic Analysis (5-1-25econ.pdf) - https://www.cbpp.org/sites/default/files/5-1-25econ.pdf
