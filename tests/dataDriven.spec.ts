import { test, expect } from '@playwright/test'
import testData from '../test-data/test-file/jsonData.json'
import fs from 'fs'
import XLSX from 'xlsx'
import {parse} from 'csv-parse/sync'

test("Read data from json", async ({ page }) => {
// console.log(testData)
// console.log(JSON.stringify(testData))
const data = fs.readFileSync('test-data/test-file/jsonData.json', 'utf-8')
console.log(data)
})

test("Read data from xlsx", async ({ page }) => {
const file = XLSX.readFile('test-data/test-file/Book1.xlsx')
const sheet1 = file.Sheets['Sheet1']
const data = XLSX.utils.sheet_to_json(sheet1)
console.log(JSON.stringify(data))
console.log(sheet1)
})

test("Read data from csv", async ({ page }) => {
type userData= {
    userName: string,
    password: string,
    index:number,
    expected: string
}
const file = fs.readFileSync('test-data/test-file/users.csv')
const data:userData[] = parse(file, {columns: true})
console.log(JSON.stringify(data))
})