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
      .then(({ body }) => {
        expect(body.categories).toHaveLength(4);
        body.categories.forEach((category) => {
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
    .then(({ body }) => {
      expect(body.msg).toBe('Not found');
    });
});

describe('GET /api/topics', () => {
  test('200: should return an array of all the topics objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(50);
        body.topics.forEach((topic) => {
          expect(typeof topic).toBe('object');
          expect(typeof topic.name).toBe('string');
          expect(typeof topic.description).toBe('string');
          expect(typeof topic.category_id).toBe('number');
        });
      });
  });

  test('404: should return a 404 error message if the path is invalid', () => {
    return request(app)
      .get('/api/topicz')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
});

describe('GET /api/topics/:category_id', () => {
  test('200: should return an array of topics objects that match the category_id', () => {
    return request(app)
      .get('/api/topics/1')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(13);
        body.topics.forEach((topic) => {
          expect(typeof topic).toBe('object');
          expect(typeof topic.name).toBe('string');
          expect(typeof topic.description).toBe('string');
          expect(typeof topic.category_id).toBe('number');
        });
      });
  });
  test('400: should respond with a 400 error message if the category_id is not a valid type', () => {
    return request(app)
      .get('/api/topics/banana')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });

  test('404: should respond with a 404 error message if the category_id does not exist', () => {
    return request(app)
      .get('/api/topics/0')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
        console.log(body.msg);
      });
  });
});

describe('POST /api/suggestions', () => {
  test('201: should return a 201 status code and a suggestion object', () => {
    const newSuggestion = {
      name: 'devups',
      email: 'user@example.com',
      body: 'This is a great suggestion',
    };
    return request(app)
      .post('/api/suggestions')
      .send(newSuggestion)
      .expect(201)
      .then(({ body }) => {
        const {suggestion} = body
        console.log(suggestion);
        expect(typeof suggestion).toBe('object');
        expect(typeof suggestion.name).toBe('string');
        expect(typeof suggestion.email).toBe('string');
        expect(typeof suggestion.content).toBe('string');
      });
  });
  test('201: should return a 201 status code and a suggestion object ignoring unnessary fields', () => {
    const newSuggestion = {
      name: "devups",
      email: 'user@example.com',
      body: 'This is a great suggestion',
      unnessary_field: 'This field should not be included',
    };
    return request(app)
      .post('/api/suggestions')
      .send(newSuggestion)
      .expect(201)
      .then(({ body }) => {
        const {suggestion} = body
        expect(typeof suggestion).toBe('object');
        expect(typeof suggestion.name).toBe('string');
        expect(typeof suggestion.email).toBe('string');
        expect(typeof suggestion.content).toBe('string');
        expect(suggestion).not.toHaveProperty('unnessary_field');
      });
  });
  
  test('400: should respond with an error message when mssing a required field', () => {
    const newSuggestion = {
      description: 'This is a test suggestion',
    };
    return request(app)
      .post('/api/suggestions')
      .send(newSuggestion)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
  test('404: should respond with a 404 error message if the user_id does not exist', () => {
    return request(app)
      .post('/api/suggestion')
      .send({
        topic_id: 1,
        description: 'This is a test suggestion',
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found');
      });
  });
});
