const { Selector, t } = require('testcafe');

module.exports = {
    onLogin: async function () {
      let loginUrl = 'https://account.directferries.com/?culture=en-GB'
        await t.navigateTo(loginUrl)
    },
    enterEmail: async function (email) {
        const emailSelector = Selector("#Email")
        await t
        .click(emailSelector)
        .typeText(emailSelector, email);

    },
    enterReferenceNumber: async function (reference) {
        const bookingRefSelector = Selector("#BookingReference")
        await t
        .click(bookingRefSelector)
        .typeText(bookingRefSelector, reference);
    },
    clickManageMyBooking: async function () {
        await t.click(Selector("#manage-booking-button"))
    },
    checkEmailErrorMessage: async function (){
        await t
        .expect(Selector('#Email-error').exists).ok()
        .expect(Selector('#Email-error').textContent).contains('The email address you have entered is invalid')
    },
    checkReferenceNumberErrorMessage: async function (){
        await t
        .expect(Selector('#BookingReference-error').exists).ok()
        .expect(Selector('#BookingReference-error').textContent).contains('Your booking reference number is invalid')
    },
    checkEmptyEmailErrorMessage: async function (){
        await t
        .expect(Selector('#Email-error').exists).ok()
        .expect(Selector('#Email-error').textContent).contains('Please enter the email address you used when you made your booking')
    },
    checkEmptyReferenceNumberErrorMessage: async function (){
        await t
        .expect(Selector('#BookingReference-error').exists).ok()
        .expect(Selector('#BookingReference-error').textContent).contains('Please enter your Direct Ferries reference number')
    },
}