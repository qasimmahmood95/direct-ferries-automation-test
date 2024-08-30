## Direct Ferries Automation Task

We would like you to complete a small task to demonstrate your technical understanding of automation. Keep in mind scalability for the project. You are not expected to spend too much time on this, just between 45 mins to 1 hour, although it is not a timed task. Then create your own git repo and commit your changes there.

---

1. There are some tests existing and working within homepage-tests feature - please extend the test coverage for sites www.directferries.co.uk and www.directferries.it and ensure all the tests pass.

- I did this by editing the existing tests to take an input to determine the region, and I created a HashMap to filter the correct domain based on the region
- I also parametrised the Cucumber tests using Scenario Outlines, after a bit of battling with Cucumber-JS

---

2. Please write a new test which will Navigate to my account page 'https://account.directferries.com/?culture=en-GB' type in some incorrect details and try to log in.

- I added a few negative path tests for login, including entering an invalid email, an invalid reference number, both an invalid email and reference number, and finally an empty email and reference number

---

3. Scenarios 1 & 3 within route-check feature are failing. To support a change in the upcoming sprint, you need to write automation for route Amalfi – Neapel. The existing steps do not seem to pass the checks which have been working for all routes up until now. Please investigate & resolve the issue here.

- Seems like after inputting a route, the tests were designed to click on the first element in the list, which wasn't always the correct route
- I changed this to click on the route in the list that matches the correct test id

---

4. If you had extra time, what would you have done differently?

- I would parametrise the Cucumber tests by getting the Cucumber Scenario Outline working within the homepage-tests feature, and then expand on the login tests with some positive testing
- Once that was setup, I would try and expand the testing to even more countries and regions

Please send your finished repo via email to racheld@directferries.com prior to your interview
