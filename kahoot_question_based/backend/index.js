const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/Server'); // Adjust path as per your file structure
const cors = require('cors'); // If needed for cross-origin requests

const app = express();
const port = 9999; // Replace with your desired port number

const mongoURI = 'mongodb+srv://khamad:f0eKXq0dUgpyQBsQ@stplkahootclone.vd4qa35.mongodb.net/?retryWrites=true&w=majority&appName=STPLKahootClone'; // Replace with your MongoDB connection string

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

app.post('/api/check-server', async (req, res) => {
	const { gamePin } = req.body;
  
	try {
	  const server = await User.findOne({ gamePin });
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
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

