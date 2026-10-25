import { test, expect } from '@playwright/test';
test.describe('API testing', async () => {
    const baseUrl = "http://localhost:3000/products"

    test('get method', async ({ request }) => {
        const response = await request.get(baseUrl)
        const body = await response.json()
        console.log(body)
        expect(response.status()).toBe(200)
        expect(response.statusText()).toBe('OK')
        expect(body[0].name).toBe("Blue Top")
        expect(body[1].name).toBe("Bluetop1updated latest")
        expect(body[0]).toHaveProperty('name')
        expect(body[0]).toHaveProperty('price')
        const arr = ["Women", "Men"]
        expect(arr).toContain(body[0].category.userType.userType)
        expect(body[0].name.length).toBeGreaterThan(3)
    })

    test('post method', async ({ request }) => {
        const response = await request.post(baseUrl, {
            data: {
                name: "Blue Top 5",
                price: "Rs. 700",
                category: {
                    usertype: {
                        usertype: "Women"
                    },
                    category: "Tops"
                }
            }
        })
        const body = await response.json()
        console.log(body)
        expect(response.status()).toBe(201)
        expect(response.statusText()).toBe('Created')
        expect(body.name).toBe('Blue Top 5')

    })

    test('put method', async ({ request }) => {
        const response = await request.put(baseUrl + "/0JYYaPOCekk", {
            data: {
                name: "Blue Top 5",
                price: "Rs. 700",
                category: {
                    usertype: {
                        usertype: "Women"
                    },
                    category: "Tops"
                },
                            id: "0JYYaPOCekk"
            }

        })
        const body = await response.json()
        console.log(body)
                expect(body.name).toBe('Blue Top 5')
        expect(response.status()).toBe(200)
        expect(response.statusText()).toBe('OK')

    })

    test('delete method', async ({ request }) => {

 const response = await request.delete(baseUrl+"/0JYYaPOCekk")
        const body = await response.json()
        console.log(body)

     })
})
