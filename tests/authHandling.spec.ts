import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test';



test.describe("Authentication handling to skip multiple login attempts",async () => {
let browser: Browser
let context:BrowserContext
let page:Page

test.beforeAll(async ({ browser }) => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    await context.storageState({ path: 'state.json' });
    await context.close();
})
test.beforeEach(async()=>{
     browser = await chromium.launch()
    context = await browser.newContext({storageState: 'state.json'})
    page = await context.newPage()
    await page.goto('https://www.saucedemo.com/inventory.html')
})
test.afterEach(async()=>{
await context.close()
await browser.close()
})
test('Login with saved state', async () => { 
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})
test('Login with saved state 1', async () => { 
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})
})
