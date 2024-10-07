const http = require("http");
const app = require("./app");
const WebSocket = require("ws");
require("dotenv").config();
const connectDB = require("./config/db");
const { initWebSocket } = require("./services/notificationService");

connectDB();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// const wss = new WebSocket.Server({ server: server });

// wss.on("connection", function connection(ws) {
//   console.log("new client connected");
//   ws.send("welcome new client!");
//   ws.on("message", function incoming(message) {
//     console.log(`recieved: ${message}`);

//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState == WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });

// Initialize WebSocket
initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
