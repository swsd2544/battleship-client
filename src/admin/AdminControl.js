import { SocketContext } from "../context/socket";
import { useContext, useEffect, useCallback, useState } from "react";
import ControlItem from "./ControlItem";
import classes from "./AdminControl.module.css";

const FETCH_ROOM_EVENT = "fetchRoom";
const FETCH_NUMBER_SOCKETS_EVENT = "fetchNumberSockets";

const AdminControl = () => {
  const socket = useContext(SocketContext);
  const [gameRooms, setGameRooms] = useState({});
  const [numberSockets, setNumberSockets] = useState(0);

  const handleFetchRoom = useCallback((rooms) => {
    //console.log(rooms);
    setGameRooms(rooms);
  }, []);

  const handleFetchNumberSockets = useCallback((numSockets) => {
    setNumberSockets(numSockets);
  }, []);

  useEffect(() => {
    socket.emit(FETCH_ROOM_EVENT);
    socket.emit(FETCH_NUMBER_SOCKETS_EVENT);
    socket.on(FETCH_ROOM_EVENT, handleFetchRoom);
    socket.on(FETCH_NUMBER_SOCKETS_EVENT, handleFetchNumberSockets);

    return () => {
      socket.off(FETCH_ROOM_EVENT, handleFetchRoom);
      socket.off(FETCH_NUMBER_SOCKETS_EVENT, handleFetchNumberSockets);
    };
  }, [socket, handleFetchRoom, handleFetchNumberSockets]);

  return (
    <div className={classes.control}>
      <h3>Concurrent users: {numberSockets}</h3>
      <ControlItem rooms={gameRooms} />
    </div>
  );
};

export default AdminControl;
