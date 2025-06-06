const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Cliente conectado!");

  ws.on("message", (message) => {
    console.log("JSON recibido:", message.toString());
  });

  ws.on("close", () => {
    console.log("Cliente desconectado!");
  });
});

server.listen(3000, () => {
  console.log("Servidor WebSocket escuchando en ws://localhost:3000");
});
