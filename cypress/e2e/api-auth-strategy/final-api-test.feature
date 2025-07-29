Feature: API-Style Authentication Strategy (Final)
  As a QA Engineer testing SauceDemo
  I want to use an optimized authentication strategy that mimics API behavior
  So that I can test efficiently without traditional UI interactions

  Background:
    Given SauceDemo is accessible

  @fast-auth
  Scenario: Fast Authentication and Inventory Verification
    When I authenticate using fast API strategy as "standard_user"
    And I navigate directly to inventory page
    Then I should see all products displayed correctly
    And the page should load within acceptable time

  @cart-workflow  
  Scenario: Complete Cart Workflow with Fast Authentication
    Given I authenticate using fast API strategy as "standard_user"
    When I navigate directly to inventory page
    And I add "sauce-labs-backpack" to cart using optimized action
    And I add "sauce-labs-bike-light" to cart using optimized action
    And I navigate to cart page
    Then I should see 2 items in cart
    When I remove "sauce-labs-bike-light" from cart
    Then I should see 1 item in cart

  @checkout-flow
  Scenario: End-to-End Checkout with Fast Authentication
    Given I authenticate using fast API strategy as "standard_user"
    When I navigate directly to inventory page
    And I add "sauce-labs-backpack" to cart using optimized action
    And I navigate to cart page
    And I proceed to checkout with standard user information
    And I complete the order
    Then I should see order confirmation
    And the order should be processed successfully

  @multi-user
  Scenario Outline: Multi-User Fast Authentication Test
    When I authenticate as "<userType>" using predefined user
    And I navigate directly to inventory page
    Then I should see appropriate user experience for "<userType>"
    
    Examples:
      | userType    |
      | standard    |
      | performance |
      | problem     |

  @performance
  Scenario: Performance Verification with Fast Authentication  
    When I authenticate using fast API strategy as "performance_glitch_user"
    And I navigate directly to inventory page
    Then the page should handle performance user appropriately
    And all products should eventually load
