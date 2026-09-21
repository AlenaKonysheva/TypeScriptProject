import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
private readonly cartItems = this.page.locator('.cart_item');
private readonly checkoutButton = this.page.locator('[data-test="checkout"]');
private readonly continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');

async expectLoaded(): Promise<void> {
await expect(this.page).toHaveURL(/cart\.html/);
}

async expectItemCount(count: number): Promise<void> {
await expect(this.cartItems).toHaveCount(count);
}

async expectItemInCart(itemName: string): Promise<void> {
await expect(this.cartItems.filter({ hasText: itemName })).toBeVisible();
}

async proceedToCheckout(): Promise<void> {
await this.checkoutButton.click();
}

async continueShopping(): Promise<void> {
await this.continueShoppingButton.click();
}
}