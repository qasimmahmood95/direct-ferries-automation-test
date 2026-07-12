const { Then } = require('@cucumber/cucumber');
const homePage = require('../pages/home.page');

Then('I see top destinations', async (t) => {
  await t.expect(homePage.topDestinations.exists).ok('Top destinations section is missing');
});

Then('I see latest offers', async (t) => {
  await t
    .expect(homePage.offersHeading.exists)
    .ok('Latest offers heading is missing')
    .expect(homePage.offerCards.count)
    .gte(3, 'Expected at least 3 offer cards');
});

Then('I see popular operators', async (t) => {
  await t.expect(homePage.operatorLogos.count).gte(16, 'Expected at least 16 operator logos');
});
