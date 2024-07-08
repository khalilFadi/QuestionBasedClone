const express = require('express');
const mongoose = require('mongoose');
const Server = require('./models/Server'); // Adjust path as per your file structure
const User = require('./models/User');
const Student = require('./models/Student');
const Question = require('./models/Question');
const cors = require('cors'); // If needed for cross-origin requests
const { MongoClient } = require('mongodb');
const { error } = require('console');

const app = express();
const port = 9999; // Replace with your desired port number

const mongoURI = 'mongodb+srv://khamad:XuMUt6bvRuQGdFSj@stplkahootclone.vd4qa35.mongodb.net/?retryWrites=true&w=majority&appName=STPLKahootClone'; // Replace with your MongoDB connection string

const client = new MongoClient(mongoURI);
const database = client.db("Datasets");

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware for handling cross-origin requests
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by 
	// entering http://localhost:9999

	// If you see App is working means
	// backend working properly
});
function RandomPINGernerator(){
	let x = Math.floor((Math.random() * 100000) + 1);
	return x;
}
//checks if a server Exits using the serverPin returns True and False 
app.post('/api/check-server-exists', async (req, res) => {
	const { serverPIN } = req.body;
	console.log('Received serverPin:', serverPIN);
    const Servers = database.collection("Servers");
	try {

	  const server = await Servers.findOne({serverPin: Number(serverPIN)});
	  console.log('Found server:', server);
	  if (server) {
		res.json({ exists: true, server });
	  } else {
		res.json({ exists: false });
	  }
	} catch (error) {
	  console.error('Error checking server:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });


async function createListing(collectionName, newListing){
    const result = await client.db("Datasets").collection(collectionName).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}  

app.post('/api/add-server', async (req, res) => {
	try {
		const { serverPin } = req.body;
		await createListing("Servers",new Server({serverPin, UserPin:1111, servwerName: 'Test Server'}));
		res.send({ message: 'Server added successfully' });
	} catch (error) {
		console.error('Error adding element:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// creating a user given username and password keeping the nickname empty ("no nickname")
// pin is created an random, keep on going through random numbers until you find one that isn't used 
app.post('/api/add-user', async (req, res) => {
	try {
		//Creating a User PIN 
		let UserID = RandomPINGernerator();
		const Users = database.collection("Users");
		let exists = await Users.findOne({UserID: UserID});
		while(exists){
			UserID = RandomPINGernerator();
			exists = await Users.findOne({UserID: UserID});
		}
		const { Username, Password} = req.body;
		exists = await Users.findOne({Username: Username});
		if(exists){
			throw "Username Exists";
		}
		await createListing("Users",new User({UserID , Username, Password, Nickname: 'No Nickname'}));
		res.send({ message: 'User added successfully' });

	} catch(error){
		console.error('Error adding element:', error);
	}
});

//adding a question including a 0% accuracy 
// question text, and the 3 incorrect answers and correct question
app.post('/add-question', async (req, res) => {
	try {
		let questionPIN = RandomPINGernerator();
		const Questions = database.collection("Questions");
		let exists = await Questions.findOne({QuestionPIN: questionPIN});
		while(exists){	
			questionPIN = RandomPINGernerator();
			exists = await Questions.findOne({QuestionPIN: questionPIN});
		}
		const {questionText2, ServerPIN, correctChoice, choice2, choice3, choice4}= req.body;
		console.log("Question text saved: ", questionText2);
		await createListing("Questions",new Question({QuestionPIN: questionPIN, QuestionText:questionText2, ServerPIN, CorrectAnswer: correctChoice, IncorrectAnswer1: choice2, IncorrectAnswer2: choice3, IncorrectAnswer3: choice4}));
		res.send({ message: 'Question added successfully' });
	} catch (e){
		console.error('Error adding element:', e);
	}
});

//Adding student from the avatarPage
app.post('/add-student', async (req, res) => {
	try{
		//find a studentPIN
		let StudentPIN = RandomPINGernerator();
		const Students = database.collection("Students");
		let exists = await Students.findOne({StudentPIN: StudentPIN});
		while(exists){
			StudentPIN = RandomPINGernerator();
			exists = await Students.findOne({StudentPIN: StudentPIN});
		}
		const {ServerPIN, UserID, studentName, studentAvatar} = req.body;
		exists = await Students.findOne({ServerPIN: Number(ServerPIN), UserID:UserID});
		console.log('existance: ', exists);
		console.log("PIN: ", ServerPIN, "UserID: ", UserID);
		console.log("Student name saved: ", studentName);
		await createListing("Students",new Student({StudentPIN, ServerPIN, UserID, Name: studentName, Avatar: studentAvatar}));
		res.send({ message: 'Student added successfully' });
	} catch (e){
		console.error('Error adding element:', e);
	}
});

//checking for all the questions in a server
app.post('/get-questions', async (req, res) => {
	try {
		const Questions = database.collection("Questions");

		const { serverPIN } = req.body;
		if (!serverPIN) {
		  return res.status(400).send({ message: "Server PIN is required" });
		}
		const questions = await Questions.find({ServerPIN: Number(serverPIN)}).toArray();
		res.send(questions);
	} catch (e){
		console.error('Error adding element:', e);
		res.send('Error');
	}
});
//gt 
//getting all students in a server
app.post('/get-students-in-server', async (req, res) => {
	try {
		const Students = database.collection("Students");
		const { serverPIN } = req.body;	
		const findingStudents = await Students.find({ServerPIN: Number(serverPIN)});
		const students = await findingStudents.toArray();
		console.log("gettingStudents, pin: ", serverPIN, " students: ", students);
		res.send(students);		
	} catch (e){
		console.error('Error adding element:', e);
	}
});

//change Server Status 
app.post('/api/change-server-status', async (req, res) => {
	try{
		const Servers = database.collection("Servers");
		const { serverPIN, newStatus } = req.body;
		// Ensure serverPIN is a number
		const findingServer = await Servers.findOne({ serverPin: Number(serverPIN) });
		await Servers.updateOne({ serverPin: Number(serverPIN) }, { $set: { Status: newStatus}});
		res.send('Server Status Chaged');
	} catch (e){
		console.error('Error checking Server:', e);
	}
});
//getting server Status 
app.post('/api/get-server-status', async (req, res) => {
	try{
		const Servers = database.collection("Servers");
		const { serverPIN } = req.body;
		const findingServer = await Servers.findOne({serverPin: Number(serverPIN)});
		res.send(findingServer.Status);
	} catch (e) {
		console.error('Error checking Server:', e);
	}
});
//get a list of the questions in the server

app.post('/api/login', async (req, res) => {
	try {
		const {Username, Password} = req.body;
		const Users = database.collection("Users");
		const user = await Users.find({Username: Username, Password: Password});
		if (user) {
			res.json({ exists: true, UserID: user.UserID });
		} else {
			res.json({ exists: false });
		}
	}catch(e){
		console.error('Error adding element:', e);
	}
})

app.post('/api/changeNickname', async (req, res) => {
	try{
		const {UserID, Nickname} = req.body;
		const Users = database.collection("Users");
		const user = await Users.findOne({UserID: UserID});
		if (user) {
			await Users.updateOne({UserID: UserID}, {$set: {Nickname: Nickname}});
			res.json({ exists: true });
		} else {
			res.json({ exists: false });
		}

	}catch (e){
		
	}
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//create a function to add an item to each schema
//adds an item 
