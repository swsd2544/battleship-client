import { createContext } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://battleship-socket-server.herokuapp.com/";

export const socket = io(SOCKET_URL);
export const SocketContext = createContext();
