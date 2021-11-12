import { useState, useEffect, useContext } from "react";
import classes from "./RoomItem.module.css";
import { Link } from "react-router-dom";
import { SocketContext } from "../../../../../context/socket";

const JOIN_ROOM_EVENT = "joinRoom";

const RoomItem = (props) => {
  const socket = useContext(SocketContext);
  const [joinable, setJoinable] = useState(false);

  const joinRoom = () => {
    socket.emit(JOIN_ROOM_EVENT, props.room.roomId);
  };

  useEffect(() => {
    if (Object.keys(props.room.users).length === 2) {
      setJoinable(false);
    } else {
      setJoinable(true);
    }
  }, [props]);

  return (
    <li className={classes.room}>
      <div>
        <h3>Room Name: {props.room.roomName}</h3>
        <div className={classes.description}>{props.room.description}</div>
        <div className={classes.id}>Room ID: {props.room.roomId}</div>
      </div>
      <img
        src={`https://avatars.dicebear.com/api/big-smile/${
          Object.values(props.room.users)[0][1]
        }.svg`}
        alt="avatar"
        width="50"
        height="50"
      />
      <div className={classes.actions}>
        <Link to={`/game/${props.room.roomId}`}>
          <button
            disabled={!joinable}
            className={classes.button}
            onClick={joinRoom}
          >
            Join
          </button>
        </Link>
      </div>
    </li>
  );
};

export default RoomItem;
