import React, { useState, Fragment, useContext } from "react";
import Modal from "./UI/Modal";
import classes from "./LoginMenu.module.css";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { logActions } from "../store/logSlice";
import { SocketContext } from "../context/socket";

const SEND_USERNAME_EVENT = "sendUsernane";

const LoginMenu = () => {
  const socket = useContext(SocketContext);
  const notEmpty = (item) => item.trim() !== "";

  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();

  const {
    value: userNameValue,
    valid: userNameValid,
    touchInvalid: userNameTouchInvalid,
    onChangeHandler: userNameChangeHandler,
    onBlurHandler: userNameBlurHandler,
    name,
  } = useInput(notEmpty);

  const onClickName = (event) => {
    event.preventDefault();
    userNameBlurHandler();
    if (userNameValid) {
      setOk((prev) => !prev);
    }
  };

  const submitUsernameHandler = (event) => {
    event.preventDefault();
    if (!userNameValid) {
      return;
    }
    // //console.log(userNameValue);
    dispatch(
      logActions.onLogin({ username: userNameValue, userId: socket.id })
    );
    socket.emit(SEND_USERNAME_EVENT, userNameValue);
  };

  const nameClasses = `${classes.control} ${
    userNameTouchInvalid ? classes.invalid : ""
  }`;

  const content = (
    <Fragment>
      <h1>Welcome to Battleship!</h1>
      <div className={classes.actions}>
        <img src={name} alt="random avatar" width="50" height="50" />
        <div className={nameClasses}>
          <label>Username: </label>
          <input
            value={userNameValue}
            onChange={userNameChangeHandler}
            onBlur={userNameBlurHandler}
          />
        </div>
        <button type="submit" className={classes.button} onClick={onClickName}>
          Enter
        </button>
      </div>
    </Fragment>
  );

  const waiting = (
    <div>
      <h2>Enjoy! {userNameValue}</h2>
      <div className={classes.actions}>
        <img src={name} alt="random avatar" width="50" height="50" />
        <button type="button" onClick={onClickName} className={classes.button}>
          Back
        </button>
        <button
          type="submit"
          onClick={submitUsernameHandler}
          className={classes.submit}
        >
          Ok!
        </button>
      </div>
    </div>
  );

  return (
    <Modal>
      <div className={classes.form}>
        <form>
          {!ok && content}
          {ok && waiting}
        </form>
      </div>
    </Modal>
  );
};

export default LoginMenu;
