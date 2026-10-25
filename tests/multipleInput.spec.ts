import { test, expect } from '@playwright/test';



const users = [{ username: 'standard_user', password: 'secret_sauce', expectedText: 'Sauce Labs Backpack' },
{ username: 'problem_user', password: 'secret_sauce', expectedText: 'Sauce Labs Bike Light' }]

test('Multiple input', async ({ page }) => {

let fruits = ["apple", "orange"]
for(let fruit of fruits){
    console.log(fruit)
}
let person = {name:"sara"}
console.log(person.name)

    for (const user of users) {
        //{ username: 'standard_user', password: 'secret_sauce', expectedText: 'Sauce Labs Backpack' }
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill(user.username);
        await page.locator('[data-test="password"]').fill(user.password);
        await page.locator('[data-test="login-button"]').click();
        await page.waitForURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText(user.expectedText)).toBeVisible()
    }

}



)