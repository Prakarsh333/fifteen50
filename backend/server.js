const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./User");
const { MongoClient } = require('mongodb');

dotenv.config();
 

const PORT = process.env.PORT || 5000;   
  
const app = express(); 
app.use(cors());
app.use(bodyParser.json()); 

const client = new MongoClient(process.env.MONGO_URI);
// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { // Replace 'test' with your database name
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure 
    } 
};

connectDB(); 

app.get('/test', (req, res) => {
    res.json({ message: 'okay' });
});

app.post('/user', async (req, res) => { 
    try {
        const user = new User(req.body); // Create a new user instance with the request body
        await user.save(); // Save the user to the database
        res.status(201).json(user); // Respond with the created user
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle validation errors
    }
});

app.put('/updateuser', async (req, res) => {
    const userId = req.body._id;   
    const data = req.body; // Assuming `data` is sent in the request body
    const user = await User.findById(userId); // Fetch the existing user
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    try {
      // Update the user in the database
      const result = await User.updateOne(
        { _id: userId },
        { $set: data } 
      );
  
      if (result.nModified > 0) {
        res.send('User updated successfully');
      } else {
        res.send('No changes made to the user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal Server Error');
    }
});

app.get("/users", async (req, res) => {
    try {
        await client.connect(); 
        const database = client.db("test"); 
        const collection = database.collection("Users");

        const users = await User.find().sort({ problemsolved: -1 });
        res.status(200).json(users); 

    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle validation errors
    } finally {
        await client.close(); // Ensure the client is closed after the operation
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

