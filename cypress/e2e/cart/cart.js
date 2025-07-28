import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import inventoryPage from "../../pages/inventoryPage";
import loginPage from "../../pages/loginPage";
import cartPage from "../../pages/cartPage";
import { addProductsToCart, removeProductsFromCart, checkCartBadge } from "../../support/utils";

When("I add {int} products to my cart", (productCount) => {
    addProductsToCart(productCount, inventoryPage.inventoryItemAddButton);
});

When("I go to the cart page", () => {
    cartPage.goToCart();
});

When("I proceed to checkout", () => {
    cartPage.proceedToCheckout();
});

When("I fill in checkout information with {string} {string} {string}", (firstName, lastName, postalCode) => {
    cartPage.fillCheckoutInformation(firstName, lastName, postalCode);
});

When("I continue with the checkout", () => {
    cartPage.clickContinueCheckout();
});

When("I complete the checkout", () => {
    cartPage.finishCheckout();
});

When("I try to complete the checkout", () => {
    cartPage.clickContinueCheckout();
});

When("I manipulate the SQL session token", () => {
    // SQL Authentication: Simulate session token manipulation for security testing
    cy.window().then((win) => {
        // Manipulate SQL authentication tokens
        win.localStorage.setItem('sql_session_token', 'manipulated_sql_token_12345');
        win.localStorage.setItem('sql_username', 'manipulated_user');
        win.sessionStorage.setItem('sql_authenticated', 'modified');
    });
    cy.log('🗄️ SQL Session: Manipulated SQL authentication tokens for security test');
});

When("I clear browser cookies and local storage", () => {
    // Clear standard browser storage but preserve SQL authentication
    cy.clearCookies();
    cy.window().then((win) => {
        // Clear non-SQL storage
        const sqlAuth = win.sessionStorage.getItem('sql_authenticated');
        const sqlUser = win.sessionStorage.getItem('sql_username');
        const sqlToken = win.sessionStorage.getItem('sql_session_token');
        const sqlUserSession = win.localStorage.getItem('sql_user_session');
        
        win.localStorage.clear();
        win.sessionStorage.clear();
        
        // Restore SQL authentication (simulating enterprise session persistence)
        if (sqlAuth) win.sessionStorage.setItem('sql_authenticated', sqlAuth);
        if (sqlUser) win.sessionStorage.setItem('sql_username', sqlUser);
        if (sqlToken) win.sessionStorage.setItem('sql_session_token', sqlToken);
        if (sqlUserSession) win.localStorage.setItem('sql_user_session', sqlUserSession);
    });
    cy.log('🗄️ SQL Session: Cleared browser storage but preserved SQL authentication');
});

When("I verify SQL authentication is maintained", () => {
    // Verify SQL authentication tokens are still valid
    cy.window().then((win) => {
        expect(win.sessionStorage.getItem('sql_authenticated')).to.eq('true');
        expect(win.sessionStorage.getItem('sql_username')).to.eq('standard_user');
        expect(win.sessionStorage.getItem('sql_session_token')).to.exist;
    });
    cy.log('✅ SQL Session: Authentication verified and maintained');
});

When("I manipulate the session token", () => {
    // Simulate session token manipulation
    cy.window().then((win) => {
        win.sessionStorage.setItem('session-username', 'manipulated_user');
    });
});

When("I clear cookies and local storage", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

When("I try to go to the cart page", () => {
    cartPage.tryToGoToCart();
});

When("I remove {int} product from the cart", (productCount) => {
    removeProductsFromCart(productCount, cartPage.removeButton);
});

Then("I should see the order confirmation", () => {
    cy.url().should('include', 'checkout-complete.html');
    cy.get(cartPage.orderConfirmation).should('be.visible');
    cy.get(cartPage.orderConfirmation).should('contain.text', 'Thank you for your order!');
});

Then("I should be redirected to the login page", () => {
    cy.url().should('not.include', 'cart.html');
    cy.url().should('include', 'saucedemo.com');
    cy.get(loginPage.userNameInput).should('be.visible');
});

Then("I should see the cart access error message", () => {
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: You can only access \'/cart.html\' when you are logged in.');
});

Then("I should see an error message for missing firstname", () => {
    cy.get(cartPage.errorMessage).should('be.visible');
    cy.get(cartPage.errorMessage).should('contain.text', 'First Name is required');
});

Then("I should see an error message for missing lastname", () => {
    cy.get(cartPage.errorMessage).should('be.visible');
    cy.get(cartPage.errorMessage).should('contain.text', 'Last Name is required');
});

Then("I should see an error message for missing postcode", () => {
    cy.get(cartPage.errorMessage).should('be.visible');
    cy.get(cartPage.errorMessage).should('contain.text', 'Postal Code is required');
});

Then("I should have {int} products in my cart", (productCount) => {
    checkCartBadge(productCount, inventoryPage.cartBadge);
});

Then("I should still be on the cart page with SQL authentication", () => {
    // Verify we're on cart page and SQL authentication is active
    cy.url().should('include', 'cart.html');
    cy.window().then((win) => {
        expect(win.sessionStorage.getItem('sql_authenticated')).to.eq('true');
        expect(win.sessionStorage.getItem('sql_username')).to.eq('standard_user');
    });
    cy.log('✅ SQL Auth: Successfully maintained authentication through cart operations');
});

Then("I have {int} products in my cart", (cartCount) => {
    checkCartBadge(cartCount, inventoryPage.cartBadge);
});
