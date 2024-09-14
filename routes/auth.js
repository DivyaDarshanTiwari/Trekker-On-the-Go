const express = require('express');
const app = express();

app.post('/', (req, res) => {
    const {role} = req.body;
    if(role === 'driver') res.send("Driver Hai Driver!!");
    else res.send("Passenger Hai Passenger!!");
});