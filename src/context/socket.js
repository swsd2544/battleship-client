import { createContext } from "react";
import socketio from "socket.io-client";

const SOCKET_URL = "https://battleship-socket-server.herokuapp.com";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();
