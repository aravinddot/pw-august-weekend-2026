import { test, expect } from '@playwright/test'



///https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic

test.describe('Interactive Playwright Sandbox Basic', () => {

// only, skip, fixme, fail, slow
    test('Click, Double Click, Hover, Tooltip, Static Dropdown @smoke', async ({ page }) => {

        // test.use({
        //     browserName: 'chromium'
        // })
        test.slow() // 30 secs -> 3 times 90 secs
        await page.goto('/practice/sandbox-basic', {timeout: 120000})
        await page.getByTestId('single-click-btn').click({timeout: 120000})
        // await expect(locator).toBeVisible()
        await expect(page.getByText('Single click completed.')).toBeVisible()
        await expect(page.getByTestId('single-click-status')).toContainText('Single click completed.')
        await page.getByTestId('double-click-btn').dblclick()
        await expect(page.getByText('Double click completed.')).toBeVisible()
        await page.getByTestId('hover-btn').hover()
        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()
        await page.getByTestId('tooltip-trigger-btn').hover()
        await expect(page.getByText('Tooltip verified successfully.')).toBeVisible()
        // const toolTipText = await page.getByTestId('hover-tooltip').innerText()
        // console.log(toolTipText)
        await expect(page.getByTestId('hover-tooltip')).toContainText('Tooltip verified', { timeout: 60000 })
        await page.getByTestId('static-practice-select').selectOption('Easy - Basic locator targeting')
        //await expect(page.getByText('Static dropdown selected: Easy123.')).toBeVisible()
    })


    test('Inputs, Checkbox, Radio, Dropdown @reg', async ({ page }) => {

        test.setTimeout(240000) // 240 seconds per test
        await page.goto('/practice/sandbox-basic')

        const name = 'Playwright'
        const mailId = 'info@playwrightmasteryacademy.com'
        const dropdownValue = 'Playwright Core'
        await page.getByTestId('name-input').fill("sara")
        await page.getByPlaceholder('Enter your name').fill("sri")
        // await page.locator('.fgid_719').fill("sara") dynamic class value won't work for this
        await page.getByTestId('name-input').fill(name)
        await page.locator('[type="email"]').fill("test123@gmail.com")
        await page.getByTestId('email-input').fill(mailId)
        await page.getByTestId('track-select').selectOption(dropdownValue)
        await page.getByTestId('remember-checkbox').check()
        await page.locator('[type="checkbox"]').check()
        await page.getByTestId('mode-api-radio').check()
        await page.getByTestId('submit-form-btn').click()

        await expect(page.getByText(`${name} submitted (${mailId}) for ${dropdownValue}.`)).toBeVisible()


    })


    test('Dynamic Waits, Keyboard @reg @smoke', async ({ page }) => {
        await page.goto('/practice/sandbox-basic')

        await page.getByTestId('async-load-btn').click()
        // await page.waitForTimeout(20000)
        await expect(page.getByText('Async result loaded successfully.')).toBeVisible({ timeout: 25000 })

        await page.getByTestId('keyboard-input').fill('playwright')
        await page.getByTestId('keyboard-input').press('Enter')
        await expect(page.getByText('Command submitted: playwright')).toBeVisible()

    })


    test('Text and Attribute Extraction', async ({ page }) => {
        await page.goto('/practice/sandbox-basic')

        //extract only visible text in UI
        // const innerTextvalue = await page.getByTestId('extract-textcontent-target').innerText()

        // console.log("innerTextvalue==>" + innerTextvalue);

        // // extract all texts if it is hidden 
        // const textContentValue = await page.getByTestId('extract-textcontent-target').textContent()

        // console.log("textContentValue==>" + textContentValue);
        // extract inner text
        // const inner = await page.getByTestId('extract-inputvalue-target').innerText()
        // //extract inner text and hidden ttext
        // const text = await page.getByTestId('extract-inputvalue-target').textContent()

        // console.log("inner===>" + inner);
        // console.log("text===>" + text);
        // //extract input value
        // const inputVal = await page.getByTestId('extract-inputvalue-target').inputValue()
        // console.log("inputVal==>" + inputVal);
        // // //extract attribute value
        // const attrValue = await page.getByTestId('extract-attribute-target').getAttribute('class')
        // console.log("attrValue===>" + attrValue);
        // //extract nested tag text content
        // const allInnerText = await page.getByTestId('extract-list-item').allInnerTexts()
        //extract nested tag text content and hidden text
        // const allTextContent = await page.getByTestId('extract-list-item').allTextContents()

        // // console.log("allInnerText===>" + allInnerText);
        // console.log("allTextContent===>" + allTextContent);

        // //extract inner html mvalues 
        // const htmlElement = await page.getByTestId('extract-list').innerHTML()

        // console.log("htmlElement==>" + htmlElement);



    });



    test('element state checks - checked', async ({ page }) => {

        await page.goto('/practice/sandbox-basic')
        // conditional handling

        // isChecked(), isDisabled(), isVisible(), isHidden, isEditable()

        // const remCheckBox = await page.getByTestId('remember-checkbox').isChecked()
        // console.log(remCheckBox)
        const stateCheck = await page.getByTestId('remember-checkbox').isChecked();

        console.log('stateCheck==>' + stateCheck);

        if (stateCheck === false) {
            await page.getByTestId('remember-checkbox').check()
        }


        const stateCheckAfterClicking = await page.getByTestId('remember-checkbox').isChecked();

        console.log('stateCheck==>' + stateCheckAfterClicking);


    })



    test('verify the dropdown is disabled', async ({ page }) => {
        // test.setTimeout(180000)
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const disabledCheck = await page.getByTestId('dynamic-option-select').isDisabled();

        console.log("disabledCheck===>" + disabledCheck);

        const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()
        console.log("isVisible===>" + isVisible);

        if (isVisible === false) {
            await page.getByTestId('hidden-dropdown-toggle-btn').click()
        }
        const isVisibleCheck = await page.getByTestId('hidden-dropdown-select').isVisible()
        console.log("isVisibleCheck===>" + isVisibleCheck);

        await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Advanced')

        await page.getByTestId('dynamic-group-select').selectOption('Actions')
        await page.getByTestId('dynamic-option-select').selectOption('fill + radio + checkbox')
    })











})

// test.describe('Login functionality', () => {

// })
// test.describe('User creation functionality', () => {

// })

// test.describe('Client creation functionality', () => {

// })

// test.describe('Order placment functionality', () => {

// })