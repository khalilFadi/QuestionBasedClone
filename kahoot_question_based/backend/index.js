// Code for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khamad:f0eKXq0dUgpyQBsQ@stplkahootclone.vd4qa35.mongodb.net/?retryWrites=true&w=majority&appName=STPLKahootClone');

// Schema for users of app
const UserSchema = new mongoose.Schema({
	gamePin: {
		type: Number,
		required: true
	}, 
    PlayerCount: {
        type: Number,
        required: true, 
        default: 1
    }
}, {collation: "Servers"});
const User = mongoose.model('Activeservers', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 9999");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by 
	// entering http://localhost:9999
	
	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}
	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.listen(9999);
