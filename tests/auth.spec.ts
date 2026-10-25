import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
    test('Handle a basic authentication', async ({ request }) => {

        const response = await request.get('https://postman-echo.com/basic-auth', {
            headers: {
                'Authorization': `Basic ${Buffer.from('postman:password').toString('base64')}`
            }
        });
        console.log(await response.json());
    })


    test('Authenticate using Bearer token', async ({ request }) => {

        const response = await request.get('https://api.github.com/user/repos',
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
                }
            }
        );
        console.log(await response.json());
    })

  test('Authenticate using api KEY ', async ({ request }) => {

        const response = await request.get('https://api.openweathermap.org/data/2.5/weather',
        {
            params: {
                q: 'London',
                appid: process.env.API_KEY!
            }
        });
        console.log(await response.json());
    })
})