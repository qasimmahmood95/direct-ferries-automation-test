const { Given } = require('@cucumber/cucumber');
const homePage = require('../pages/home.page');

Given('I am on the {string} homepage', async (_t, [region]) => {
  await homePage.open(region);
});
