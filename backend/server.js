const http = require("http");
const app = require("./app");
const WebSocket = require("ws");
require("dotenv").config();
const connectDB = require("./config/db");
const { initWebSocket } = require("./services/notificationService");

connectDB();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize WebSocket
initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
