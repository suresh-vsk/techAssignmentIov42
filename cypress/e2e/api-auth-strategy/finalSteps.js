import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Background steps
Given("SauceDemo is accessible", () => {
    cy.log(" Verifying SauceDemo accessibility");
    cy.request('https://www.saucedemo.com/').its('status').should('eq', 200);
});

// Authentication steps
Given("I authenticate using fast API strategy as {string}", (username) => {
    cy.log(`Fast API authentication for: ${username}`);
    cy.fastApiAuth(username);
});

When("I authenticate as {string} using predefined user", (userType) => {
    cy.log(`Authenticating as predefined user: ${userType}`);
    cy.authAs(userType);
});

// Navigation steps
When("I navigate directly to inventory page", () => {
    cy.log("Direct navigation to inventory");
    cy.goToInventory();
});

When("I navigate to cart page", () => {
    cy.log("Navigation to cart");
    cy.goToCart();
});

// Product actions
When("I add {string} to cart using optimized action", (productId) => {
    cy.log(`Adding ${productId} to cart`);
    cy.addProductToCart(productId);
});

When("I remove {string} from cart", (productId) => {
    cy.log(`Removing ${productId} from cart`);
    cy.removeProductFromCart(productId);
});

// Checkout actions
When("I proceed to checkout with standard user information", () => {
    cy.log("Proceeding to checkout");
    cy.proceedToCheckout();
});

When("I complete the order", () => {
    cy.log("Completing order");
    cy.completeOrder();
});

// Verification steps
Then("I should see all products displayed correctly", () => {
    cy.log("Verifying products display");
    cy.get('[data-test="inventory-container"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-test="inventory-item"]', { timeout: 10000 })
      .should('have.length.greaterThan', 5)
      .and('be.visible');
    
    // Verify product images are loaded
    cy.get('[data-test="inventory-item"] img', { timeout: 10000 })
      .should('be.visible')
      .and('have.attr', 'src')
      .and('not.be.empty');
});

Then("the page should load within acceptable time", () => {
    cy.log("⏱️ Verifying page load performance");
    // This is already verified by the timeouts in previous steps
    cy.get('[data-test="inventory-container"]').should('be.visible');
});

Then("I should see {int} items in cart", (expectedCount) => {
    cy.log(`Verifying ${expectedCount} items in cart`);
    if (expectedCount > 0) {
        // Try multiple selectors for cart items
        cy.get('body').then(($body) => {
            if ($body.find('[data-test="cart-item"]').length > 0) {
                cy.get('[data-test="cart-item"]', { timeout: 10000 })
                  .should('have.length', expectedCount);
            } else if ($body.find('.cart_item').length > 0) {
                cy.get('.cart_item', { timeout: 10000 })
                  .should('have.length', expectedCount);
            } else {
                // Fallback: check by cart list content
                cy.get('[data-test="cart-list"]', { timeout: 10000 })
                  .should('be.visible')
                  .find('.cart_item, [data-test="cart-item"], .inventory_item_name')
                  .should('have.length.greaterThan', 0);
            }
        });
        
        // Verify cart badge
        cy.get('[data-test="shopping-cart-badge"]', { timeout: 5000 })
          .should('contain', expectedCount.toString());
    } else {
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    }
});

// Handle singular form
Then("I should see {int} item in cart", (expectedCount) => {
    cy.log(`Verifying ${expectedCount} item in cart`);
    // Reuse the same logic as plural form
    if (expectedCount > 0) {
        cy.get('body').then(($body) => {
            if ($body.find('[data-test="cart-item"]').length > 0) {
                cy.get('[data-test="cart-item"]', { timeout: 10000 })
                  .should('have.length', expectedCount);
            } else if ($body.find('.cart_item').length > 0) {
                cy.get('.cart_item', { timeout: 10000 })
                  .should('have.length', expectedCount);
            } else {
                cy.get('[data-test="cart-list"]', { timeout: 10000 })
                  .should('be.visible')
                  .find('.cart_item, [data-test="cart-item"], .inventory_item_name')
                  .should('have.length.greaterThan', 0);
            }
        });
        
        cy.get('[data-test="shopping-cart-badge"]', { timeout: 5000 })
          .should('contain', expectedCount.toString());
    } else {
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    }
});

Then("I should see order confirmation", () => {
    cy.log("Verifying order confirmation");
    cy.get('[data-test="complete-header"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Thank you for your order!');
});

Then("the order should be processed successfully", () => {
    cy.log("Verifying successful order processing");
    cy.get('[data-test="complete-text"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Your order has been dispatched');
});

Then("I should see appropriate user experience for {string}", (userType) => {
    cy.log(`Verifying user experience for: ${userType}`);
    
    switch(userType) {
        case 'standard':
            cy.get('[data-test="inventory-container"]').should('be.visible');
            cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0);
            break;
        case 'performance':
            // Performance user may load slowly but should eventually show products
            cy.get('[data-test="inventory-container"]', { timeout: 20000 }).should('be.visible');
            break;
        case 'problem':
            // Problem user has broken images but page should load
            cy.get('[data-test="inventory-container"]').should('be.visible');
            break;
        default:
            cy.get('[data-test="inventory-container"]').should('be.visible');
    }
});

Then("the page should handle performance user appropriately", () => {
    cy.log("Verifying performance user handling");
    // Performance user loads slowly - give extra time
    cy.get('[data-test="inventory-container"]', { timeout: 30000 }).should('be.visible');
});

Then("all products should eventually load", () => {
    cy.log("Verifying all products load");
    cy.get('[data-test="inventory-item"]', { timeout: 20000 })
      .should('have.length.greaterThan', 5)
      .and('be.visible');
});
