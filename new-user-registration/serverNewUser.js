// Import Express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create an instance of Express
const cultivateRegi = express();

// Use body-parser middleware to parse JSON and URL-encoded data
cultivateRegi.use(bodyParser.json());
cultivateRegi.use(bodyParser.urlencoded({ extended: true }));

cultivateRegi.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
}); 

// Route for the user registration form
cultivateRegi.post('/register', (req, res) => {
    // Get the data from the form
    const { username, email, password, age, gender, role } = req.body;

    // For now, we'll just send back a success message
    res.send(`User registered successfully on Cultivate!`);
});

// Start the server
const PORT = 3005;
cultivateRegi.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
