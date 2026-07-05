/**
 * Central configuration for the test suite.
 *
 * All environment-specific values (domains, cultures, timeouts) live here so
 * that adding a new region or tuning a timeout is a one-line change.
 */

// hasCookieBanner marks regions where the consent banner is expected, giving
// the dismissal logic a polling budget there (it still tolerates the banner
// being absent, or appearing on other regions).
const REGIONS = {
  German: { tld: 'de', hasCookieBanner: true },
  UK: { tld: 'co.uk', hasCookieBanner: false },
  Italian: { tld: 'it', hasCookieBanner: true },
};

// The dealfinder A/B experiment variant the suite is pinned to, so tests are
// deterministic regardless of which variant the site would otherwise serve.
const DEALFINDER_VERSION = 'A';

const TIMEOUTS = {
  short: 10000,
  medium: 20000,
  cookieBanner: 5000,
  // Quote searches hit live operator APIs and can be slow.
  quotes: 100000,
};

function getRegion(region) {
  const found = REGIONS[region];
  if (!found) {
    throw new Error(
      `Unknown region '${region}'. Supported regions: ${Object.keys(REGIONS).join(', ')}`
    );
  }
  return found;
}

function homepageUrl(region) {
  return `https://www.directferries.${getRegion(region).tld}?dealfinderVersion=${DEALFINDER_VERSION}`;
}

module.exports = {
  TIMEOUTS,
  getRegion,
  homepageUrl,
  loginUrl: 'https://account.directferries.com/?culture=en-GB',
};
