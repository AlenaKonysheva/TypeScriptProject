import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
private readonly title = this.page.locator('.title');
private readonly sortDropdown = this.page.locator('[data-test="product-sort-container"]');
private readonly inventoryItems = this.page.locator('.inventory_item');
private readonly itemNames = this.page.locator('.inventory_item_name');
private readonly itemPrices = this.page.locator('.inventory_item_price');
private readonly cartBadge = this.page.locator('.shopping_cart_badge');
private readonly cartLink = this.page.locator('.shopping_cart_link');

async expectLoaded(): Promise<void> {
await expect(this.title).toHaveText('Products');
}

async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
await this.sortDropdown.selectOption(option);
}

async getItemNames(): Promise<string[]> {
return this.itemNames.allTextContents();
}

async getItemPrices(): Promise<number[]> {
const prices = await this.itemPrices.allTextContents();
return prices.map((p) => parseFloat(p.replace('$', '')));
}

async addItemToCartByName(itemName: string): Promise<void> {
const item = this.inventoryItems.filter({ hasText: itemName });
await item.getByRole('button', { name: 'Add to cart' }).click();
}

async removeItemFromCartByName(itemName: string): Promise<void> {
const item = this.inventoryItems.filter({ hasText: itemName });
await item.getByRole('button', { name: 'Remove' }).click();
}

async expectCartCount(count: number): Promise<void> {
await expect(this.cartBadge).toHaveText(String(count));
}

async goToCart(): Promise<void> {
await this.cartLink.click();
}
}