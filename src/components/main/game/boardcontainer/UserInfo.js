import React from "react";
import { useSelector } from "react-redux";
import classes from "./UserInfo.module.css";

export default function UserInfo() {
  const username = useSelector((state) => state.log.username);
  const userScore = useSelector((state) => state.user);

  return (
    <div className={classes.container}>
      <img
        src={`https://avatars.dicebear.com/api/big-smile/${username}.svg`}
        alt="avatar"
        width="50"
        height="50"
      />
      <div className={classes.bodybox}>
        <h3>Name: {username}</h3>
        <h3>Score: {userScore.score}</h3>
      </div>
    </div>
  );
}
