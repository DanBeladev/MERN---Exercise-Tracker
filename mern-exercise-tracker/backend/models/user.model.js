const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required:true,
        unique:true,
        trim: true,
        minlength:3
    }, 
    email: {
        type: String,
        required:true,
        unique:true,
        trim: true,
        minlength:3
    },
    phone: {
        type: String,
        required:true,
        unique:true,
        trim: true,
        minlength:10
    },
    }, {
        timestamps:true
});

const User = mongoose.model('User', userSchema);

module.exports = User;