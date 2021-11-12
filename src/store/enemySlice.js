import { createSlice } from "@reduxjs/toolkit";

const enemySlice = createSlice({
  name: "enemy",
  initialState: {
    name: "",
    id: "",
    score: 0,
    board: [],
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    clearEnemy: (state) => {
      state.name = "";
      state.score = 0;
    },
    updateScore: (state, action) => {
      state.score = state.score + action.payload.updateAmount;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    takeEnemyBoard: (state, action) => {
      state.board = action.payload.board;
    },
  },
});

export const enemyActions = enemySlice.actions;

export default enemySlice;
