const { Selector, t } = require('testcafe');
const { TIMEOUTS } = require('../support/config');

// Selectors for each leg of the journey; unknown legs fail fast rather than
// silently falling back to the outbound input.
const LEGS = {
  outbound: { input: '#route_outbound', list: '.routes_outbound' },
  return: { input: '#route_return', list: '.routes_return' },
};

function getLeg(leg) {
  const found = LEGS[leg];
  if (!found) {
    throw new Error(`Unknown leg '${leg}'. Supported legs: ${Object.keys(LEGS).join(', ')}`);
  }
  return found;
}

/**
 * Component object for the dealfinder (route search) widget on the homepage.
 */
class DealfinderComponent {
  constructor() {
    this.searchButton = Selector('.df_submit');
    this.differentDetailsButton = Selector('#diff_details');
    this.routeListHeading = Selector('.route_list h5');
  }

  routeInput(leg) {
    return Selector(getLeg(leg).input, { timeout: TIMEOUTS.medium });
  }

  routeOption(leg, route) {
    return Selector(getLeg(leg).list).find('li').withAttribute('data-routename', route);
  }

  async selectRoute(leg, route) {
    const input = this.routeInput(leg);
    await t
      // Type a space first as the first typeText occasionally doesn't register.
      .typeText(input, ' ')
      .typeText(input, route)
      .click(input);
    await t
      .expect(this.routeListHeading.exists)
      .ok('Routes drop down not loaded', { timeout: TIMEOUTS.short })
      .expect(this.routeOption(leg, route).exists)
      .ok(`Route '${route}' not present in the drop down`, { timeout: TIMEOUTS.short })
      // Slow down the click to ensure it is registered.
      .click(this.routeOption(leg, route), { speed: 0.01 });
  }

  async clickSearch() {
    await t.click(this.searchButton);
  }

  async clickDifferentDetails() {
    await t.click(this.differentDetailsButton);
  }
}

module.exports = new DealfinderComponent();
