import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    score: 0,
    userTurn: null,
  },
  reducers: {
    updateScore: (state, action) => {
      state.score = state.score + action.payload.updateAmount;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    /*enemyturn: (state) => {
      state.userTurn = false
    },
    playerturn: (state) => {
      state.userTurn = true
    }*/
  },
});

export const { updateScore, resetScore } = userSlice.actions;

export default userSlice;
