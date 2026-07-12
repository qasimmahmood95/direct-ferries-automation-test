const { Selector, t } = require('testcafe');
const { getRegion, homepageUrl, TIMEOUTS } = require('../support/config');

/**
 * Page object for the Direct Ferries homepage (all regional variants).
 */
class HomePage {
  constructor() {
    this.cookieAcceptButton = Selector('[data-cky-tag="accept-button"]');
    this.topDestinations = Selector('.df-dom-destinations-content');
    this.offersHeading = Selector('.df-dom-offers-head');
    this.offerCards = Selector('#df-dom-cards-block-full').find('li');
    this.operatorsSection = Selector('.df-dom-operators');
    this.operatorLogos = this.operatorsSection.find('.df-operator-img');
  }

  async open(region) {
    await t.navigateTo(homepageUrl(region));
    // Regions where the banner is expected get a polling budget so a
    // late-rendering banner is still caught; elsewhere a single instant
    // check dismisses a surprise banner without slowing the happy path.
    const budget = getRegion(region).hasCookieBanner ? TIMEOUTS.cookieBanner : 0;
    await this.dismissCookieBannerIfPresent(budget);
  }

  /**
   * Consent banner appearance on the live site depends on IP geolocation
   * and stored consent state, not just the regional domain — so dismiss it
   * when present instead of failing when the expectation is wrong.
   * `await selector.exists` resolves immediately in TestCafe (no retry),
   * hence the explicit polling loop.
   */
  async dismissCookieBannerIfPresent(budgetMs) {
    const pollInterval = 200;
    for (let elapsed = 0; ; elapsed += pollInterval) {
      if (await this.cookieAcceptButton.exists) {
        await t.click(this.cookieAcceptButton);
        return;
      }
      if (elapsed >= budgetMs) return;
      await t.wait(pollInterval);
    }
  }
}

module.exports = new HomePage();
