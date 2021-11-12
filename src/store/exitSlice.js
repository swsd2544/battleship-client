import { createSlice } from "@reduxjs/toolkit";

const exitSlice = createSlice({
  name: "exit",
  initialState: { exitPress: false },
  reducers: {
    isExit(state) {
      //console.log("is exit");
      state.exitPress = true;
    },
    resetExit(state) {
      //console.log("reset exit");
      state.exitPress = false;
    },
  },
});

export const exitActions = exitSlice.actions;

export default exitSlice;
