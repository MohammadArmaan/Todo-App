/* eslint-disable */
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

todoSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name email' 
    });

    next();
})


const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
