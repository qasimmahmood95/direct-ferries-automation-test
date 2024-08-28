const { Selector, t } = require('testcafe');

module.exports = {
    onHomepage: async function (region) {

        const regionSites = new Map([
          ['German', 'de'],
          ['UK', 'co.uk'],
          ['Italian', 'it'],
        ]);

        let homepageUrl = 'https://www.directferries.' + regionSites.get(region) + '?dealfinderVersion=A'
        await t.navigateTo(homepageUrl)
        
        if (region != 'UK'){
        await t.click(Selector('[data-cky-tag="accept-button"]'));
        }
    },
}
