const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const morgan = require('morgan')

const roleRoute = require('./routes/auth')
const studentRoute = require('./routes/studentRoutes')
const trekkerRoute = require('./routes/trekkerRoutes')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// mongoose.connect('mongodb+srv://ddarshantiwari:Godisone1*@cluster0.pen9d.mongodb.net/')
//     .then(() => {
//         console.log('Connection to the DB is successfull!')
//     }).catch((err) => {
//         console.log('DB ERROR' + err)
//         process.exit(-1)
//     })

// Manage a route | localhost:3000/products
app.use('/', roleRoute)
app.use('/student', studentRoute)
app.use('/driver',trekkerRoute)


module.exports = app