Feature: Cart Functionality

  # Successful checkout scenarios with different users
  Scenario Outline: Successfully checkout with different users
    Given I am on the products page as "<user>"
    When I add <productCount> products to my cart
    And I go to the cart page
    And I proceed to checkout
    And I fill in checkout information with "<firstName>" "<lastName>" "<postalCode>"
    And I continue with the checkout
    And I complete the checkout
    Then I should see the order confirmation

    Examples:
      | user                    | productCount | firstName | lastName | postalCode |
      | standard_user          | 2            | John      | Doe      | 12345      |
      | performance_glitch_user| 1            | Jane      | Smith    | 54321      |


  # Scenario: Successfully checkout with authenticated session and token manipulation
  #   Given I am on the products page as "standard_user"
  #   When I add 1 product to my cart
  #   And I manipulate the session token
  #   And I go to the cart page
  #   And I proceed to checkout
  #   And I fill in checkout information with "Test" "User" "99999"
  #   And I continue with the checkout
  #   And I complete the checkout
  #   Then I should see the order confirmation

  Scenario: Successfully checkout with SQL-authenticated session and token manipulation
    Given I am on the products page as "standard_user"
    When I add 1 product to my cart
    And I manipulate the SQL session token
    And I go to the cart page
    And I proceed to checkout
    And I fill in checkout information with "Test" "User" "99999"
    And I continue with the checkout
    And I complete the checkout
    Then I should see the order confirmation

  # SQL Authentication security test scenario
  Scenario: SQL authentication persists through cart operations
    Given I am on the products page as "standard_user"
    When I add 1 product to my cart
    And I clear browser cookies and local storage
    And I verify SQL authentication is maintained
    And I go to the cart page
    Then I should still be on the cart page with SQL authentication

  # Form validation scenarios
  Scenario Outline: Unsuccessful checkout with missing required fields
    Given I am on the products page as "standard_user"
    When I add 1 product to my cart
    And I go to the cart page
    And I proceed to checkout
    And I fill in checkout information with "<firstName>" "<lastName>" "<postalCode>"
    And I try to complete the checkout
    Then I should see an error message for missing <fieldName>

    Examples:
      | firstName | lastName | postalCode | fieldName |
      |           | Doe      | 12345      | firstname |
      | John      |          | 12345      | lastname  |
      | John      | Doe      |            | postcode  |

  # Cart manipulation scenario
  Scenario: Successfully remove products from cart and checkout
    Given I am on the products page as "standard_user"
    When I add 3 products to my cart
    And I go to the cart page
    And I remove 1 product from the cart
    Then I should have 2 products in my cart
    When I proceed to checkout
    And I fill in checkout information with "John" "Doe" "12345"
    And I continue with the checkout
    And I complete the checkout
    Then I should see the order confirmation
