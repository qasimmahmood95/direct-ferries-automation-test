# Direct Ferries E2E Test Automation

[![CI](https://github.com/qasimmahmood95/direct-ferries-automation-test/actions/workflows/ci.yml/badge.svg)](https://github.com/qasimmahmood95/direct-ferries-automation-test/actions/workflows/ci.yml)

A BDD end-to-end test suite for the [Direct Ferries](https://www.directferries.co.uk) websites,
built with [TestCafe](https://testcafe.io/) and Cucumber via
[gherkin-testcafe](https://github.com/kiwigrid/gherkin-testcafe).

The suite covers three regional homepages (UK, German, Italian), the
"Manage my booking" login journey, and route search through the dealfinder
widget — all runnable locally or headless in CI with JUnit reporting and
screenshots on failure.

> This project began as a time-boxed technical assessment and was then
> hardened into a production-style framework. The original brief and answers
> are preserved in [docs/TASK.md](docs/TASK.md).

## Tech stack

- **TestCafe** — browser automation (no WebDriver, built-in smart waits)
- **gherkin-testcafe + Cucumber** — Gherkin feature files with TestCafe step definitions
- **ESLint + Prettier** — static analysis and consistent formatting
- **GitHub Actions** — lint + headless E2E on a Chrome/Firefox matrix for every PR, plus a nightly run

## Getting started

Requires Node.js ≥ 18 (an `.nvmrc` is provided) and Chrome.

```bash
npm ci

npm test                # full suite, headed Chrome
npm run test:headless   # full suite, headless Chrome
npm run test:smoke      # @smoke scenarios only (homepage + login)
npm run test:regression # @regression scenarios only (route search)

npm run lint            # ESLint
npm run format          # Prettier write
```

Any TestCafe browser alias works via the `BROWSER` variable, e.g.:

```bash
BROWSER=firefox:headless npm run test:headless
```

## Reporting & debugging

- **Failure screenshots** are captured automatically to `artifacts/screenshots/`.
- **JUnit report** — CI runs write `artifacts/report.xml`, which is surfaced
  two ways: as inline pass/fail annotations on the PR (via `dorny/test-reporter`)
  and as a downloadable build artifact alongside the screenshots.
- **Readable console output** — the `spec` reporter prints each Gherkin
  scenario and step as it runs.

## Project structure

```
src/
├── features/     Gherkin feature files (the executable specification)
│   ├── homepage-tests.feature   Homepage content, parametrised per region
│   ├── login-tests.feature      Login negative-path validation
│   └── route-check.feature      Dealfinder route search → quotes page
├── steps/        Step definitions — thin glue between Gherkin and pages
├── pages/        Page/component objects — selectors and user actions
│   ├── home.page.js
│   ├── dealfinder.component.js
│   ├── login.page.js
│   └── quotes.page.js
└── support/
    └── config.js  Regions, URLs and timeouts in one place
```

### Design decisions

- **Page Object Model.** Selectors and interactions live in `src/pages/`;
  step definitions only orchestrate pages and assert. A UI change is a
  one-file fix.
- **Central configuration.** All regions (domain TLD, cookie-banner
  behaviour), URLs and timeouts live in `src/support/config.js`. Adding a new
  regional site is a single line; unknown regions fail fast with a clear
  error listing the supported ones.
- **Deterministic A/B variant.** Homepage URLs pin `dealfinderVersion=A` so
  tests don't flake when the site serves a different experiment variant.
- **Tag strategy.** `@smoke` (fast, wide: homepage + login validation) vs
  `@regression` (slow, deep: full route search through live quote APIs), so
  CI and local runs can pick the right depth.
- **Resilient route selection.** The dealfinder suggestion list is matched by
  the `data-routename` attribute rather than "first item in the list", which
  fixed routes (e.g. Amalfi – Neapel) where the first suggestion isn't the
  requested route.
- **Bounded quarantine mode in CI** (`-q attemptLimit=3,successThreshold=1`).
  The suite runs against the live production sites, so CI retries failing
  tests to separate genuine failures from network/third-party flakiness —
  bounded so a real regression stops after 3 attempts instead of TestCafe's
  default 5.
- **One navigation per homepage check.** The homepage feature asserts all
  three content sections per page load rather than reloading the live site
  for each assertion — 3 navigations instead of 9 per run.

## CI

The [CI workflow](.github/workflows/ci.yml) runs on every push to `main`, every PR, and nightly:

1. **Lint & format** — ESLint and a Prettier check, gating the expensive
   live-site jobs.
2. **E2E matrix** — the full suite in headless Chrome and Firefox in
   parallel, annotating the PR with per-test results and uploading the JUnit
   report and any failure screenshots as build artifacts.

Because the tests exercise the live public websites, occasional failures can
reflect site availability or content changes rather than a defect in the
suite — the nightly schedule makes such drift visible quickly.

## Extending the suite

1. Describe the behaviour in a `.feature` file (tag it `@smoke` or `@regression`).
2. Add any new selectors/actions to a page object in `src/pages/` (or create
   a new one and export a singleton).
3. Wire the steps in `src/steps/` — keep them one or two lines, delegating to
   pages.
4. Add new regions in `src/support/config.js`.

## Roadmap

- Extend the browser matrix beyond Chrome/Firefox (Edge, Safari via a device cloud)
- Positive-path login coverage with a seeded test account
- Visual regression checks on the homepage sections
- Concurrency (`-c`) once quote-page flakiness is characterised
