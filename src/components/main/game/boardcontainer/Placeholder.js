import React, { useState } from "react";
import classes from "./Placeholder.module.css";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../../../context/socket";
import { setUserBoard, resetUserBoard } from "../../../../store/boardGenerate";

const SEND_READY_EVENT = "sendReady";

export default function Placeholder(props) {
  const socket = useContext(SocketContext);
  const userSquares = [];
  const ships = [];
  const userBoard = useSelector((state) => state.generateBoard.userBoard);
  const dispatch = useDispatch();

  const [isHorizontal, setHorizontal] = useState(true);
  const [isShip1Hidden, setShip1Hidden] = useState(true);
  const [isShip2Hidden, setShip2Hidden] = useState(true);
  const [isShip3Hidden, setShip3Hidden] = useState(true);
  const [isShip4Hidden, setShip4Hidden] = useState(true);
  const [isButtonHidden, setButtonHidden] = useState(true);

  const handleRotate = () => {
    setHorizontal(!isHorizontal);
  };

  const handleShipHidden = (id) => {
    switch (id) {
      case "ship1-0":
        setShip1Hidden(false);
        break;
      case "ship2-0":
        setShip2Hidden(false);
        break;
      case "ship3-0":
        setShip3Hidden(false);
        break;
      case "ship4-0":
        setShip4Hidden(false);
        break;
      default:
        //console.log("can not find ship to set");
        break;
    }
  };

  const handleShipShow = (id) => {
    switch (id) {
      case "ship1-0":
        setShip1Hidden(true);
        break;
      case "ship2-0":
        setShip2Hidden(true);
        break;
      case "ship3-0":
        setShip3Hidden(true);
        break;
      case "ship4-0":
        setShip4Hidden(true);
        break;
      default:
        //console.log("can not find ship to set");
        break;
    }
  };

  useEffect(() => {
    //let selectedShipNameWithIndex;
    const shipsHtml = document.getElementsByClassName(
      "Placeholder_ship__1e2qy"
    );
    const userSquaresHtml = document
      .getElementById("userBoard")
      .getElementsByClassName("square");
    for (let i = 0; i < shipsHtml.length; i++) ships.push(shipsHtml[i]);
    for (let i = 0; i < userSquaresHtml.length; i++) {
      userSquares.push(userSquaresHtml[i]);
      userSquares[i].dataset.id = i;
    }
    ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));

    userSquares.forEach((square) =>
      square.addEventListener("dragover", dragOver)
    );
    userSquares.forEach((square) =>
      square.addEventListener("dragenter", dragEnter)
    );
    userSquares.forEach((square) =>
      square.addEventListener("dragleave", dragLeave)
    );
    userSquares.forEach((square) => square.addEventListener("drop", dragDrop));
    userSquares.forEach((square) =>
      square.addEventListener("dragend", dragEnd)
    );
    ships.forEach((ship) =>
      ship.addEventListener("mousedown", (e) => {
        selectedShipNameWithIndex = e.target.id;
      })
    );

    return () => {
      ships.forEach((ship) => ship.removeEventListener("dragstart", dragStart));
      userSquares.forEach((square) =>
        square.removeEventListener("dragover", dragOver)
      );
      userSquares.forEach((square) =>
        square.removeEventListener("dragenter", dragEnter)
      );
      userSquares.forEach((square) =>
        square.removeEventListener("dragleave", dragLeave)
      );
      userSquares.forEach((square) =>
        square.removeEventListener("drop", dragDrop)
      );
      userSquares.forEach((square) =>
        square.removeEventListener("dragend", dragEnd)
      );
      ships.forEach((ship) =>
        ship.removeEventListener("mousedown", (e) => {
          selectedShipNameWithIndex = e.target.id;
        })
      );
    };
  }, [
    isHorizontal,
    isShip1Hidden,
    isShip2Hidden,
    isShip3Hidden,
    isShip4Hidden,
    isButtonHidden,
    /*dragDrop,
    dragStart,
    ships,
    userSquares*/
  ]);

  let draggedShip;
  let selectedShipNameWithIndex;
  let draggedShipLength;

  function dragStart() {
    draggedShip = this;
    draggedShipLength = this.childNodes.length; // length of the ship being dragged
  }

  /*function dragStart() {
    const dragStart = useCallback(() => {
      draggedShip = this;
      draggedShipLength = this.childNodes.length; // length of the ship being dragged
    })
  }*/

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    //console.log("drag leaving...");
  }

  function dragDrop() {
    //console.log("dropping...");
    let shipNameWithLastId = draggedShip.lastChild.id; //ship1-3
    //let shipClass = shipNameWithLastId.slice(0, -2);
    let shipName = draggedShip.firstChild.id;

    if (!shipNameWithLastId) return;
    if (!selectedShipNameWithIndex) return;
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1)); // always 3
    let shipLastId;
    let shipFirstId = parseInt(this.dataset.id);
    //console.log(selectedShipNameWithIndex);
    let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));
    let shipAllPosition = [];

    if (isHorizontal) {
      shipLastId = lastShipIndex + parseInt(this.dataset.id);
      //console.log(selectedShipIndex);
      shipLastId = shipLastId - selectedShipIndex;
      //console.log(shipLastId);
      shipFirstId = shipFirstId - selectedShipIndex;
      shipAllPosition = [
        shipLastId - 3,
        shipLastId - 2,
        shipLastId - 1,
        shipLastId,
      ];
    } else {
      shipLastId = 8 * lastShipIndex + parseInt(this.dataset.id);
      shipLastId = shipLastId - 8 * selectedShipIndex;
      shipFirstId = shipFirstId - 8 * selectedShipIndex;
      shipAllPosition = [
        shipFirstId,
        shipFirstId + 8,
        shipFirstId + 16,
        shipFirstId + 24,
      ];
    }

    if (shipLastId >= 64 || shipFirstId < 0) {
      return;
    }

    //console.log(shipLastId);
    //console.log(shipAllPosition);
    const isTaken = shipAllPosition.some((position) =>
      userSquares[position].classList.contains("taken")
    );
    const notAllowedHorizontal = [
      0, 8, 16, 24, 32, 40, 48, 56, 1, 9, 17, 25, 33, 41, 49, 57, 2, 10, 18, 26,
      34, 42, 50, 58,
    ];

    if (
      isHorizontal &&
      !notAllowedHorizontal.includes(shipLastId) &&
      shipFirstId !== 63 &&
      !isTaken
    ) {
      //console.log("Put horizontally");
      for (let i = 0; i < draggedShipLength; i++) {
        userSquares[shipFirstId + i].classList.add("taken");
      }
    } else if (!isHorizontal && !isTaken) {
      //console.log("Put vertically");
      for (let i = 0; i < draggedShipLength; i++) {
        userSquares[shipFirstId + 8 * i].classList.add("taken");
      }
    } else return;

    let positionList = [];

    for (let i = 0; i < userSquares.length; i++) {
      if (
        userSquares[i].classList.contains("taken") &&
        !userBoard[Math.floor(i / 8)][i % 8].shipName
      ) {
        // get list of [x,y] of each ship's square e.g. [['2','5'],['3','5'],['4','5'],['5','5']]
        positionList.push([
          userSquares[i].dataset.x,
          userSquares[i].dataset.y,
          shipName,
        ]);
      }
    }
    dispatch(setUserBoard({ shipPositions: positionList }));
    /*const gridDisplayHtml = document.getElementsByClassName(
      "Placeholder_bodybox__1mHDw"
    );
    const gridDisplay = gridDisplayHtml[0];
    gridDisplay.removeChild(draggedShip);*/
    handleShipHidden(shipName);
    //console.log("remove ship from display grid successfully");
  }

  function dragEnd() {
    //console.log("drag ending...");
  }

  const handleReset = () => {
    for (
      let i = 0;
      i <
      document.getElementById("userBoard").getElementsByClassName("square")
        .length;
      i++
    ) {
      document
        .getElementById("userBoard")
        .getElementsByClassName("square")
        [i].classList.remove("taken");
    }
    dispatch(resetUserBoard());
    handleShipShow("ship1-0");
    handleShipShow("ship2-0");
    handleShipShow("ship3-0");
    handleShipShow("ship4-0");
  };

  const handleConfirm = () => {
    // check if ships are all on the board (if they are all hidden) before going to playing stage
    // socket.emit(NEW_CHAT_MESSAGE_EVENT, {
    //   body: newMessage,
    // });
    if (!isShip1Hidden && !isShip2Hidden && !isShip3Hidden && !isShip4Hidden) {
      if (props.mode === "multi")
        socket.emit(SEND_READY_EVENT, { board: userBoard });
      if (props.mode === "single") props.setPlayable(true);
      setButtonHidden(false);
    }
  };

  const ship1Hidden = isShip1Hidden && (
    <div
      className={
        isHorizontal
          ? [classes.ship, classes.ship1container].join(" ")
          : [
              classes.ship,
              classes.ship1container,
              classes.ship1containervertical,
            ].join(" ")
      }
      draggable="true"
    >
      <div id="ship1-0"></div>
      <div id="ship1-1"></div>
      <div id="ship1-2"></div>
      <div id="ship1-3"></div>
    </div>
  );

  const ship2Hidden = isShip2Hidden && (
    <div
      className={
        isHorizontal
          ? [classes.ship, classes.ship2container].join(" ")
          : [
              classes.ship,
              classes.ship2container,
              classes.ship2containervertical,
            ].join(" ")
      }
      draggable="true"
    >
      <div id="ship2-0"></div>
      <div id="ship2-1"></div>
      <div id="ship2-2"></div>
      <div id="ship2-3"></div>
    </div>
  );

  const ship3Hidden = isShip3Hidden && (
    <div
      className={
        isHorizontal
          ? [classes.ship, classes.ship3container].join(" ")
          : [
              classes.ship,
              classes.ship3container,
              classes.ship3containervertical,
            ].join(" ")
      }
      draggable="true"
    >
      <div id="ship3-0"></div>
      <div id="ship3-1"></div>
      <div id="ship3-2"></div>
      <div id="ship3-3"></div>
    </div>
  );

  const ship4Hidden = isShip4Hidden && (
    <div
      className={
        isHorizontal
          ? [classes.ship, classes.ship4container].join(" ")
          : [
              classes.ship,
              classes.ship4container,
              classes.ship4containervertical,
            ].join(" ")
      }
      draggable="true"
    >
      <div id="ship4-0"></div>
      <div id="ship4-1"></div>
      <div id="ship4-2"></div>
      <div id="ship4-3"></div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {isButtonHidden && (
        <>
          <div className={classes.bodybox}>
            <h3>Place Your Ships!</h3>
            <button onClick={handleReset}>Reset Board</button>
            <button id="rotate" onClick={handleRotate}>
              Rotate Your Ships
            </button>
            <button id="confirm" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
          <div className={classes.bodybox}>
            {ship1Hidden}
            {ship2Hidden}
            {ship3Hidden}
            {ship4Hidden}
          </div>
        </>
      )}
    </div>
  );
}
