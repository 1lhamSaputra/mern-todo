const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type: Boolean,
        default:false
    }
});

const TodoItem = mongoose.model('TodoItem', todoItemSchema);
module.exports = TodoItem;