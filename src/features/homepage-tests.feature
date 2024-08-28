Feature: Direct Ferries homepage

    Scenario: Popular operators appear - Germany
        Given I am on the 'German' homepage
        Then I see popular operators

    Scenario: Top destinations appear - Germany
        Given I am on the 'German' homepage
        Then I see top destinations
    
    Scenario: Latest offers appear - Germany
        Given I am on the 'German' homepage
        Then I see latest offers
    
    Scenario: Popular operators appear - UK
        Given I am on the 'UK' homepage
        Then I see popular operators

    Scenario: Top destinations appear - UK
        Given I am on the 'UK' homepage
        Then I see top destinations
    
    Scenario: Latest offers appear - UK
        Given I am on the 'UK' homepage
        Then I see latest offers

    Scenario: Popular operators appear - Italy
        Given I am on the 'Italian' homepage
        Then I see popular operators

    Scenario: Top destinations appear - Italy
        Given I am on the 'Italian' homepage
        Then I see top destinations
    
    Scenario: Latest offers appear - Italy
        Given I am on the 'Italian' homepage
        Then I see latest offers


# =================================================================

# Below is how I would have preferred to set these tests up,
# but for some reason I couldn't quite get it to work

# It would always take the table header as a parameter (i.e. '<region>')
# to run the tests, and I tried for a while to try and fix it, but I couldn't

# Not sure if it's Cucumber-JS, or TestCafe, or something I'm doing wrong,
# but I'm happy to discuss in the next interview

# =================================================================

#     Scenario: Popular operators appear
#         Given I am on the '<region>' homepage
#         Then I see popular operators

#     Scenario: Top destinations appear
#         Given I am on the '<region>' homepage
#         Then I see top destinations
    
#     Scenario: Latest offers appear
#         Given I am on the '<region>' homepage
#         Then I see latest offers

#   Examples:
#     |  region   |
#     |  German   |
#     |  UK       |
#     |  Italian  |
