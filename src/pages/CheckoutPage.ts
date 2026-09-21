import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
private readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
private readonly continueButton = this.page.locator('[data-test="continue"]');
private readonly finishButton = this.page.locator('[data-test="finish"]');
private readonly completeHeader = this.page.locator('.complete-header');

async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
await this.firstNameInput.fill(firstName);
await this.lastNameInput.fill(lastName);
await this.postalCodeInput.fill(postalCode);
}

async continue(): Promise<void> {
await this.continueButton.click();
}

async finish(): Promise<void> {
await this.finishButton.click();
}

async expectOrderComplete(): Promise<void> {
await expect(this.completeHeader).toHaveText('Thank you for your order!');
}
}