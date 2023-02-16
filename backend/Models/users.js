const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        unique: true,
        required: true,
        type: String,
        lowercase: true,
        trim: true
    },
    email: {
        unique: true,
        required: true,
        type: String,
        lowercase: true,
        trim: true,
    },
    password: {
        required: true,
        type: String,
    }
});

const User = model('user', userSchema);
module.exports = { User };