const WebSocket = require("ws");

let clients = [];

const initWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");
    clients.push(ws);
    ws.send(JSON.stringify("Welcome new client"));

    ws.on("message", function incoming(message) {
      try {
        // Parse the incoming message to a JavaScript object (JSON format)
        const parsedMessage = JSON.parse(message);
        console.log("Received JSON:", parsedMessage);

        const msg = parsedMessage.message; // "Hello"
        const id = parsedMessage.id;

        console.log(`Message: ${msg}, ID: ${id}`);

        // Do something with the parsed JSON, like broadcasting it to other clients
        broadcastMessage(msg, ws);
      } catch (error) {
        console.log("Error parsing message as JSON:", error);
        ws.send(JSON.stringify({ error: "Invalid JSON format" })); // Send error message back if JSON is invalid
      }
    });
    // Handle disconnection
    ws.on("close", () => {
      clients = clients.filter((client) => client !== ws);
      console.log("Client disconnected");
    });
  });
};

const broadcastMessage = (message, ws) => {
  clients.forEach((client) => {
    if (client !== ws && client.readyState == WebSocket.OPEN) {
      const notification = {
        message: message, // Broadcasted message
        date: new Date(), // Current timestamp
      };
      client.send(JSON.stringify(notification));
    }
  });
};

module.exports = { initWebSocket, broadcastMessage };
