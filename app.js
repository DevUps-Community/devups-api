const express = require('express');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errors');
const controllers = require('./controllers');

const app = express();
app.use(express.json());

app.get("/api/categories", controllers.getCategories)
app.get('/api/topics', controllers.getTopics)
app.get('/api/topics/:category_id', controllers.getTopicsByCategoryId)

app.post('/api/suggestions', controllers.postSuggestionByUserId)

app.all('*', controllers.handle404)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)


module.exports = app;