const { Selector, t } = require('testcafe');
function getRoutePicker(leg, route) {
    if (leg === "return") {
      return Selector('.routes_return').find('li').withAttribute('data-routename', route);
    }
    return Selector('.routes_outbound').find('li').withAttribute('data-routename', route);
  }
  
async function getRoute(leg) {
    if (leg === "return") {
        return Selector("#route_return", { timeout: 20000 })
    }
    return Selector('#route_outbound', { timeout: 20000 })
}
module.exports = {

    selectRoute: async function (leg, route) {
        await t
            .typeText(await getRoute(leg), " ") //type a space first as we sometimes have issues where the first type text doesn't register
            .typeText(await getRoute(leg), route)
            .click(await getRoute(leg))
        await t
            .expect(Selector(".route_list h5").exists).ok('Routes drop down not loaded', { timeout: 10000 })
            .expect(getRoutePicker(leg).exists).ok('Correct route not loaded', { timeout: 10000 })
            .click(getRoutePicker(leg, route), { speed: 0.01 }) //slow down click to ensure it is registered
    },
    clickSearch: async function () {
        await t.click(Selector(".df_submit"));
    },
    clickDifferentDetails: async function () {
        await t.click(Selector("#diff_details"));
    }
}
