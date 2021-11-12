import { useContext, useCallback } from "react";
import classes from "./RoomDetail.module.css";
import { SocketContext } from "../context/socket";

const SEND_RESET_EVENT = "sendReset";

const RoomDetail = (props) => {
  const socket = useContext(SocketContext);

  const clickResetHandler = useCallback(() => {
    //console.log("reset click");
    socket.emit(SEND_RESET_EVENT, props.room.roomId);
  }, [props.room.roomId, socket]);

  return (
    <li className={classes.items}>
      <div>
        <h3 className={classes.roomname}>Room Name: {props.room.roomName}</h3>
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
        <button className={classes.button} onClick={clickResetHandler}>
          Reset
        </button>
      </div>
    </li>
  );
};

export default RoomDetail;
