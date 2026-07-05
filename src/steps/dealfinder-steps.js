const { Given, When } = require('@cucumber/cucumber');
const dealfinder = require('../pages/dealfinder.component');

Given('I have selected route {string}', async (_t, [route]) => {
  await dealfinder.selectRoute('outbound', route);
});

Given('I have selected return route {string}', async (_t, [route]) => {
  await dealfinder.selectRoute('return', route);
});

When('I click different details for return trip', async () => {
  await dealfinder.clickDifferentDetails();
});

When('I click Search on the dealfinder', async () => {
  await dealfinder.clickSearch();
});
