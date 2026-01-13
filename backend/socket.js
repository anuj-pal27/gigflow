import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import User from "./models/User.js";

let io;

function parseCookies(cookieHeader = "") {
  const out = {};
  cookieHeader.split(";").forEach((part) => {
    const [rawKey, ...rest] = part.split("=");
    if (!rawKey) return;
    const key = rawKey.trim();
    const value = rest.join("=").trim();
    if (!key) return;
    out[key] = decodeURIComponent(value || "");
  });
  return out;
}

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  // Authenticate sockets using the same JWT cookie as the API
  io.use(async (socket, next) => {
    try {
      const cookies = parseCookies(socket.handshake.headers?.cookie || "");
      const token = cookies.token;

      if (!token) {
        return next(new Error("Unauthorized: missing token cookie"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ensure the user still exists & is active
      const user = await User.findById(decoded.id).select("isActive");
      if (!user) return next(new Error("Unauthorized: user not found"));
      if (!user.isActive) return next(new Error("Unauthorized: user deactivated"));

      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    // Put each user in their own room
    socket.join(`user:${socket.userId}`);
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}
