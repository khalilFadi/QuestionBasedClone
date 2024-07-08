const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    UserID: {
        type: Number,
        required: true,
        unique: true
    },
    Username: {
        type: String, 
        required: true,
        default: 'userName', 
        unique: true
    }, 
    Password: {
        type: String,
        required: true,
        default: '0000',
    },
    DateCreated: {
        type: Date,
        required: false,
        default: Date.now,
    },
    nickName: {
        type: String,
        required: false,
        default: 'nickName',
    }
})

const User  = mongoose.model('Users', UserSchema);
module.exports = User;