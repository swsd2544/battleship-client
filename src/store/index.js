import { configureStore } from "@reduxjs/toolkit";
import enemySlice from "./enemySlice";
import logSlice from "./logSlice";
import generateBoardSlice from "./boardGenerate";
import gameSlice from "./gameSlice";
import exitSlice from "./exitSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    log: logSlice.reducer,
    enemy: enemySlice.reducer,
    user: userSlice.reducer,
    generateBoard: generateBoardSlice.reducer,
    game: gameSlice.reducer,
    exit: exitSlice.reducer,
  },
});

export default store;
