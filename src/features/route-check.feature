# @blocked-in-ci: the www.directferries.* sites return HTTP 403 to requests
# from public CI runners (WAF blocks datacenter IPs), so CI excludes this
# feature via --tags ~@blocked-in-ci. Run it locally or on a self-hosted runner.
@routes @regression @blocked-in-ci
Feature: Route search on the German site
  Searching for a route from the dealfinder should land on the quotes page for that route

  Scenario: Searching for a route shows quotes for that route
    Given I am on the 'German' homepage
    And I have selected route 'Amalfi - Neapel'
    When I click Search on the dealfinder
    And I wait for quotes to load
    Then I am viewing route from 'Amalfi' to 'Neapel'

  Scenario: Searching for another route shows quotes for that route
    Given I am on the 'German' homepage
    And I have selected route 'Neapel - Sorrent'
    When I click Search on the dealfinder
    And I wait for quotes to load
    Then I am viewing route from 'Neapel' to 'Sorrent'

  Scenario: Searching for a split return route shows quotes for both legs
    Given I am on the 'German' homepage
    And I have selected route 'Sorrent - Ischia'
    When I click different details for return trip
    And I have selected return route 'Amalfi - Neapel'
    And I click Search on the dealfinder
    And I wait for quotes to load
    Then I am viewing route from 'Sorrent' to 'Ischia'
    And I am viewing route from 'Amalfi' to 'Neapel'
