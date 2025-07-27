Feature: Login Functionality

  Background:
    Given I open the login page

  # Valid login scenarios
  Scenario Outline: Login with different user types
    When I enter username "<username>" and password "<password>"
    And I click the login button
    Then I should see the homepage

    Examples:
      | username                | password     |
      | standard_user          | secret_sauce |
      | performance_glitch_user | secret_sauce |
      | problem_user           | secret_sauce |
      | error_user             | secret_sauce |
      | visual_user            | secret_sauce |

  # Invalid login scenarios  
  Scenario Outline: Login with invalid credentials
    When I enter username "<username>" and password "<password>"
    And I click the login button
    Then I should see a login error with "<errorMessage>"

    Examples:
      | username        | password     | errorMessage                                        |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out. |
      | invalid_user    | secret_sauce | Epic sadface: Username and password do not match any user in this service |
      | standard_user   | wrong_pass   | Epic sadface: Username and password do not match any user in this service |
      | <EMPTY>         | secret_sauce | Epic sadface: Username is required                  |
      | standard_user   | <EMPTY>      | Epic sadface: Password is required                  |