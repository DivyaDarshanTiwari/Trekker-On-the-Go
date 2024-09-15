const express = require('express');
const router = express.Router;

router.post('/role', async (req, res) => {
  try {
      const {role} = req.body;
      if(role === 'driver') {
        res.status(201).json({msg : "Driver"});
      } else {
        res.staus(201).json({msg : "Passenger"});
      }
  } catch(err) {
    console.log(err);
    res.status(500).json({msg : "Role Server Error!"});
  }
});

module.exports = router;