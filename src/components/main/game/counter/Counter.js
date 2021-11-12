import React, { useState, useEffect, useContext } from "react";
import "./Counter.css";
import { SocketContext } from "../../../../context/socket";

const CHANGE_CURRENT_PLAYER = "changePlayer";

const Counter = (props) => {
  const socket = useContext(SocketContext);
  const [timer, setTimer] = useState(10);

  //start when game start (both player ready)
  //start when enemy click
  //reset when user click
  //reset when server reset, game reset, game end
  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (props.start) {
        if (props.reset) {
          setTimer(10);
          props.setReset(false);
        } else if (props.player === "user") {
          setTimer((prevCounter) => prevCounter - 1);
          if (timer === 0) {
            setTimer(10);
            props.setPlayer("enemy");
            //console.log("Change current player from counter");
            if (props.mode === "multi") socket.emit(CHANGE_CURRENT_PLAYER);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [props, socket, timer]);

  return <h2 className="timer">Timer: {timer}</h2>;
};

export default Counter;
