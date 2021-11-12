import React from "react";
import classes from "./Music.module.css";

const Music = (props) => {
  return (
    <button
      className={classes.button}
      onClick={() => props.setPlaying((prev) => !prev)}
    >
      {props.playing ? "Music: On" : "Music: Off "}
    </button>
  );
};
export default Music;
