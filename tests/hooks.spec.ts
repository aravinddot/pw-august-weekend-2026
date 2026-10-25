import { test, expect } from '@playwright/test'

test.describe('Hooks', () => {

    test.afterAll(async () => {
        console.log("after all executed")
    })
    
    test.afterEach(async () => {
        console.log("after each hook executed")
    })


    test("test case 1", async () => {
        console.log("test case 1 executed")
    })

    test("test case 2", async () => {
        console.log("test case 2 executed")
    })
})
