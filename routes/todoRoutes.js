/* eslint-disable */
const express = require('express');

const todoController = require('./../controller/todoController')
const authController = require('./../controller/authController')

const router = express.Router();

router
    .route('/')
    .get(todoController.getAll)
    .get(authController.protect, todoController.getOneUser)
    .post(authController.protect, todoController.createOne);


router
    .route('/:id')
    .patch(todoController.updateOne)
    .delete(todoController.deleteOne);

router
    .route('/loggedinUser')
    .get(authController.protect, todoController.getUserTodos);

module.exports = router;