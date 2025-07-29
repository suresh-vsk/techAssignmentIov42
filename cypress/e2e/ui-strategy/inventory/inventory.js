import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import inventoryPage from "../../../pages/inventoryPage";
import loginPage from "../../../pages/loginPage";
import { addProductsToCart, removeProductsFromCart, waitForPageReady } from "../../../support/utils";

Given("I am on the products page as {string}", (username) => {
    loginPage.visit()
    loginPage.enterUsername(username)
    loginPage.enterPassword("secret_sauce")
    loginPage.clickSubmit()
    cy.url().should('include', 'inventory.html')
    // Wait for the inventory page to fully load
    cy.get(inventoryPage.inventoryItem).should('be.visible')
});

When("I sort products by {string}", (sortingOption) => {
    waitForPageReady(inventoryPage.inventoryItem);
    inventoryPage.selectSortOption(sortingOption);
});

When("I add {int} product to my cart", (productCount) => {
    addProductsToCart(productCount, inventoryPage.inventoryItemAddButton);
});

When("I can remove {int} product from my cart", (productCount) => {
    removeProductsFromCart(productCount, inventoryPage.inventoryItemRemoveButton);
});

Then("All products are loaded correctly", () => {
    cy.get(inventoryPage.inventoryItem).should("have.length", inventoryPage.productCount).each(($product) => {
        cy.wrap($product).within(() => {
            cy.get(inventoryPage.inventoryItemName).should("be.visible");
            cy.get(inventoryPage.inventoryItemAddButton).should("be.visible");
            cy.get(inventoryPage.inventoryItemPrice).should("be.visible");
        });
    });
});

Then("The products are sorted by {string}", (sortingOption) => {
    const sortingConfig = {
        "Price (low to high)": { selector: inventoryPage.inventoryItemPrice, type: 'price', order: 'asc' },
        "Price (high to low)": { selector: inventoryPage.inventoryItemPrice, type: 'price', order: 'desc' },
        "Name (A to Z)": { selector: inventoryPage.inventoryItemName, type: 'text', order: 'asc' },
        "Name (Z to A)": { selector: inventoryPage.inventoryItemName, type: 'text', order: 'desc' }
    };

    const config = sortingConfig[sortingOption];
    cy.get(config.selector).then(($elements) => {
        const values = [...$elements].map(el => 
            config.type === 'price' ? parseFloat(el.innerText.replace('$', '')) : el.innerText
        );
        
        const sortedValues = config.type === 'price' 
            ? [...values].sort((a, b) => config.order === 'asc' ? a - b : b - a)
            : config.order === 'asc' ? [...values].sort() : [...values].sort().reverse();
        
        expect(values).to.deep.equal(sortedValues);
    });
});

Then("I have {int} product in my cart", (cartCount) => {
    if (cartCount === 0) {
        cy.get(inventoryPage.cartBadge).should('not.exist');
    } else {
        cy.get(inventoryPage.cartBadge).should('contain.text', cartCount.toString());
    }
});


