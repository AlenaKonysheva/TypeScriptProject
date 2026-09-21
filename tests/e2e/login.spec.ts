import { test, expect } from '@playwright/test';

test.describe('SauceDemo login', () => {
test.beforeEach(async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
  });

test('standard user can log in successfully', async ({ page }) => {
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();

await expect(page).toHaveURL(/inventory\.html/);
await expect(page.locator('.title')).toHaveText('Products');
});

test('locked out user sees an error message', async ({ page }) => {
await page.locator('#user-name').fill('locked_out_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();

await expect(page.locator('[data-test="error"]')).toContainText(
'Sorry, this user has been locked out'
);
});
});