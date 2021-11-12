import React from "react";
import { useSelector } from "react-redux";
import Board from "./Board";
import UserInfo from "./UserInfo";

export default function UserContainer(props) {
  const board = useSelector((state) => state.generateBoard.userBoard);

  return (
    <div style={{ marginTop: "20px" }}>
      <UserInfo />
      <div id="userBoard">
        <Board board={board} player="user" pressing={false} />
      </div>
      <h3 style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {props.currentPlayer !== ""
          ? props.currentPlayer === "user"
            ? "Your Go"
            : "Enemy Go"
          : ""}
      </h3>
    </div>
  );
}
