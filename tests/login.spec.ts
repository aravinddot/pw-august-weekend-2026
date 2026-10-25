import {test, expect} from '@playwright/test'




test.describe('login functionality', ()=>{
test("Verify login functionality", async({page})=>{
await page.goto(process.env.BASE_URL!)
await page.locator('.submit-button.btn_action').click()
})
// browser => context => page

test("Verify login functionality 1", async({page})=>{
await page.goto("https://www.saucedemo.com/")
})

test("Verify login functionality 2", async({page})=>{
await page.goto("https://www.saucedemo.com/")
})

test("Verify login functionality 3", async({page})=>{
await page.goto("https://www.saucedemo.com/")
})



test("test case name", async()=>{

})
test("Verify login functionality1", async({page})=>{
await page.goto(process.env.BASE_URL!)
await page.locator('.submit-button.btn_action').click()
})
// browser => context => page

test("Verify login functionality2", async({page})=>{
await page.goto("https://www.saucedemo.com/")
})

test("Verify login functionality3", async({page})=>{
await page.goto("https://www.saucedemo.com/")
})

test("Verify login functionality4", async({page})=>{
await page.goto("https://www.saucedemo.com/")
})



test("test case name5", async()=>{

})
})