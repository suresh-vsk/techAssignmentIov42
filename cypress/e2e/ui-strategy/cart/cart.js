import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import inventoryPage from "../../../pages/inventoryPage";
import loginPage from "../../../pages/loginPage";
import cartPage from "../../../pages/cartPage";
import { addProductsToCart, removeProductsFromCart, checkCartBadge } from "../../../support/utils";

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

Then("I have {int} products in my cart", (cartCount) => {
    checkCartBadge(cartCount, inventoryPage.cartBadge);
});
