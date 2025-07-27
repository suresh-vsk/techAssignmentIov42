// Shared utility functions for test automation

/**
 * Add multiple products to cart
 * @param {number} count - Number of products to add
 * @param {string} addButtonSelector - Selector for add buttons
 */
export const addProductsToCart = (count, addButtonSelector) => {
    for (let i = 0; i < count; i++) {
        cy.get(addButtonSelector).eq(i).click();
    }
};

/**
 * Remove multiple products from cart
 * @param {number} count - Number of products to remove
 * @param {string} removeButtonSelector - Selector for remove buttons
 */
export const removeProductsFromCart = (count, removeButtonSelector) => {
    for (let i = 0; i < count; i++) {
        cy.get(removeButtonSelector).eq(i).click();
    }
};

/**
 * Check cart badge count
 * @param {number} expectedCount - Expected number in cart badge
 * @param {string} cartBadgeSelector - Selector for cart badge
 */
export const checkCartBadge = (expectedCount, cartBadgeSelector) => {
    if (expectedCount === 0) {
        cy.get(cartBadgeSelector).should('not.exist');
    } else {
        cy.get(cartBadgeSelector).should('contain.text', expectedCount.toString());
    }
};

/**
 * Wait for page to be ready
 * @param {string} selector - Selector to wait for
 */
export const waitForPageReady = (selector) => {
    cy.get(selector).should('be.visible');
};
