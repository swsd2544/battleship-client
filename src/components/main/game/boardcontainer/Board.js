import { useState, useEffect } from "react";

export default function Board(props) {
  return (
    <table
      style={{
        borderSpacing: 0.5,
        padding: "0.5rem",
        border: "1px solid black",
      }}
    >
      <tbody>
        {props.board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((square, colIndex) => (
              <Square
                restartTimer={props.restartTimer}
                key={rowIndex + "" + colIndex}
                x={colIndex}
                y={rowIndex}
                square={square}
                player={props.player}
                onClickSquare={props.onClickSquare}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Square(props) {
  const [bgColor, setBgColor] = useState("grey");

  useEffect(() => {
    if (props.square.isShip && !props.square.isSelected) {
      setBgColor("green");
      if (props.player === "enemy") setBgColor("grey");
    } else if (props.square.isShip && props.square.isSelected) {
      setBgColor("red");
    } else if (!props.square.isShip && props.square.isSelected) {
      setBgColor("black");
    } else {
      setBgColor("grey");
    }
  }, [props.square.isShip, props.square.isSelected, props.player]);

  function handleClick() {
    if (!props.onClickSquare) return;
    if (!props.square.isSelected) {
      //props.restartTimer(true);
      props.onClickSquare(props.x, props.y, props.player);
    }
  }

  return (
    <td>
      <div
        className="square"
        onClick={handleClick}
        data-x={props.x}
        data-y={props.y}
        style={{ width: "2rem", height: "2rem", backgroundColor: bgColor }}
      ></div>
    </td>
  );
}
