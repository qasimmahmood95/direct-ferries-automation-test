Feature: Direct Ferries homepage

    Scenario Outline: Popular operators appear
        Given I am on the '<region>' homepage
        Then I see popular operators

    Examples:
    |  region   |
    |  German   |
    |  UK       |
    |  Italian  |

    Scenario Outline: Top destinations appear
        Given I am on the '<region>' homepage
        Then I see top destinations
    
    Examples:
    |  region   |
    |  German   |
    |  UK       |
    |  Italian  |

    Scenario Outline: Latest offers appear
        Given I am on the '<region>' homepage
        Then I see latest offers

    Examples:
    |  region   |
    |  German   |
    |  UK       |
    |  Italian  |
