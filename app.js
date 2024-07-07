const express = require('express');
const { getCategories } = require('./controllers/categories.controllers');
const { getTopics, getTopicsByCategoryId } = require('./controllers/topics.controllers');
const { postSuggestionByUserId } = require('./controllers/suggestions.controllers');
const { handle404 } = require('./controllers/handle404.cotrollers');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errors');
//const controllers = require('./controllers/index');

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories)
app.get('/api/topics', getTopics)
app.get('/api/topics/:category_id', getTopicsByCategoryId)

app.post('/api/suggestions/:user_id', postSuggestionByUserId)

app.all('*', handle404)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)


module.exports = app;