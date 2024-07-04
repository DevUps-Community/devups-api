const { fetchCategories } = require("../models/categories.models")

exports.getCategories = (req, res, next) => {
    fetchCategories()
    .then((categories) => {
        res.status(200).send({categories})
    }).catch(next)
}

exports.handle404 = (req, res) => {
    res.status(404).send({ msg: 'Not found' });
  }