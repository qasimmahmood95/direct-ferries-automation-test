const { Selector, t } = require('testcafe');

module.exports = {
    onHomepage: async function () {
        await t
        .navigateTo('https://www.directferries.de?dealfinderVersion=A')
        .click(Selector('[data-cky-tag="accept-button"]'));
    }
}
