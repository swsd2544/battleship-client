import UserContainer from "./boardcontainer/UserContainer";
import EnemyContainer from "./boardcontainer/EnemyContainer";
import Modal from "../../UI/Modal";
import classes from "./Game.module.css";
import { Fragment, useState, useEffect, useContext, useCallback } from "react";
import Counter from "./counter/Counter";
import Placeholder from "./boardcontainer/Placeholder";
import { useSelector, useDispatch } from "react-redux";
import {
  shoot,
  resetUserBoard,
  resetEnemyBoard,
} from "../../../store/boardGenerate";
import { updateScore, resetScore } from "../../../store/userSlice";
import { enemyActions } from "../../../store/enemySlice";
import { useHistory, useRouteMatch } from "react-router-dom";
import { SocketContext } from "../../../context/socket";

let playerShip1Health = 0;
let playerShip2Health = 0;
let playerShip3Health = 0;
let playerShip4Health = 0;

let enemyShip1Health = 0;
let enemyShip2Health = 0;
let enemyShip3Health = 0;
let enemyShip4Health = 0;

const LEAVE_ROOM_EVENT = "leaveRoom";
const SEND_SHOOT_EVENT = "sendShoot";
const SEND_RESET_EVENT = "sendReset";

const Game = (props) => {
  const socket = useContext(SocketContext);
  const [gameEnd, setGameEnd] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const enemyInfo = useSelector((state) => state.enemy);
  const userBoard = useSelector((state) => state.generateBoard.userBoard);
  const enemyBoard = useSelector((state) => state.generateBoard.enemyBoard);
  const [userWin, setUserWin] = useState(null);
  const [showDestroyShip1, setShowDestroyShip1] = useState(false);
  const [showDestroyShip2, setShowDestroyShip2] = useState(false);
  const [showDestroyShip3, setShowDestroyShip3] = useState(false);
  const [showDestroyShip4, setShowDestroyShip4] = useState(false);
  const [showDestroyPlayerShip1, setShowDestroyPlayerShip1] = useState(false);
  const [showDestroyPlayerShip2, setShowDestroyPlayerShip2] = useState(false);
  const [showDestroyPlayerShip3, setShowDestroyPlayerShip3] = useState(false);
  const [showDestroyPlayerShip4, setShowDestroyPlayerShip4] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();
  const match = useRouteMatch();

  function increasePlayerShipHealth(id) {
    switch (id) {
      case "ship1-0":
        playerShip1Health++;
        if (playerShip1Health >= 4) {
          return true;
        }
        break;
      case "ship2-0":
        playerShip2Health++;
        if (playerShip2Health >= 4) {
          return true;
        }
        break;
      case "ship3-0":
        playerShip3Health++;
        if (playerShip3Health >= 4) {
          return true;
        }
        break;
      case "ship4-0":
        playerShip4Health++;
        if (playerShip4Health >= 4) {
          return true;
        }
        break;
      default:
        //console.log("can not find ship to set");
        break;
    }
    return false;
  }

  function increaseEnemyShipHealth(id) {
    switch (id) {
      case "ship1-0":
        enemyShip1Health++;
        if (enemyShip1Health >= 4) {
          return true;
        }
        break;
      case "ship2-0":
        enemyShip2Health++;
        if (enemyShip2Health >= 4) {
          return true;
        }
        break;
      case "ship3-0":
        enemyShip3Health++;
        if (enemyShip3Health >= 4) {
          return true;
        }
        break;
      case "ship4-0":
        enemyShip4Health++;
        if (enemyShip4Health >= 4) {
          return true;
        }
        break;
      default:
        //console.log("can not find ship to set");
        break;
    }
    return false;
  }

  const onRestart = useCallback(() => {
    //console.log("restart!!!!");
    setGameEnd(false);
    dispatch(resetScore());
    dispatch(enemyActions.resetScore());
    dispatch(resetUserBoard());
    props.setCurrentPlayer("");
    setResetTimer(true);
    socket.emit(SEND_RESET_EVENT, { roomId: match.url });

    playerShip1Health = 0;
    playerShip2Health = 0;
    playerShip3Health = 0;
    playerShip4Health = 0;

    enemyShip1Health = 0;
    enemyShip2Health = 0;
    enemyShip3Health = 0;
    enemyShip4Health = 0;

    props.onReset();
  }, [dispatch, socket, match.url, props]);

  const onLeave = () => {
    //console.log("leaving the room!!!!");
    history.push("/");
    setGameEnd(false);
    dispatch(resetScore());
    dispatch(enemyActions.resetScore());
    dispatch(resetUserBoard());
    dispatch(resetEnemyBoard());
    socket.emit(LEAVE_ROOM_EVENT);
    setResetTimer(true);
  };

  const endScreen = (
    <Fragment>
      {userWin ? <h1>You won!</h1> : <h1>You lost!</h1>}
      <div className={classes.actions}>
        <button type="button" className={classes.submit} onClick={onLeave}>
          leave
        </button>
        <button type="button" onClick={onRestart}>
          rematch
        </button>
      </div>
    </Fragment>
  );

  function handleSendShot({ x, y }) {
    dispatch(shoot({ x, y, player: "enemy" }));
    if (enemyBoard[y][x].isShip) {
      let shipHit = enemyBoard[y][x].shipName;
      let isDestroyed = increaseEnemyShipHealth(shipHit);

      if (isDestroyed) {
        //console.log("enemy ship destroyed " + shipHit);
        if (showDestroyShip3) {
          setShowDestroyShip4(true);
        } else if (showDestroyShip2) {
          setShowDestroyShip3(true);
        } else if (showDestroyShip1) {
          setShowDestroyShip2(true);
        } else {
          setShowDestroyShip1(true);
        }
      }
      dispatch(updateScore({ updateAmount: 1 }));
    } else {
      props.setCurrentPlayer("enemy");
    }
    setResetTimer(true);
    socket.emit(SEND_SHOOT_EVENT, { x, y });
  }

  const onClickHandler = (x, y, player) => {
    if (props.currentPlayer === "user") {
      if (props.gameStart) {
        if (enemyBoard[y][x].isSelected) {
          //console.log("!!!!");
          setResetTimer(true);
          return;
        }
        //console.log(`You clicked a square at row ${y} column ${x}`);
        handleSendShot({ x, y });
      }
    }
  };

  const handleReceiveShot = useCallback(
    ({ x, y }) => {
      dispatch(shoot({ x, y, player: "user" }));
      if (userBoard[y][x].isShip) {
        const shipHit = userBoard[y][x].shipName;
        const isDestroyed = increasePlayerShipHealth(shipHit);

        if (isDestroyed) {
          //console.log("our ship destroyed " + shipHit);
          if (showDestroyPlayerShip3) {
            setShowDestroyPlayerShip4(true);
          } else if (showDestroyPlayerShip2) {
            setShowDestroyPlayerShip3(true);
          } else if (showDestroyPlayerShip1) {
            setShowDestroyPlayerShip2(true);
          } else {
            setShowDestroyPlayerShip1(true);
          }
        }
        dispatch(enemyActions.updateScore({ updateAmount: 1 }));
      } else {
        props.setCurrentPlayer("user");
      }
      //       setResetTimer(true);
    },
    [
      props,
      dispatch,
      userBoard,
      showDestroyPlayerShip1,
      showDestroyPlayerShip2,
      showDestroyPlayerShip3,
    ]
  );

  useEffect(() => {
    socket.on(SEND_SHOOT_EVENT, handleReceiveShot);
    socket.on(SEND_RESET_EVENT, onRestart);
    socket.on(LEAVE_ROOM_EVENT, onRestart);
    return () => {
      socket.off(SEND_SHOOT_EVENT, handleReceiveShot);
      socket.off(SEND_RESET_EVENT, onRestart);
      socket.off(LEAVE_ROOM_EVENT, onRestart);
    };
  }, [socket, handleReceiveShot, onRestart]);

  // fix score delay
  useEffect(() => {
    // //console.log("user score", userInfo.score);
    // //console.log("enemy score", enemyInfo.score);
    if (userInfo.score === 16) {
      //console.log("user wins");
      setGameEnd(true);
      setUserWin(true);
    }
    if (enemyInfo.score === 16) {
      //console.log("enemy wins");
      setGameEnd(true);
      setUserWin(false);
    }
  }, [userInfo, enemyInfo]);

  return (
    <div>
      {gameEnd && (
        <Modal>
          <div className={classes.form}>
            <form>{endScreen}</form>
          </div>
        </Modal>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "baseline",
          marginBottom: "1vh",
        }}
      >
        <UserContainer currentPlayer={props.currentPlayer} />

        <div className={classes.bodybox}>
          <Counter
            mode="multi"
            reset={resetTimer}
            setReset={setResetTimer}
            start={props.gameStart}
            player={props.currentPlayer}
            setPlayer={props.setCurrentPlayer}
          />
          {showDestroyShip1 && <h3>You destroyed ship no.1</h3>}
          {showDestroyShip2 && <h3>You destroyed ship no.2</h3>}
          {showDestroyShip3 && <h3>You destroyed ship no.3</h3>}
          {showDestroyShip4 && <h3>You destroyed ship no.4</h3>}
          {showDestroyPlayerShip1 && <h3>Opponent destroyed ship no.1</h3>}
          {showDestroyPlayerShip2 && <h3>Opponent destroyed ship no.2</h3>}
          {showDestroyPlayerShip3 && <h3>Opponent destroyed ship no.3</h3>}
          {showDestroyPlayerShip4 && <h3>Opponent destroyed ship no.4</h3>}
        </div>

        <EnemyContainer onClick={onClickHandler} />
      </div>
      <Placeholder mode="multi" />
    </div>
  );
};

export default Game;
