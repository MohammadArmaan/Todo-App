/* eslint-disable */
const express = require('express');

const todoController = require('./../controller/todoController')

const router = express.Router();

router
    .route('/')
    .get(todoController.getAll)
    .post(todoController.createOne);

router
    .route('/:id')
    .patch(todoController.updateOne)
    .delete(todoController.deleteOne);

module.exports = router;