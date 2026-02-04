# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**People's Economy Hub (PEH)** is a not-for-profit digital platform that helps everyday Americans understand how the economy affects their households. It translates technical public economic data into accessible, neutral, and trusted information.

## Core Metrics (MVP)

The platform displays three household-centered metrics:

1. **Purchasing Power of the Median Paycheck** - Real wage changes after inflation (quarterly, from BLS Current Population Survey)
2. **Essentials Cost Pressure** - Inflation on housing, food, energy, transportation, healthcare vs headline CPI (monthly, from CPI sub-indexes)
3. **Household Financial Cushion** - Share of households that can cover emergencies (annual, from Federal Reserve SHED survey)

## Technical Requirements

### Data Pipeline
- Automate data retrieval via BLS, BEA, and Federal Reserve APIs
- Implement fallback values with manual overrides for data delays
- Include clear update timestamps and revision tracking
- Modularize pipeline with automated tests

### Frontend
- Responsive, mobile-first design (90-second comprehension target on phone)
- Lightweight charts using SVG/Canvas (not heavy charting libraries)
- WCAG accessibility: ARIA labels, keyboard navigation, high-contrast colors, alt text
- Markdown or simple CMS for content management

### Localization
- Display dates in America/New_York timezone
- Currency: USD

## Content Guidelines

- **Neutral tone**: Non-ideological, non-partisan framing
- **Plain language**: Avoid jargon, comprehensible to non-economists
- **Transparency**: Document sources, methods, uncertainties, and caveats
- Present alternative interpretations when appropriate

## Key Data Sources

| Metric | Source | Update Cadence |
|--------|--------|----------------|
| Median wages | BLS Current Population Survey | Quarterly |
| Essentials inflation | CPI sub-indexes (shelter, food, energy, transportation, medical) | Monthly |
| Financial cushion | Federal Reserve SHED survey | Annual |

## Reference Documentation

- PRD: `docs/PRD.pdf`
