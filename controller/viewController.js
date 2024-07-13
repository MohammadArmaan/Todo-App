/* eslint-disable */
const Todo = require('./../model/todoModel');
const User = require('./../model/userModel');

// exports.getAll = async(req, res, next) => {
//     try{
//         const todos = await Todo.find(req.body);
//         res.status(200).render('todo', {
//             todos
//         });
//     }
//     catch(err){
//         const error = err.message;
//         const status = 404;
//         res.status(404).render('error', {
//             error, status
//         });
//     }
// }

exports.getUserTodos = async(req, res, next) => {
    try{
        const todos = await Todo.find({ user: req.user._id });
        const user = req.user
        res.status(200).render('todo', {
            todos, user
        })
    }
    catch(err){
        const error = err.message;
        const status = 404;
        res.status(404).render('error', {
            error, status
        });
    }
}

exports.login = async (req, res, next) => {
    try{
        res.status(200).render('login');
    }
    catch(err){
        const error = err.message;
        const status = 404;
        res.status(404).render('error', {
            error, status
        });
    }
}

exports.signup = async (req, res, next) => {
    try{
        res.status(200).render('signup');
    }
    catch(err){
        const error = err.message;
        const status = 404;
        res.status(404).render('error', {
            error, status
        });
    }
}

exports.forgotPassword = async (req, res, next) => {
    try{
        res.status(200).render('forgotPassword');
    }
    catch(err){
        const error = err.message;
        const status = 404;
        res.status(404).render('error', {
            error, status
        });
    }
}

exports.resetPassword = async (req, res, next) => {
    try{
        const token = req.params.token;
        res.status(200).render('resetPassword', {
            token
        });
    }
    catch(err){
        const error = err.message;
        const status = 404;
        res.status(404).render('error', {
            error, status
        });
    }
}