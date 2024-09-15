// Importing the express module
const express = require('express');

// Initializing the express Router
const router = express.Router();

// Defining a POST route for '/role'
router.post('/role', async (req, res) => {
  try {
      // Destructuring the 'role' field from the request body
      const {role} = req.body;

      // Checking if the role is 'driver'
      if(role === 'driver') {
        // Responding with a status of 201 and a message indicating the role is 'Driver'
        res.status(201).json({msg : "Driver"});
      } else {
        // If the role is not 'driver', respond with a message indicating 'Passenger'
        // NOTE: Fixed typo 'staus' -> 'status'
        res.status(201).json({msg : "Passenger"});
      }
  } catch(err) {
    // Logging any error to the console
    console.log(err);
    
    // Sending a 500 status response in case of server error
    res.status(500).json({msg : "Role Server Error!"});
  }
});

// Exporting the router module to be used in other parts of the app
module.exports = router;
