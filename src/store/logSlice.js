import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "log",
  initialState: {
    userId: null,
    username: "",
    login: false,
    userJoin: false,
    roomId: "",
  },
  reducers: {
    onLogin(state, action) {
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("userId", action.payload.userId);
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.login = true;
    },
    onLogout(state) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      state.username = "";
      state.login = false;
    },
    onLogged(state) {
      const name = localStorage.getItem("username");
      state.username = name;
      state.login = true;
    },
    joinGame(state) {
      state.userJoin = true;
      localStorage.setItem("joinGame", "1");
      //localStorage.setItem("Room ID", action.payload.roomId);
    },
    leftGame(state) {
      state.userJoin = false;
      localStorage.setItem("joinGame", "0");
      //localStorage.removeItem("Room ID", action.payload.roomId);
    },
  },
});

export const logActions = logSlice.actions;

export default logSlice;
