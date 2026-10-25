import { test, expect, chromium } from '@playwright/test'




test.describe('sandbox - advanced', () => {
    //select/ option

    test("Verify bootstrap dropdown option selction ", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByTestId('bootstrap-dropdown-trigger').click()
        await page.getByText('Weekday Batch').click()
        await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()
    })
    test("Verify handle alert dialog ", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.once('dialog', async dialog => {
            const text = await dialog.message()
            console.log(text)
            await dialog.accept()
        })
        await page.getByTestId('alert-btn').click()


        await page.once('dialog', async dialog => {
            const text = await dialog.message()
            console.log(text)
            await dialog.dismiss()
        })
        await page.getByTestId('confirm-btn').click()
        await expect(page.getByText('Confirm dismissed.')).toBeVisible()

        await page.once('dialog', async dialog => {
            const text = await dialog.message()
            console.log(text)
            await dialog.accept('Batch-07')
        })
        await page.getByTestId('prompt-btn').click()
        await expect(page.getByText('Prompt value: Batch-07')).toBeVisible()

    })


    test("Handle new tab", async () => {
        // browser => context = > tab
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        // let marks = [1,2,3]
        // let [a,b, c] = marks
        const [newPage] = await Promise.all([context.waitForEvent('page'), page.getByTestId('popup-link').click()])
        //waitforevent - wait for new tab to open
        // page.getByTestId('popup-link').click() - click link wich open new tab
        //Promise.all([]) => runs listener + action at same time , must be together , else playwright miss new tab
        //const [newPage]  => Promise.all gives [newPageObject, undefined]
        await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()
        await newPage.close()
    })


    test("Handle new tab direct click blcoked", async () => {
        // browser => context = > page
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()
        const newPage = await context.newPage()
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        const link = await page.getByText('Open popup tab (right click only)').getAttribute('href')
        console.log(link)
        const baseUrl = "https://playwright-mastery-academy-app.vercel.app"
        await newPage.goto(`${baseUrl}${link} `)
        await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()
    })

    test("isolated context", async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toBeVisible();

        const context1 = await browser.newContext()
        const page1 = await context1.newPage()
        await page1.goto('https://www.saucedemo.com/');
        await page1.locator('[data-test="username"]').fill('visual_user');
        await page1.locator('[data-test="password"]').fill('secret_sauce');
        await page1.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toBeVisible();

        const cookie = await page.context().cookies()
        console.log(cookie)
        const cookie1 = await page1.context().cookies()
        console.log(cookie1)
    })

    test("handling drag and drop", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByTestId('drag-source').dragTo(page.getByTestId('drop-target'))
        await expect(page.getByText('Drop completed successfully.')).toBeVisible()
    })

    test("file upload", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByTestId('file-upload-input').setInputFiles('test-data/test.txt')
        await expect(page.getByText('test.txt uploaded successfully.')).toBeVisible()
    })

    test("multiple file upload", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByTestId('multi-file-upload-input').setInputFiles(['test-data/test.txt', 'test-data/customer.csv', 'test-data/resume.pdf'])
        await expect(page.getByText('3 files uploaded: test.txt, customer.csv, resume.pdf.')).toBeVisible()
    })
    test("file download", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-pdf-btn').click()])
        const fileName = download.suggestedFilename()
        console.log(fileName)
        await download.saveAs(`downloads/${fileName}`)
    })


    test("iframe handling", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        const frame = page.frameLocator('#practice-iframe')
        await frame.locator('#frame-input').fill('Batch-07')
        await frame.locator('#frame-save').click()
        await expect(frame.getByText('Result: Batch-07 saved')).toBeVisible()
    })
    //shadow-host
    test("shadow DOM handling", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        const shadowHost = page.getByTestId('shadow-host')
        await shadowHost.locator('#shadow-input').fill('Batch123')
        await shadowHost.locator('#shadow-save').click()
        await expect(shadowHost.getByText('Result: Batch123 saved')).toBeVisible()
    })

    test("practice and interview dates", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByTestId('practice-date-picker').type('01-11-2025')
        await expect(page.getByText('Practice Date Selected: 2025-01-11')).toBeVisible()
    })


    test('wait commands', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        // await page.getByTestId('wait-navigation-link').click()
        // await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')
        // await expect(page.getByText('Popup Opened Successfully')).toBeVisible()
        // await page.goBack()

        // //wait-response-btn
        // await page.getByTestId('wait-response-btn').click()
        // await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')
        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()

        // //waitFor
        // await page.getByTestId('wait-response-btn').click()
        // await page.getByText('Trigger API Response Completed').waitFor({ state: 'visible' })
        // //visible, hidden, attached, detached
        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


        // //waitForSelector
        // await page.getByTestId('wait-response-btn').click()
        // await page.waitForSelector('text=Trigger API Response Completed', { state: 'visible' })
        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()

        // await page.getByTestId('wait-loadstate-practice-load-btn').click()
        // await page.waitForLoadState('load')
        // await expect(page.getByText('Test load State: Completed')).toBeVisible()


        // await page.getByTestId('wait-loadstate-practice-dom-btn').click()
        // await page.waitForLoadState('domcontentloaded')
        // await expect(page.getByText('Test DOMContentLoaded State: ')).toBeVisible()
        await page.getByTestId('wait-loadstate-practice-networkidle-btn').click()
        await page.waitForLoadState('networkidle')
        await expect(page.getByTestId('wait-result-networkidle')).toBeVisible()
        await page.reload()
    })



    test("mouse actions", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByTestId('mouse-downup-target').hover()
        await page.mouse.down()
        await expect(page.getByText('Mouse down detected.')).toBeVisible()
        await page.mouse.up()
        await expect(page.getByText('Mouse down + up detected.')).toBeVisible()
        await page.getByTestId('mouse-wheel-target').hover()
        await page.mouse.wheel(0, 300)
        await expect(page.getByText('Mouse wheel scrolled down.')).toBeAttached()

        await page.getByTestId('mouse-rightclick-target').click({ button: 'right' })
        await expect(page.getByText('Right click detected on target.')).toBeVisible()
    })


    test("screenshot", async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await page.getByText('Drag and Drop + File Upload/Download').screenshot({ path: 'screenshots/drag-drop.png' })
        await page.screenshot({ path: 'screenshots/full-page.png', fullPage: true })
    })

    test('assertions', async ({ page }) => {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await expect(page).toHaveTitle('Playwright Mastery Academy')
        await expect(page).toHaveURL('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        /*
        retrying/ non retrying assertions
toBeVisible()
toBeHidden()
toBeEnabled()
toBeDisabled()
toBeEditble()
toBeChecked()
toBeUnchecked()
toBeFocused()   


test match
//complete text
locator.toContainText('text')
locator.toHaveText('complete text')
locator.toHaveValue('value')
locator.toHaveAttribute('attribute', 'value')
locator.toHaveClass('className')
locator.toHaveCount()



non retrying assertions


      */ 
    })
    const number = 6
expect(number).toBe(6)
expect(number).not.toBe(5)
expect(number).toBeGreaterThan(5)
expect(number).toBeGreaterThanOrEqual(6)
expect(number).toBeLessThan(7)
expect(number).toBeLessThanOrEqual(6)
expect(number).toEqual(6)
expect(number).not.toEqual(5)
expect(number).toStrictEqual(6)
expect(number).not.toStrictEqual(5) 



let a = true
expect(a).toBeTruthy() 
expect(a).not.toBeFalsy()

let b = null
expect(b).toBeNull()

let c = undefined
expect(c).toBeUndefined()


let d = [3,2,1,3,1,]
expect(d).toContain(1)
    })

