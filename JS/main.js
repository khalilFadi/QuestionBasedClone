// alert("Hello World!");

const { MongoClient } = require("mongodb");

// Connection URI

const uri =
  "mongodb+srv://khamad:aAcKtqfQA3MnEuQY@stplkahootclone.vd4qa35.mongodb.net/?retryWrites=true&w=majority&appName=STPLKahootClone";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function checkServer(){
    document.getElementById("title").innerHTML = "Hello JavaScript!";
}