class cartPage {
    // Cart page elements
    cartContainer = '[data-test="cart-list"]'
    cartItem = '[data-test="cart-item"]'
    removeButton = '[data-test^="remove-"]'
    checkoutButton = '[data-test="checkout"]'
    continueShoppingButton = '[data-test="continue-shopping"]'
    cartBadge = '[data-test="shopping-cart-badge"]'
    shoppingCartLink = '[data-test="shopping-cart-link"]'

    // Checkout form elements
    firstNameInput = '[data-test="firstName"]'
    lastNameInput = '[data-test="lastName"]'
    postalCodeInput = '[data-test="postalCode"]'
    continueButton = '[data-test="continue"]'
    finishButton = '[data-test="finish"]'
    cancelButton = '[data-test="cancel"]'
    
    // Error and confirmation elements
    errorMessage = '[data-test="error"]'
    orderConfirmation = '[data-test="complete-header"]'
    orderCompleteContainer = '[data-test="checkout-complete-container"]'

    // URLs
    cartUrl = 'https://www.saucedemo.com/cart.html'
    checkoutUrl = 'https://www.saucedemo.com/checkout-step-one.html'
    checkoutStepTwoUrl = 'https://www.saucedemo.com/checkout-step-two.html'
    checkoutCompleteUrl = 'https://www.saucedemo.com/checkout-complete.html'

    // Navigation methods
    goToCart() {
        cy.get(this.shoppingCartLink).click();
        cy.url().should('include', 'cart.html');
    }

    tryToGoToCart() {
        // For security tests - attempt to go to cart but don't assert success
        cy.get(this.shoppingCartLink).click();
        // Don't assert URL here - let the test step handle the assertion
    }

    proceedToCheckout() {
        cy.get(this.checkoutButton).click();
        cy.url().should('include', 'checkout-step-one.html');
    }

    // Form filling methods
    fillCheckoutInformation(firstName, lastName, postalCode) {
        // Wait for form to be visible
        cy.get('[data-test="checkout-info-container"]').should('be.visible');
        
        // Helper function to fill field if value is provided
        const fillField = (selector, value, fieldName) => {
            if (value) {
                cy.get(selector)
                    .should('be.visible')
                    .clear()
                    .type(value, { delay: 50 })
                    .should('have.value', value);
                cy.log(`Filled ${fieldName} with: ${value}`);
            }
        };
        
        // Fill all fields
        fillField('[data-test="firstName"]', firstName, 'firstName');
        fillField('[data-test="lastName"]', lastName, 'lastName');
        fillField('[data-test="postalCode"]', postalCode, 'postalCode');
    }

    clickContinueCheckout() {
        cy.get(this.continueButton).click();
    }

    finishCheckout() {
        cy.get(this.finishButton).click();
    }

    // Utility methods
    removeProductFromCart(productIndex = 0) {
        cy.get(this.removeButton).eq(productIndex).click();
    }

    getCartItemCount() {
        return cy.get(this.cartItem).its('length');
    }

    verifyCartIsEmpty() {
        cy.get(this.cartContainer).should('not.contain', this.cartItem);
    }
}

export default new cartPage();
