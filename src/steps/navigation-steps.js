const { Given, When, Then } = require("@cucumber/cucumber");
const navigation = require("../methods/navigation-methods.js");

Given('I am on the {string} homepage', async function (t, [region]) {
        await navigation.onHomepage(region);
});
