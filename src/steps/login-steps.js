const { Given, When, Then } = require("@cucumber/cucumber");
const login = require("../methods/login-methods.js");

Given('I am on the login page', async function () {
    await login.onLogin();
});

When('I enter email {string} and reference number {string}', async function(t, [email, reference]){
    await login.enterEmail(email);
    await login.enterReferenceNumber(reference);
});

Then('I click Manage my booking', async function(){
    await login.clickManageMyBooking();
});

Then('I see an email error message', async function(){
    await login.checkEmailErrorMessage();
});

Then('I see a reference number error message', async function(){
    await login.checkReferenceNumberErrorMessage();
});

Then('I see an empty email error message', async function(){
    await login.checkEmptyEmailErrorMessage();
});

Then('I see an empty reference number error message', async function(){
    await login.checkEmptyReferenceNumberErrorMessage();
});
