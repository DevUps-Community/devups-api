const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  db.end();
});

describe('GET /api/categories', () => {
  test('200: should return an array of all the categories objects', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({body}) => {
        expect(body.categories).toHaveLength(4);
        body.categories.forEach(category => {
          expect(typeof category).toBe('object');
          expect(typeof category.name).toBe('string');
          expect(typeof category.description).toBe('string');
        });
      });
  });
});
  test('404: should respond with a 404 error message if the path is invalid', () => {
    return request(app)
      .get('/api/categoriez')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('Not found');
        console.log(body.msg);
      });
    
  });