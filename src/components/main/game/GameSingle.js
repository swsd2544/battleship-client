import UserContainer from "./boardcontainer/UserContainer";
import EnemyContainer from "./boardcontainer/EnemyContainer";
import Modal from "../../UI/Modal";
import classes from "./GameSingle.module.css";
import { Fragment, useState, useEffect } from "react";
import Counter from "./counter/Counter";
import Placeholder from "./boardcontainer/Placeholder";
import { useSelector, useDispatch } from "react-redux";
import { shoot, resetUserBoard } from "../../../store/boardGenerate";
import { updateScore, resetScore } from "../../../store/userSlice";
import { enemyActions } from "../../../store/enemySlice";
import { useHistory } from "react-router-dom";

let playerShip1Health = 0;
let playerShip2Health = 0;
let playerShip3Health = 0;
let playerShip4Health = 0;

let enemyShip1Health = 0;
let enemyShip2Health = 0;
let enemyShip3Health = 0;
let enemyShip4Health = 0;

const GameSingle = (props) => {
  const [gameEnd, setGameEnd] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const enemyInfo = useSelector((state) => state.enemy);
  const userBoard = useSelector((state) => state.generateBoard.userBoard);
  const enemyBoard = useSelector((state) => state.generateBoard.enemyBoard);
  const [userWin, setUserWin] = useState(null);
  const [showDestroyCpuShip1, setshowDestroyCpuShip1] = useState(false);
  const [showDestroyCpuShip2, setshowDestroyCpuShip2] = useState(false);
  const [showDestroyCpuShip3, setshowDestroyCpuShip3] = useState(false);
  const [showDestroyCpuShip4, setshowDestroyCpuShip4] = useState(false);
  const [showDestroyPlayerShip1, setshowDestroyPlayerShip1] = useState(false);
  const [showDestroyPlayerShip2, setshowDestroyPlayerShip2] = useState(false);
  const [showDestroyPlayerShip3, setshowDestroyPlayerShip3] = useState(false);
  const [showDestroyPlayerShip4, setshowDestroyPlayerShip4] = useState(false);
  const [userStart, setUserStart] = useState(true);

  const history = useHistory();

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

  const onRestart = () => {
    setGameEnd(false);
    //console.log("restart");
    dispatch(resetScore());
    dispatch(enemyActions.resetScore());
    dispatch(resetUserBoard());
    props.onReset();
  };

  const onLeave = () => {
    history.push("/");
    dispatch(resetScore());
    dispatch(enemyActions.resetScore());
    dispatch(resetUserBoard());
    setGameEnd(false);
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

  const dispatch = useDispatch();

  let currentPlayer = "user";

  /*const playGame = () => {
    if (userStart) {
      //onClickHandler();
    } else if (!userStart) {
      setTimeout(computerGo, 1000);
    } else {
      //console.log("can not find current player");
    }
  };*/

  const playGame = () => {
    if (userStart) {
      onClickHandler();
    } else if (!userStart) {
      setTimeout(computerGo, 1000);
    } else {
      console.log("can not find current player");
    }
  };

  const computerGo = () => {
    let randomX = Math.floor(Math.random() * 8);
    let randomY = Math.floor(Math.random() * 8);
    if (userBoard[randomY][randomX].isSelected) {
      computerGo();
      return;
    }
    dispatch(shoot({ x: randomX, y: randomY, player: "user" }));
    if (userBoard[randomY][randomX].isShip) {
      let shipHit = null;
      shipHit = userBoard[randomY][randomX].shipName;
      let isDestroyed = increasePlayerShipHealth(shipHit);

      if (isDestroyed) {
        //console.log("cpu destroyed " + shipHit);
        if (showDestroyPlayerShip3) {
          setshowDestroyPlayerShip4(true);
        }
        if (showDestroyPlayerShip2) {
          setshowDestroyPlayerShip3(true);
        }
        if (showDestroyPlayerShip1) {
          setshowDestroyPlayerShip2(true);
        }
        setshowDestroyPlayerShip1(true);
      }
      dispatch(enemyActions.updateScore({ updateAmount: 1 }));
    }
    currentPlayer = "user";
    //setUserStart(true);
  };

  const onClickHandler = (x, y, player) => {
    //if (userStart) {
    if (props.gameStart) {
      if (enemyBoard[y][x].isSelected) {
        playGame();
        return;
      }
      //console.log(`You clicked a square at row ${y} column ${x}`);
      dispatch(shoot({ x: x, y: y, player: player }));
      let shipHit = null;
      shipHit = enemyBoard[y][x].shipName;
      if (enemyBoard[y][x].isShip) {
        let isDestroyed = false;
        isDestroyed = increaseEnemyShipHealth(shipHit);
        if (isDestroyed) {
          //console.log("you destroyed " + shipHit);
          if (showDestroyCpuShip3) {
            setshowDestroyCpuShip4(true);
          }
          if (showDestroyCpuShip2) {
            setshowDestroyCpuShip3(true);
          }
          if (showDestroyCpuShip1) {
            setshowDestroyCpuShip2(true);
          }
          setshowDestroyCpuShip1(true);
        }
        dispatch(updateScore({ updateAmount: 1 }));
      }
      currentPlayer = "enemy";
      //setUserStart(false);
      playGame();
    }
    //}
  };

  // fix score delay
  useEffect(() => {
    //console.log("user score", userInfo.score);
    //console.log("enemy score", enemyInfo.score);
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
        <UserContainer currentPlayer={userStart} />

        <div className={classes.bodybox}>
          {/* <Counter
            mode="single"
            reset={resetTimer}
            setReset={setResetTimer}
            start={props.gameStart}
            player={props.currentPlayer}
            setPlayer={props.setCurrentPlayer}
          /> */}
          {showDestroyCpuShip1 && <h3>You destroyed ship no.1</h3>}
          {showDestroyCpuShip2 && <h3>You destroyed ship no.2</h3>}
          {showDestroyCpuShip3 && <h3>You destroyed ship no.3</h3>}
          {showDestroyCpuShip4 && <h3>You destroyed ship no.4</h3>}
          {showDestroyPlayerShip1 && <h3>Cpu destroyed ship no.1</h3>}
          {showDestroyPlayerShip2 && <h3>Cpu destroyed ship no.2</h3>}
          {showDestroyPlayerShip3 && <h3>Cpu destroyed ship no.3</h3>}
          {showDestroyPlayerShip4 && <h3>Cpu destroyed ship no.4</h3>}
        </div>

        <EnemyContainer onClick={onClickHandler} />
      </div>
      <Placeholder mode="single" setPlayable={props.setPlayable} />
    </div>
  );
};

export default GameSingle;
