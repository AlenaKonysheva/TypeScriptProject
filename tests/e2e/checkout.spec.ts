import { test, expect } from '../../src/fixtures/pages';

test.describe('Checkout flow', () => {
test.beforeEach(async ({ loginPage, inventoryPage }) => {
await loginPage.goto();
await loginPage.login('standard_user', 'secret_sauce');
await inventoryPage.expectLoaded();
});

test('completes full checkout with one item', async ({
inventoryPage,
cartPage,
checkoutPage,
}) => {
await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
await inventoryPage.expectCartCount(1);

await inventoryPage.goToCart();
await cartPage.expectLoaded();
await cartPage.expectItemCount(1);
await cartPage.expectItemInCart('Sauce Labs Backpack');

await cartPage.proceedToCheckout();
await checkoutPage.fillCustomerInfo('Alena', 'Konysheva', '3011AA');
await checkoutPage.continue();
await checkoutPage.finish();
await checkoutPage.expectOrderComplete();
});

test('shows validation error on empty customer info', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
await inventoryPage.addItemToCartByName('Sauce Labs Bolt T-Shirt');
await inventoryPage.goToCart();
await cartPage.proceedToCheckout();

await checkoutPage.continue();

await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
});
});