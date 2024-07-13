/* eslint-disable */
const Todo = require('./../model/todoModel');
const User = require('./../model/userModel');

exports.getOneUser = async(req, res, next) => {
    try{
        // const  todo  = await Todo.find(req.body);
        const todo = await Todo.find({ user: req.user._id });
        res.status(200).json({
            status: 'success',
            results: todo.length,
            data: todo
        })
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data: err
        })
    }

}

exports.getAll = async(req, res, next) => {
    try{
        const todo = await Todo.find();
        res.status(200).json({
            status: 'success',
            results: todo.length,
            data: todo
        })
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }

}

exports.getUserTodos = async(req, res, next) => {
    try{
        const todos = await Todo.find({ user: req.user._id });
        res.status(200).json({
            status: 'success',
            data: {
                todos
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.createOne = async (req, res, next) => {
    try{
        // const todo  = await Todo.create(req.body);
        if(!req.user._id) next();
        
        const todo = await Todo.create({
            todo: req.body.todo,
            completed: req.body.completed,
            user: req.user._id 
        });

        res.status(201).json({
            status: 'success',
            data: todo
        })
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data: err

        })
        
    }

}

exports.updateOne = async (req, res, next) => {
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: todo
        });

    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data: err
        })
    }
}

exports.deleteOne = async (req, res, next) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });

    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data: err
        })
    }
}