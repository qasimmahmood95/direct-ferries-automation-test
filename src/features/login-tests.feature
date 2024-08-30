Feature: Login

    Scenario: User cannot login with invalid email and reference number
        Given I am on the login page
        When I enter email 'abc' and reference number '123'
        And I click Manage my booking
        Then I see an email error message
        And I see a reference number error message
    
    Scenario: User cannot login with invalid email
        Given I am on the login page
        When I enter email '123' and reference number 'DFP123456789'
        And I click Manage my booking
        Then I see an email error message 
    
    Scenario: User cannot login with invalid reference number
        Given I am on the login page
        When I enter email 'test@test.com' and reference number '123'
        And I click Manage my booking
        And I see a reference number error message

    Scenario: User cannot login with empty email and reference number
        Given I am on the login page
        And I click Manage my booking
        Then I see an empty email error message 
        And I see an empty reference number error message
