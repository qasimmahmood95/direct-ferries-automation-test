const { Selector, t } = require('testcafe');
const { TIMEOUTS } = require('../support/config');

/**
 * Page object for the quotes (search results) page.
 */
class QuotesPage {
  constructor() {
    this.quotes = Selector('div.mpopquote');
  }

  async waitForQuotes() {
    // Waiting for a visible quote card (rather than for the loader to
    // disappear) covers both the initial page load and quotes streaming in
    // from the live operator APIs.
    await t
      .expect(this.quotes.filterVisible().count)
      .gte(1, 'Quotes did not load', { timeout: TIMEOUTS.quotes });
  }

  /** A visible quote card mentioning both ports of the requested route. */
  quoteForRoute(portOut, portRet) {
    return this.quotes.withText(portOut).withText(portRet).filterVisible();
  }
}

module.exports = new QuotesPage();
