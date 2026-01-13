import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const DEFAULT_SOCKET_URL = API_URL.replace(/\/api\/?$/, "");
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || DEFAULT_SOCKET_URL;

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = undefined;
  }
}


