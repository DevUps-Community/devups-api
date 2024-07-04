const express = require('express');
const { getCategories } = require('./controllers/categories.controllers');

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories)

app.use((err, req, res) => {
    console.log(err, '<--- error in app js');
    const status = err.status || 500
    const message = err.msg || "Internal Server Error"
    res.status(status).send({msg: message})
})


module.exports = app;