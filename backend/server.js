const http = require("http");
const app = require("./app");
const WebSocket = require("ws");
require("dotenv").config();
const connectDB = require("./config/db");
const { initWebSocket } = require("./services/notificationService");
const cors = require("cors");

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

const corsOptions = {
  origin: "http://localhost:3000/", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
