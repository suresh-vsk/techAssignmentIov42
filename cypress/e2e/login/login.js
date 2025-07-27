import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pages/loginPage";

Given("I open the login page", () => {
    loginPage.visit()
});

When("I enter username {string} and password {string}", (username, password) => {
    loginPage.enterUsername(username)
    loginPage.enterPassword(password)
});

When("I click the login button", () => {
    loginPage.clickSubmit()
});

Then("I should see the homepage", () => {
    cy.url().should('not.eq', loginPage.url)
});

Then("I should see a login error with {string}", (errorMessage) => {
    cy.get(loginPage.errorBox).should('be.visible');
    cy.get(loginPage.errorBox).should('have.text', errorMessage);
});

