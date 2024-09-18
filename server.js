const http = require('http')
const app = require('./app')
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(PORT)