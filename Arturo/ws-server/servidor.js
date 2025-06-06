// server.js
import WebSocket, { WebSocketServer } from "ws";

// Crea el servidor WebSocket
const wss = new WebSocketServer({ port: 3000 });
console.log("🟢 Servidor WebSocket escuchando en ws://0.0.0.0:3000");

// Evento cuando un cliente se conecta
wss.on("connection", (ws) => {
  console.log("💻 Cliente conectado");

  // Evento cuando recibe un mensaje de algún cliente (ESP32 o navegador)
  ws.on("message", (msg) => {
    console.log("📦 Mensaje recibido:", msg.toString());

    // Reenvía el mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  // Evento cuando un cliente se desconecta
  ws.on("close", () => {
    console.log("❌ Cliente desconectado");
  });
});
