import { useRef, useState, useContext, useCallback } from "react";
import classes from "./CreateRoom.module.css";
import { Link } from "react-router-dom/";
import { v4 as uuidv4 } from "uuid";
import useInput from "../../../../hooks/useInput";
import { SocketContext } from "../../../../context/socket";

//join link with room id

const CREATE_ROOM_EVENT = "createRoom";

const CreateRoom = (props) => {
  const roomId = useRef(uuidv4());
  const socket = useContext(SocketContext);
  const [description, setDescription] = useState("");
  const notEmpty = (item) => item.trim() !== "";
  const {
    value: roomName,
    valid: roomNameValid,
    touchInvalid: roomNameTouchInvalid,
    onChangeHandler: roomNameChangeHandler,
    onBlurHandler: roomNameBlurHandler,
  } = useInput(notEmpty);

  const handleCreateRoom = useCallback(() => {
    socket.emit(CREATE_ROOM_EVENT, {
      roomId: roomId.current,
      roomName,
      description,
    });
  }, [socket, roomId, roomName, description]);

  const onCreateGameHandler = () => {
    if (!localStorage.getItem("username")) {
      return;
    }

    handleCreateRoom();
    //console.log("created!");
  };

  const roomClasses = `${classes.control} ${
    roomNameTouchInvalid ? classes.invalid : ""
  }`;

  return (
    <section className={classes.summary}>
      <h2>Create room</h2>
      <div className={classes.actions}>
        <div className={roomClasses}>
          <label>Room Name:</label>
          <input
            value={roomName}
            onChange={roomNameChangeHandler}
            onBlur={roomNameBlurHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Description:</label>
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <Link to={`/game/${roomId.current}`}>
          <button
            type="button"
            disabled={!roomNameValid}
            className={classes.submit}
            onClick={onCreateGameHandler}
          >
            Create
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CreateRoom;
