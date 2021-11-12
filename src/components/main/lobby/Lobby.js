import { useState, useEffect, useContext, useCallback } from "react";
import CreateRoom from "./createRoom/CreateRoom";
import GameRoom from "./gameRoom/GameRoom";
import LobHeader from "./lobbyHeader/LobbyHeader";
import { SocketContext } from "../../../context/socket";

const FETCH_ROOM_EVENT = "fetchRoom";

const Lobby = () => {
  const socket = useContext(SocketContext);
  const [gameRooms, setGameRooms] = useState({});

  const handleFetchRoom = useCallback((rooms) => {
    //console.log(rooms);
    setGameRooms(rooms);
  }, []);

  useEffect(() => {
    socket.emit(FETCH_ROOM_EVENT);
    socket.on(FETCH_ROOM_EVENT, handleFetchRoom);

    return () => {
      socket.off(FETCH_ROOM_EVENT, handleFetchRoom);
    };
  }, [socket, handleFetchRoom]);

  return (
    <div>
      <LobHeader />
      <main>
        <CreateRoom />
        <GameRoom rooms={gameRooms} />
      </main>
    </div>
  );
};

export default Lobby;
