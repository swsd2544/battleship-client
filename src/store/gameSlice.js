import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    room: [],
  },
  reducers: {
    joinGame(state, action) {
      const id = action.payload.room.roomId;
      const updateUser = action.payload.room.user;
      const existingRoomIndex = state.room.findIndex(
        (item) => item.roomId === id
      );

      if (state.room[existingRoomIndex].userAmount === 1) {
        state.room[existingRoomIndex].userAmount++;
        state.room[existingRoomIndex].joinAble = false;
        state.room[existingRoomIndex].user.push(updateUser);
      }
      if (state.room[existingRoomIndex].userAmount === 2) {
        state.room[existingRoomIndex].joinAble = false;
      }
    },
    createGame(state, action) {
      // //console.log(action.payload);
      const { roomId, roomName, description, userId, username } =
        action.payload;
      const newRoom = {
        roomId,
        roomName,
        userAmount: 1,
        description,
        joinAble: true,
        gameStart: false,
        user: [
          {
            userId,
            username,
          },
        ],
      };
      //console.log("Room id from redux" + newRoom.roomId);
      // localStorage.setItem("joinGame", "1");
      // localStorage.setItem("Room ID", action.payload.room.roomId);
      state.room = [...state.room, newRoom];
    },
    leftGame(state, action) {
      if (state.userAmount === 1) {
        //remove room back to menu
        // localStorage.setItem("joinGame", "0");
        // localStorage.removeItem("Room ID");
        const id = action.payload.room.roomId;
        const existingRoomIndex = state.room.findIndex(
          (item) => item.roomId === id
        );
        //console.log(existingRoomIndex);
        state.room.splice(existingRoomIndex, 1);
      }
      if (state.userAmount === 2) {
        const id = action.payload.room.roomId;
        const existingRoomIndex = state.room.findIndex(
          (item) => item.roomId === id
        );
        state.room[existingRoomIndex].userAmount--;
        state.room[existingRoomIndex].joinAble = true;
      }
    },
    gameStart(state, action) {
      const id = action.payload.room.roomId;
      const existingRoomIndex = state.room.findIndex(
        (item) => item.roomId === id
      );
      state.room[existingRoomIndex].gameStart = true;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
