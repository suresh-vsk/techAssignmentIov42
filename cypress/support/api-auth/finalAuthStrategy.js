/**
 * Final Authentication Strategy for SauceDemo
 * 
 * REALITY: SauceDemo is a React SPA that does NOT support API authentication.
 * SOLUTION: Optimized form-based authentication that mimics API behavior.
 * 
 * This provides:
 * - Fast programmatic authentication (not true API, but optimized form submission)
 * - Session persistence using Cypress sessions
 * - Clean test interface that looks like API authentication
 * - Reliable navigation handling for React SPA
 */

/**
 * Fast Authentication Strategy - Optimized Form Submission
 * This is the closest we can get to "API authentication" with SauceDemo
 */
Cypress.Commands.add('fastApiAuth', (username, password = 'secret_sauce') => {
    cy.session([username, password, 'fast-auth'], () => {
        cy.log(`Fast authentication for: ${username}`);
        
        // Visit the site
        cy.visit('https://www.saucedemo.com/', { failOnStatusCode: false });
        
        // Fast form submission without delays
        cy.get('#user-name', { timeout: 10000 }).type(username, { delay: 0 });
        cy.get('#password', { timeout: 10000 }).type(password, { delay: 0 });
        cy.get('#login-button').click();
        
        // Wait for React to complete authentication and navigation
        cy.get('[data-test="inventory-container"]', { timeout: 15000 }).should('be.visible');
        
        cy.log(`Fast authentication completed for: ${username}`);
    }, {
        validate: () => {
            // Simple validation: try to access inventory
            cy.visit('https://www.saucedemo.com/?/inventory.html', { failOnStatusCode: false });
            cy.get('[data-test="inventory-container"]', { timeout: 8000 }).should('be.visible');
        }
    });
});

/**
 * Direct Page Navigation - React SPA Aware
 */
Cypress.Commands.add('goToInventory', () => {
    cy.log("Navigate to inventory");
    cy.visit('https://www.saucedemo.com/?/inventory.html', { failOnStatusCode: false });
    cy.get('[data-test="inventory-container"]', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('goToCart', () => {
    cy.log("Navigate to cart");
    cy.get('[data-test="shopping-cart-link"]', { timeout: 10000 }).click();
    cy.get('[data-test="cart-list"]', { timeout: 10000 }).should('be.visible');
});

/**
 * Product Actions - Optimized for Speed
 */
Cypress.Commands.add('addProductToCart', (productId = 'sauce-labs-backpack') => {
    cy.log(`Adding ${productId} to cart`);
    cy.get(`[data-test="add-to-cart-${productId}"]`, { timeout: 10000 }).click();
    // Verify cart badge updates
    cy.get('[data-test="shopping-cart-badge"]', { timeout: 5000 }).should('be.visible');
});

Cypress.Commands.add('removeProductFromCart', (productId = 'sauce-labs-backpack') => {
    cy.log(`Removing ${productId} from cart`);
    cy.get(`[data-test="remove-${productId}"]`, { timeout: 10000 }).click();
});

/**
 * Checkout Actions - Complete E2E Flow
 */
Cypress.Commands.add('proceedToCheckout', (userInfo = {}) => {
    cy.log("Proceeding to checkout");
    
    const defaultInfo = {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345'
    };
    
    const info = { ...defaultInfo, ...userInfo };
    
    cy.get('[data-test="checkout"]', { timeout: 10000 }).click();
    
    // Fill checkout information
    cy.get('[data-test="firstName"]', { timeout: 10000 }).type(info.firstName);
    cy.get('[data-test="lastName"]', { timeout: 10000 }).type(info.lastName);
    cy.get('[data-test="postalCode"]', { timeout: 10000 }).type(info.postalCode);
    cy.get('[data-test="continue"]').click();
    
    // Verify checkout overview
    cy.get('[data-test="checkout-summary-container"]', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('completeOrder', () => {
    cy.log("Completing order");
    cy.get('[data-test="finish"]', { timeout: 10000 }).click();
    cy.get('[data-test="complete-header"]', { timeout: 10000 }).should('contain', 'Thank you for your order!');
});

/**
 * Multi-User Authentication Support
 */
const USERS = {
    standard: 'standard_user',
    locked: 'locked_out_user', 
    problem: 'problem_user',
    performance: 'performance_glitch_user',
    error: 'error_user',
    visual: 'visual_user'
};

Cypress.Commands.add('authAs', (userType) => {
    const username = USERS[userType] || userType;
    cy.fastApiAuth(username);
});
