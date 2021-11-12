import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Board from "./Board";
import { generateEnemyShips } from "../../../../store/boardGenerate";
import EnemyInfo from "./EnemyInfo";

export default function EnemyContainer(props) {
  const board = useSelector((state) => state.generateBoard.enemyBoard);

  // For Single Player Mode
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateEnemyShips());
  }, [dispatch]);

  return (
    <div>
      <EnemyInfo />
      <div id="enemyBoard">
        <Board
          pressing={true}
          restartTimer={props.setClick}
          boardid="ohyeah"
          board={board}
          player="enemy"
          onClickSquare={props.onClick}
        />
      </div>
    </div>
  );
}
