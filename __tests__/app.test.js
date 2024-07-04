const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

beforeEach(() => {
    return seed(testData)
})
afterAll(() => {
    db.end()
})

describe('GET /api/categories', () => { 
    test('200, should return all the categories with the relevant keys', () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then((res) => {
            console.log(res.body.categories);
        })
    });
})