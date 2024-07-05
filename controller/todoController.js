/* eslint-disable */
const Todo = require('./../model/todoModel');

exports.getAll = async(req, res, next) => {
    try{
        const  todo  = await Todo.find(req.body);
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

exports.createOne = async (req, res, next) => {
    try{
        const todo  = await Todo.create(req.body);
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