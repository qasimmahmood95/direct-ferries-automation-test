# Original Task Brief & Answers

This repository started as a technical assessment. The original brief and my
answers are preserved below; the repo has since been refactored into a
production-style framework (see the [README](../README.md) for the current
architecture).

---

## The brief

> We would like you to complete a small task to demonstrate your technical
> understanding of automation. Keep in mind scalability for the project. You
> are not expected to spend too much time on this, just between 45 mins to
> 1 hour, although it is not a timed task. Then create your own git repo and
> commit your changes there.

### 1. Extend homepage test coverage to www.directferries.co.uk and www.directferries.it and ensure all the tests pass

- I did this by editing the existing tests to take an input to determine the
  region, and I created a map to resolve the correct domain based on the
  region.
- I also parametrised the Cucumber tests using Scenario Outlines, after a bit
  of battling with Cucumber-JS.

### 2. Write a new test which navigates to the account page, types in some incorrect details and tries to log in

- I added a few negative path tests for login, including entering an invalid
  email, an invalid reference number, both an invalid email and reference
  number, and finally an empty email and reference number.

### 3. Scenarios 1 & 3 within the route-check feature are failing for route Amalfi – Neapel. Investigate & resolve the issue

- After inputting a route, the tests were designed to click on the first
  element in the suggestion list, which wasn't always the correct route.
- I changed this to click on the entry in the list that matches the correct
  route (via its `data-routename` attribute).

### 4. If you had extra time, what would you have done differently?

- Parametrise the Cucumber tests via Scenario Outlines in the homepage
  feature, then expand the login tests with some positive testing.
- Once that was set up, expand the testing to even more countries and regions.

Both of these have since been done — along with a Page Object Model refactor,
linting, CI, and reporting. See the README for details.
