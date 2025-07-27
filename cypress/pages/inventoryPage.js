class inventoryPage {
    url = 'https://www.saucedemo.com/inventory.html'
    productCount = 6

    inventoryItem = '[data-test="inventory-item"]'
    inventoryItemName = '[data-test="inventory-item-name"]'
    inventoryItemPrice = '[data-test="inventory-item-price"]'
    inventoryItemAddButton = '[class="btn btn_primary btn_small btn_inventory "]'
    inventoryItemRemoveButton = '[class*="btn_secondary btn_small btn_inventory"]'
    sortDropdown = '.product_sort_container'
    cartBadge = '[data-test="shopping-cart-badge"]'

    selectSortOption(option) {
        cy.get(this.sortDropdown).select(option);
    }

}

export default new inventoryPage();