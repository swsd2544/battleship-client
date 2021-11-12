import { Fragment } from "react";
import { useState, useEffect, useContext, useCallback } from "react";
import Game from "./game/Game";
import Chat from "./chat/Chat";
import GameHeader from "../Header/GameHeader";
// import GameSingle from "./game/GameSingle";
import { SocketContext } from "../../context/socket";
import { useDispatch, useSelector } from "react-redux";
import { enemyActions } from "../../store/enemySlice";
import { setEnemyBoard } from "../../store/boardGenerate";

const JOIN_ROOM_EVENT = "joinRoom";
const LEAVE_ROOM_EVENT = "leaveRoom";
const SEND_READY_EVENT = "sendReady";
const CHANGE_CURRENT_PLAYER = "changePlayer";

const GameContainer = (props) => {
  const socket = useContext(SocketContext);
  const [currentPlayer, setCurrentPlayer] = useState(
    props.mode === "single" ? "user" : ""
  );
  const [playable, setPlayable] = useState(false);
  const [resetGameKey, setResetGameKey] = useState(false);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const enemy = useSelector((state) => state.enemy);

  const handleLeaveRoom = useCallback(() => {
    //console.log("someone leave the room");
    dispatch(enemyActions.clearEnemy());
  }, [dispatch]);

  const handleJoinRoom = useCallback(
    (roomData) => {
      const newMessages = roomData.messages.map((message) => {
        return {
          ...message,
          ownedByCurrentUser: socket.id === message.senderId,
        };
      });
      setMessages(newMessages);
      //console.log(roomData.users);
      const enemyData = Object.values(roomData.users).find(
        (data) => String(data[0]) !== String(socket.id)
      );

      if (enemyData !== undefined) {
        dispatch(
          enemyActions.setName({ id: enemyData[0], name: enemyData[1] })
        );
      }
    },
    [socket.id, dispatch]
  );

  const handleReadyEvent = useCallback(
    (roomData) => {
      const currPlayer = roomData.currentPlayer;
      setCurrentPlayer(currPlayer === socket.id ? "user" : "enemy");
      const enemyBoard = roomData.board[enemy.id];
      //console.log(enemyBoard);
      dispatch(setEnemyBoard({ board: enemyBoard }));
      setPlayable(true);
    },
    [dispatch, enemy.id, socket.id]
  );

  const handleChangeCurrentPlayer = useCallback(() => {
    //console.log("hello from changeCurrentUser");
    setCurrentPlayer("user");
  }, []);

  useEffect(() => {
    //console.log("setting up");
    socket.on(JOIN_ROOM_EVENT, handleJoinRoom);
    socket.on(LEAVE_ROOM_EVENT, handleLeaveRoom);
    socket.on(SEND_READY_EVENT, handleReadyEvent);
    socket.on(CHANGE_CURRENT_PLAYER, handleChangeCurrentPlayer);

    return () => {
      socket.off(JOIN_ROOM_EVENT, handleJoinRoom);
      socket.off(LEAVE_ROOM_EVENT, handleLeaveRoom);
      socket.off(SEND_READY_EVENT, handleReadyEvent);
      socket.off(CHANGE_CURRENT_PLAYER, handleChangeCurrentPlayer);
    };
  }, [
    socket,
    handleJoinRoom,
    handleLeaveRoom,
    handleReadyEvent,
    handleChangeCurrentPlayer,
  ]);

  return (
    <Fragment>
      <GameHeader />
      <div style={{ position: "relative", top: "3rem" }}>
        <Game
          key={resetGameKey}
          gameStart={playable}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          onReset={() => setResetGameKey((prev) => !prev)}
        />
        <Chat messages={messages} setMessages={setMessages} />
        {/* {props.mode === "multi" ? (
          <>
            <Game
              key={resetGameKey}
              gameStart={playable}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              onReset={() => setResetGameKey((prev) => !prev)}
            />
            <Chat messages={messages} setMessages={setMessages} />
          </>
        ) : (
          <GameSingle
            key={resetGameKey}
            gameStart={playable}
            setPlayable={setPlayable}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            onReset={() => setResetGameKey((prev) => !prev)}
          />
        )} */}
      </div>
    </Fragment>
  );
};

export default GameContainer;
