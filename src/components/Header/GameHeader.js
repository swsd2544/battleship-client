import classes from "./GameHeader.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Music from "../Header/Music";
import useAudio from "../../hooks/useAudio";
import niceMusic from "../../assets/battleship.mp3";
import Modal from "../UI/Modal";
import { useState, Fragment, useContext } from "react";
import { logActions } from "../../store/logSlice";
import { resetUserBoard } from "../../store/boardGenerate";
import { enemyActions } from "../../store/enemySlice";
import { resetScore } from "../../store/userSlice";
import { SocketContext } from "../../context/socket";

const LEAVE_ROOM_EVENT = "leaveRoom";

const GameHeader = () => {
  const [playing, setPlaying] = useAudio(niceMusic);
  const [leave, setLeave] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  // const match = useRouteMatch();
  // //console.log(match.params.roomId);

  const confirmHandler = () => {
    setLeave(false);
    dispatch(logActions.leftGame());
    //re-board here
    //rescore!!!!
    dispatch(resetUserBoard());
    dispatch(resetScore());
    dispatch(enemyActions.clearEnemy());
    dispatch(enemyActions.resetScore());
    history.replace("/");
    socket.emit(LEAVE_ROOM_EVENT);
  };

  const cancelHandler = () => {
    setLeave(false);
  };

  const leaveHandler = () => {
    setLeave(true);
  };

  const checkExit = (
    <Modal>
      <form>
        <h1>Are you sure you want to leave?</h1>
        <button className={classes.buttoncancel} onClick={cancelHandler}>
          cancel
        </button>
        <button className={classes.buttonwarning} onClick={confirmHandler}>
          confirm
        </button>
      </form>
    </Modal>
  );

  return (
    <Fragment>
      {leave && checkExit}
      <header className={classes.header}>
        <Music playing={playing} setPlaying={setPlaying} />
        <div className={classes.logo}>The Battle Begins</div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <button onClick={leaveHandler}>Leave game!</button>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default GameHeader;
