import { createSlice } from "@reduxjs/toolkit";

function createEmptyBoard() {
  const board = [];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      board[i].push({
        isShip: false,
        isSelected: false,
        shipName: null,
        //id: "",
        coorX: j,
        coorY: i,
      });
    }
  }
  return board;
}

function isSquareValid(board, x, y) {
  if (!board[y] || !board[y][x]) return false;

  if (board[y][x].isShip) return false;

  return true;
}

function createShipInRandom(board) {
  const randomDirection = Math.floor(Math.random() * 2);
  const randomX = Math.floor(Math.random() * 8);
  const randomY = Math.floor(Math.random() * 8);
  const positionOffset = [0, 1, 2, 3];
  if (randomDirection === 0) {
    if (
      positionOffset.some(
        (pos) => !isSquareValid(board, randomX + pos, randomY)
      )
    ) {
      createShipInRandom(board);
      return;
    }
    positionOffset.forEach((pos) => {
      board[randomY][randomX + pos] = {
        ...board[randomY][randomX + pos],
        isShip: true,
      };
    });
  } else {
    if (
      positionOffset.some(
        (pos) => !isSquareValid(board, randomX, randomY + pos)
      )
    ) {
      createShipInRandom(board);
      return;
    }
    positionOffset.forEach((pos) => {
      board[randomY + pos][randomX] = {
        ...board[randomY + pos][randomX],
        isShip: true,
      };
    });
  }
  // //console.log("D " + randomDirection);
  // //console.log("X " + randomX);
  // //console.log("Y " + randomY);
}

const board = createEmptyBoard();
for (let i = 0; i < 4; i++) {
  createShipInRandom(board);
}

const generateBoardSlice = createSlice({
  name: "generateBoard",
  initialState: {
    userBoard: createEmptyBoard(),
    enemyBoard: createEmptyBoard(),
    ship: {},
  },
  reducers: {
    generateUserShips: (state) => {
      const board = createEmptyBoard();
      for (let i = 0; i < 4; i++) {
        createShipInRandom(board);
      }
      state.userBoard = board;
    },
    generateEnemyShips: (state) => {
      const board = createEmptyBoard();
      for (let i = 0; i < 4; i++) {
        createShipInRandom(board);
        for (let j = 0; j < 8; j++) {
          for (let k = 0; k < 8; k++) {
            if (board[k][j].isShip && !board[k][j].shipName) {
              board[k][j].shipName = "ship" + (i + 1) + "-0";
            }
          }
        }
      }
      state.enemyBoard = board;
    },
    //state.enemyBoard = board;
    /*for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (state.enemyBoard[j][i].isShip) {
            state.enemyBoard[j][i].shipName = "ship1";
          }
        }
      }*/
    //},
    setEnemyBoard: (state, action) => {
      const board = action.payload.board;
      //console.log(board);
      state.enemyBoard = board;
    },
    setUserBoard: (state, action) => {
      const shipPositionsList = action.payload.shipPositions;
      for (let i = 0; i < shipPositionsList.length; i++) {
        const positionPairs = shipPositionsList[i];
        const x = positionPairs[0];
        const y = positionPairs[1];
        const shipId = positionPairs[2];
        state.userBoard[y][x].isShip = true;
        state.userBoard[y][x].shipName = shipId;
      }
      //console.log("set up board successfully");
    },
    resetUserBoard: (state) => {
      /*for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          state.userBoard[j][i].isShip = false;
        }
      }*/
      const newBoard = createEmptyBoard();
      state.userBoard = newBoard;
    },
    resetEnemyBoard: (state) => {
      const newBoard = createEmptyBoard();
      state.enemyBoard = newBoard;
    },
    /*checkShip: (state, action) => {
      const checkX = action.payload.x;
      const checkY = action.payload.y;
      const checkPlayer = action.payload.player;
      if (checkPlayer === "user") {
        //console.log("HI");
        return state.userBoard[checkY][checkX].isShip;
      } else if (checkPlayer === "enemy") {
        //console.log("HELLO");
        return state.enemyBoard[checkY][checkX].isShip;
      } else {
        //console.log("WTF");
        return;
      }
    },*/
    shoot: (state, action) => {
      //console.log(action.payload);
      const x = action.payload.x;
      const y = action.payload.y;
      const player = action.payload.player;
      //console.log("Turn: ", player);
      if (player === "user") {
        if (state.userBoard[y][x].isSelected) {
          return;
        }
        //console.log("User shot");
        state.userBoard[y][x].isSelected = true;
      } else if (player === "enemy") {
        if (state.enemyBoard[y][x].isSelected) {
          //console.log("repeated shot");
          return;
        }
        //console.log("Enemy shot");
        state.enemyBoard[y][x].isSelected = true;
      }
    },
  },
});

export const {
  generateUserShips,
  generateEnemyShips,
  setUserBoard,
  resetUserBoard,
  setEnemyBoard,
  shoot,
  resetEnemyBoard,
} = generateBoardSlice.actions;

export default generateBoardSlice;
