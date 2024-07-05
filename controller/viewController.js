/* eslint-disable */
const Todo = require('./../model/todoModel');

exports.getAll = async(req, res, next) => {
    try{
        const todos = await Todo.find(req.body)
        res.status(200).render('base', {
            todos
        })
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data: err
        })
    }
}

