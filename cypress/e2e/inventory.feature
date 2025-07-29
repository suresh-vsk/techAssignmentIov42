Feature: Inventory Functionality

  Background:
    Given I am on the products page as "standard_user"

  Scenario: All products load correctly
    Then All products are loaded correctly

  # Product sorting scenarios
  Scenario Outline: Products can be sorted by different criteria
    When I sort products by "<sortOption>"
    Then The products are sorted by "<sortOption>"

    Examples:
      | sortOption              |
      | Price (low to high)     |
      | Price (high to low)     |
      | Name (A to Z)           |
      | Name (Z to A)           |

  # Cart management scenarios
  Scenario Outline: User can add and remove products from cart
    When I add <addCount> product to my cart
    Then I have <addCount> product in my cart
    When I can remove <removeCount> product from my cart
    Then I have <finalCount> product in my cart

    Examples:
      | addCount | removeCount | finalCount |
      | 1        | 1           | 0          |
      | 3        | 2           | 1          |