const { Selector, t } = require('testcafe');
const { loginUrl } = require('../support/config');

/**
 * Page object for the "Manage my booking" login page.
 */
class LoginPage {
  constructor() {
    this.emailInput = Selector('#Email');
    this.bookingReferenceInput = Selector('#BookingReference');
    this.manageBookingButton = Selector('#manage-booking-button');
    this.emailError = Selector('#Email-error');
    this.bookingReferenceError = Selector('#BookingReference-error');
  }

  async open() {
    await t.navigateTo(loginUrl);
  }

  async enterEmail(email) {
    await t.click(this.emailInput).typeText(this.emailInput, email);
  }

  async enterBookingReference(reference) {
    await t.click(this.bookingReferenceInput).typeText(this.bookingReferenceInput, reference);
  }

  async clickManageMyBooking() {
    await t.click(this.manageBookingButton);
  }
}

/**
 * Expected validation messages, kept alongside the page object so a copy
 * change on the site is a single-line fix.
 */
const VALIDATION_MESSAGES = {
  invalidEmail: 'The email address you have entered is invalid',
  invalidReference: 'Your booking reference number is invalid',
  emptyEmail: 'Please enter the email address you used when you made your booking',
  emptyReference: 'Please enter your Direct Ferries reference number',
};

module.exports = { loginPage: new LoginPage(), VALIDATION_MESSAGES };
