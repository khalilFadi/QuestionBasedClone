const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://khamad:aAcKtqfQA3MnEuQY@stplkahootclone.vd4qa35.mongodb.net/?retryWrites=true&w=majority&appName=STPLKahootClone";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run(t) {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    // await client.db("Users").command({ ping: 1 });
    // const dbl = client.db("Users");
    // const col = dbl.collection("Players");
    // const peopleDocuments = [
    //     {
    //         "name" : {"first": "Khaleel", "last": "Hamad"},
    //         "id": 214,
    //         "gender": true,
    //         "birth": new Date(2005, 20, 9),
    //         "accountCreateDate": new Date(2024, 12, 3)
    //     }
    //   ]
    //   const p = await col.insertMany(peopleDocuments);
    // console.log("Connected successfully to server");
    // // Find the document
    // const filter = { "name.last": "Turing" };
    // const document = await col.findOne(filter);
    // // Print results
    // console.log("Document found:\n" + JSON.stringify(document));

    // Server Connection
    const dbS = client.db("Servers");
    await dbS.createCollection(t)
   


    // db.createCollection("employees", function(err, res) {  
    //     if (err) throw err;  
    //     console.log("Collection is created!");  
    //     db.close();  
    //     });  
        
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
