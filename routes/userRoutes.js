const express = require('express');
const authController = require('./../controller/authController');
const userController = require('./../controller/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);


router
    .route('/')
    .get(userController.getAll)

router
    .route('/:id')
    .get(userController.getOne)
    .patch(userController.updateOne)
    .delete(userController.deleteOne)


module.exports = router;