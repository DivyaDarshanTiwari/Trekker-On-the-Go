const express = require('express');
const router = express.Router();

router.post('/student_sign_up', async (req, res) => {
    const { passangerName, studentID, passangerEmail, phoneNo, password } = req.body;

    try {
        // Check if all required fields are provided (phoneNo is optional)
        if (passangerName && studentID && passangerEmail && password) {
            res.status(201).json({ msg: "The required data is available to the server" });
        } else {
            res.status(400).json({ msg: "The necessary data was not retrieved" });
        }
    } catch (error) {
        // Log the error and return server error response
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
