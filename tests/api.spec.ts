import { test, expect } from '@playwright/test';
test('Get all products list using GET method', async ({ request }) => {
    const response = await request.get('/products');
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
    const data = await response.json();
    console.log(data);

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('price');
    expect(data[0]).toHaveProperty('brand');
    expect(data[0].name).toBe('Laptop');
    expect(data[1].price).toBe(25000);
})


test('Create products using POST method', async ({ request }) => {
        const response = await request.post('/products', {
            data: {
                name: 'Mobile',
                price: 15000,
                brand: 'Samsung'
            }
        });
        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');
        const data = await response.json();
        console.log(data);

})

test('Update products using PUT method', async ({ request }) => {
        const response = await request.put('/products/1', {
            data: {
                    name: 'Laptop',
                price: 75000,
                brand: 'Dell 2'
            }
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
        const data = await response.json();
        console.log(data);

})

test('Partial Update products using PATCH method', async ({ request }) => {
        const response = await request.patch('/products/1', {
            data: {
                //     name: 'Laptop',
                // price: 75000,
                brand: 'Dell 3'
            }
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
        const data = await response.json();
        console.log(data);

})

test('delete products using DELETE method', async ({ request }) => {
        const response = await request.delete('/products/fQcX6A_S9A4', {
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
        const data = await response.json();
        console.log(data);

})