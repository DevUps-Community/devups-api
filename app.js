const express = require('express');
const { getCategories, handle404, getTopics, getTopicsByCategoryId } = require('./controllers/categories.controllers');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errors');

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories)
app.get('/api/topics', getTopics)
app.get('/api/topics/:category_id', getTopicsByCategoryId)

// app.use((err, req, res) => {
//     console.log(err, '<--- error in app js');
//     const status = err.status || 500
//     const message = err.msg || "Internal Server Error"
//     res.status(status).send({msg: message})
// })

app.all('*', handle404)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)


module.exports = app;