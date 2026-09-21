import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
private readonly usernameInput = this.page.locator('#user-name');
private readonly passwordInput = this.page.locator('#password');
private readonly loginButton = this.page.locator('#login-button');
private readonly errorMessage = this.page.locator('[data-test="error"]');

async goto(): Promise<void> {
await this.navigate('/');
}

async login(username: string, password: string): Promise<void> {
await this.usernameInput.fill(username);
await this.passwordInput.fill(password);
await this.loginButton.click();
}

async expectError(message: string): Promise<void> {
await expect(this.errorMessage).toContainText(message);
}
}