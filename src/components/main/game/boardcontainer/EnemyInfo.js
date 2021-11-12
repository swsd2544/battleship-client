import { useSelector } from "react-redux";
import classes from "./EnemyInfo.module.css";
import { useRouteMatch } from "react-router-dom";
import { useState } from "react";

export default function EnemyInfo() {
  const enemy = useSelector((state) => state.enemy);
  const match = useRouteMatch();
  const playBot = match.url === "/game";

  return (
    <div className={classes.container}>
      <img
        src={`https://avatars.dicebear.com/api/big-smile/${enemy.name}.svg`}
        alt="avatar"
        width="50"
        height="50"
      />
      <div className={classes.bodybox}>
        {playBot ? <h3>Computer</h3> : <h3>Name: {enemy.name}</h3>}
        <h3>Score: {enemy.score}</h3>
      </div>
    </div>
  );
}
