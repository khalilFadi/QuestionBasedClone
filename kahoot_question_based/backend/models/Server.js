// models/Data.js (or any appropriate location)
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	gamePin: {
		type: Number,
		required: true
	}, 
    PlayerCount: {
        type: Number,
        required: true, 
        default: 0
    }
});

const User = mongoose.model('Activeservers', UserSchema);

module.exports = User;
