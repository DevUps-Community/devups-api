const { fetchCategories, fetchTopics, fetchTopicsByCategoryId } = require("../models/categories.models")

exports.getCategories = (req, res, next) => {
    fetchCategories()
    .then((categories) => {
        res.status(200).send({categories})
    }).catch(next)
}

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({topics})
    }).catch(next)
}

exports.getTopicsByCategoryId = (req, res, next) => {
    const { category_id } = req.params
    fetchTopicsByCategoryId(category_id)
    .then((topics) => {
        res.status(200).send({topics})
    }).catch(next)
}

exports.handle404 = (req, res) => {
    res.status(404).send({ msg: 'Not found' });
  }