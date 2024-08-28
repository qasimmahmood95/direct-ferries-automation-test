const { Selector, t } = require('testcafe');

async function checkForRightRoute(portOut, portRet) {
    for (let i = 0; i < await Selector('div.mpopquote').count; i++) {
        let isRightQuote = await Selector('div.mpopquote', { timeout: 50 }).nth(i).withText(portOut).withText(portRet).visible
        if (isRightQuote) {
            return true;
        }
    }
    return false;
}
module.exports = {
    waitForQuotes: async function () {
        await t
            .expect(Selector('.opLoader').visible).notOk('Quotes haven\'t loaded', { timeout: 100000 })
        await t
            .expect(Selector('#divQuotesContainer').visible).ok('Quotes not loaded', { timeout: 100000 })
    },
    checkRouteIsPresent: async function(portOut, portRet, region){
        const regionSites = new Map([
          ['German', ''],
          ['UK', 'You are not viewing the right route for the quotes page'],
          ['Italian', ''],
        ]);
        await t.expect(await checkForRightRoute(portOut, portRet)).eql(true, "You are not viewing the right route for the quotes page")
    }

}
