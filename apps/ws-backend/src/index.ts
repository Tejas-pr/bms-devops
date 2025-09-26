import { WebSocketServer } from "ws";
import { prisma } from "@repo/database";

const PORT = Number(process.env.WS_PORT) || 5002;

const wsServer = new WebSocketServer({ port: PORT });

wsServer.on("connection", async (socket) => {
  try {
    const user = await prisma.user.findFirst();
    socket.send(`The last user is: ${user?.username ?? "No users found"}`);
    socket.send(`The socket is connected to: ws://localhost:${PORT}`);
  } catch (error) {
    console.error("Error fetching user:", error);
    socket.send("Error fetching user data.");
  }
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
