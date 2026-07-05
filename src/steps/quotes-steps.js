const { When, Then } = require('@cucumber/cucumber');
const quotesPage = require('../pages/quotes.page');

When('I wait for quotes to load', async () => {
  await quotesPage.waitForQuotes();
});

Then('I am viewing route from {string} to {string}', async (t, [portOut, portRet]) => {
  await t
    .expect(quotesPage.quoteForRoute(portOut, portRet).exists)
    .ok(`No quote found for the route '${portOut} - ${portRet}'`);
});
