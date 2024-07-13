/* eslint-disable */
const express = require('express');

const viewController = require('./../controller/viewController');
const authController = require('./../controller/authController')

const router = express.Router();

router
    .route('/')
    // .get(viewController.getAll)
    .get(authController.protect, viewController.getUserTodos)

router.get('/login', viewController.login);
router.get('/signup', viewController.signup);
router.get('/forgotPassword', viewController.forgotPassword);
router.get('/resetPassword/:token', viewController.resetPassword);

router.get('/test-error', (req, res, next) => {
    const status = 500;
    const error = 'Test error message';
    res.status(status).render('error', {
        error,
        status
    });
});

module.exports = router;
