const { Given, When, Then } = require('@cucumber/cucumber');
const { loginPage, VALIDATION_MESSAGES } = require('../pages/login.page');

// The textContent assertion waits for the element itself, so no separate
// existence pre-check is needed.
const expectValidationError = (t, errorSelector, message) =>
  t.expect(errorSelector.textContent).contains(message);

Given('I am on the login page', async () => {
  await loginPage.open();
});

When('I enter email {string} and reference number {string}', async (_t, [email, reference]) => {
  await loginPage.enterEmail(email);
  await loginPage.enterBookingReference(reference);
});

When('I click Manage my booking', async () => {
  await loginPage.clickManageMyBooking();
});

Then('I see an email error message', async (t) => {
  await expectValidationError(t, loginPage.emailError, VALIDATION_MESSAGES.invalidEmail);
});

Then('I see a reference number error message', async (t) => {
  await expectValidationError(
    t,
    loginPage.bookingReferenceError,
    VALIDATION_MESSAGES.invalidReference
  );
});

Then('I see an empty email error message', async (t) => {
  await expectValidationError(t, loginPage.emailError, VALIDATION_MESSAGES.emptyEmail);
});

Then('I see an empty reference number error message', async (t) => {
  await expectValidationError(
    t,
    loginPage.bookingReferenceError,
    VALIDATION_MESSAGES.emptyReference
  );
});
