import {test, expect} from '@playwright/test'

test("Verify login functionality", async({page})=>{
await page.goto('file:///C:/Users/aswini.j/Downloads/locatorPractice_0913%20(1).html')
// await page.getByRole('button', {name: 'Save'}).nth(0).click()
//first,last, nth - index starts with 0
// //button, a- link, textbox, checkbox, h1 to h6 - heading, combobox, dialog
// await expect(page.getByText("Try: getByRole('button', { name: 'Save' }) (will match 2) → use first/last/nth", {exact:true})).toBeVisible()
//wait expect(locatior).toBevisible()
// await page.getByLabel('Email Address').fill("test@gmail.com")
//getByPlaceholder(placeholder value)
// await page.getByPlaceholder('Enter password').fill("Password")
//getByAltText(alt attribute value)
// await expect(page.getByAltText('Company Logo')).toBeVisible()
//getByTestId(data-TestId attribute value)
// await page.getByTestId('submit-form').click()
//getByTitle(title attribute value)
// await page.getByTitle("This is the company logo").click()
await page.locator('[class="card"]').nth(1).getByText('Price: $20').click()
await page.locator('[class="card"]').filter({hasText:'Price: $30'}).click()

})