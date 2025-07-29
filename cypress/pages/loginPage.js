class loginPage {
    loginContainer = '[data-test="login-container"]';
    userNameInput = '[id="user-name"]';
    passwordInput = '[id="password"]';
    submitButton = '[id="login-button"]';
    errorBox = '[data-test="error"]';

    visit() {
        cy.visit('/')
        cy.get(this.loginContainer).should('be.visible');
    }

    enterUsername(username) {
        if (username && username !== '<EMPTY>') {
            cy.get(this.userNameInput).type(username);
        }
        // If username is empty or marked as <EMPTY>, just clear the field (for testing empty validation)
        else {
            cy.get(this.userNameInput).clear();
        }
    }

    enterPassword(password) {
        if (password && password !== '<EMPTY>') {
            cy.get(this.passwordInput).type(password);
        }
        // If password is empty or marked as <EMPTY>, just clear the field (for testing empty validation)
        else {
            cy.get(this.passwordInput).clear();
        }
    }

    clickSubmit() {
        cy.get(this.submitButton).click();
    }

}

export default new loginPage();