const { Given, When, Then } = require("@cucumber/cucumber");
const quotes = require("../methods/quotes-methods.js");

Given('I wait for quotes to load', async function () {
    await quotes.waitForQuotes();
});

Then('I am viewing route from {string} to {string}', async function (t, [portOut, portRet]) {
    await quotes.checkRouteIsPresent(portOut, portRet);
});

Then('I am viewing route from {string} to {string} on the {string} site', async function (t, [portOut, portRet, region]) {
    await quotes.checkRouteIsPresent(portOut, portRet, region);
});