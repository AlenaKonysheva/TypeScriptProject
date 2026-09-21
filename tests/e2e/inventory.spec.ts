import { test, expect } from '../../src/fixtures/pages';

test.describe('Inventory sorting and cart', () => {
test.beforeEach(async ({ loginPage, inventoryPage }) => {
await loginPage.goto();
await loginPage.login('standard_user', 'secret_sauce');
await inventoryPage.expectLoaded();
});

test('sorts products by name Z to A', async ({ inventoryPage }) => {
await inventoryPage.sortBy('za');
const names = await inventoryPage.getItemNames();
const sorted = [...names].sort().reverse();
expect(names).toEqual(sorted);
});

test('sorts products by price low to high', async ({ inventoryPage }) => {
await inventoryPage.sortBy('lohi');
const prices = await inventoryPage.getItemPrices();
const sorted = [...prices].sort((a, b) => a - b);
expect(prices).toEqual(sorted);
});

test('adds and removes item from cart', async ({ inventoryPage }) => {
await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
await inventoryPage.expectCartCount(1);

await inventoryPage.removeItemFromCartByName('Sauce Labs Backpack');
await expect(inventoryPage['cartBadge']).not.toBeVisible();
});
});