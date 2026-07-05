@homepage @smoke
Feature: Direct Ferries homepage
  Key content sections should render on every regional homepage

  # The three sections are asserted together per page load: one navigation
  # per region instead of three keeps live-site traffic and flake surface low.
  Scenario Outline: Key content sections appear on the <region> homepage
    Given I am on the '<region>' homepage
    Then I see popular operators
    And I see top destinations
    And I see latest offers

    Examples:
      | region  |
      | German  |
      | UK      |
      | Italian |
