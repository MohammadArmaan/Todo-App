const User = require('./../model/userModel');
const Todo = require('./../model/todoModel');

exports.getAll = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.getOne = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.updateOne = async (req, res, next) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: [
                user
            ]
        })
    }
    catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.deleteOne = async (req, res, next) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(204).json()
    }
    catch(err){
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
}