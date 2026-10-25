import { test, expect } from '@playwright/test'

test('handling tables and pagination', async ({ page }) => {
    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')
    await expect(page.getByRole('heading', { name: 'Large Data Table' })).toBeVisible();
    const rowCount = await page.locator('tbody tr').count()
    console.log("row count => " + rowCount)
    const firstRow = await page.locator('tbody tr').first().allInnerTexts()
    //last(), nth(1), nth(2)
    console.log("first row content => " + firstRow)
})