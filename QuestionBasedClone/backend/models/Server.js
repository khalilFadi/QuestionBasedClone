// models/Data.js (or any appropriate location)
const mongoose = require('mongoose');
const { stringify } = require('querystring');

const ServerSchema = new mongoose.Schema({
	serverPin: {
		type: Number,
		required: true,
        unique: true,
	}, 
    UserPin: {
        type: Number,
        required: true,
        default: '000',
    },
    serverName: {
        type: String,
        required: true,
        default: 'no ServerName',
    },
    serverDescription: {
        type: String,
        required: false,
        default: 'no ServerDescription',
    },
    questionsPINs: {
        type: Array,
        required: false,
        default: [],
    },
    PlayerCount: {
        type: Number,
        required: true, 
        default: 0
    }, 
    Status:{
        type: String,
        required: true,
        default: 'Offline',
    }
});
//a server is another name for a quiz 
const Server = mongoose.model('Servers', ServerSchema);


module.exports = Server;
