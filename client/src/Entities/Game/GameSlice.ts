import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { INITIAL_FIELDS_NUMBER } from "./GameSlice.constants";
import {
  cellType,
  gameLineType,
  initialGameStateType,
  linesListType,
} from "../../Shared/Types/GameTypes";
import {
  checkFillCell,
  CreateRhombusArray,
  getCellNeighbour,
} from "./GameSlice.helpers";

export const gameSlice: Slice<initialGameStateType> = createSlice({
  name: "game",
  initialState: {
    fieldsNumber: INITIAL_FIELDS_NUMBER,
    gameMatrix: CreateRhombusArray(INITIAL_FIELDS_NUMBER),
    currentPlayerNumber: 1,
  },
  reducers: {
    setHoverGameLine: (state, action: PayloadAction<gameLineType>) => {
      const [i, j] = action.payload.id.split(":");
      state.gameMatrix[+i][+j].hoverPlayerLines = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      };
      if (action.payload.type) {
        state.gameMatrix[+i][+j].hoverPlayerLines[action.payload.type] =
          state.currentPlayerNumber;
      }
    },
    setGameLine: (state, action: PayloadAction<gameLineType>) => {
      const [i, j] = action.payload.id.split(":");
      if (!state.gameMatrix[+i][+j].lines?.includes(action.payload.type)) {
        state.gameMatrix[+i][+j].lines?.push(action.payload.type);
        checkFillCell(state.gameMatrix[+i][+j], state.currentPlayerNumber);
      }
      switch (action.payload.type) {
        case "top":
          if (
            state.gameMatrix[+i - 1] &&
            state.gameMatrix[+i - 1][+j].used &&
            !state.gameMatrix[+i - 1][+j].lines?.includes("bottom")
          ) {
            state.gameMatrix[+i - 1][+j].lines?.push("bottom");
            checkFillCell(
              state.gameMatrix[+i - 1][+j],
              state.currentPlayerNumber,
            );
          }
          break;
        case "bottom":
          if (
            state.gameMatrix[+i + 1] &&
            state.gameMatrix[+i + 1][+j].used &&
            !state.gameMatrix[+i + 1][+j].lines?.includes("top")
          ) {
            state.gameMatrix[+i + 1][+j].lines?.push("top");
            checkFillCell(
              state.gameMatrix[+i + 1][+j],
              state.currentPlayerNumber,
            );
          }
          break;
        case "left":
          if (
            state.gameMatrix[+i][+j - 1] &&
            state.gameMatrix[+i][+j - 1].used &&
            !state.gameMatrix[+i][+j - 1].lines?.includes("right")
          ) {
            state.gameMatrix[+i][+j - 1].lines?.push("right");
            checkFillCell(
              state.gameMatrix[+i][+j - 1],
              state.currentPlayerNumber,
            );
          }
          break;
        case "right":
          if (
            state.gameMatrix[+i][+j + 1] &&
            state.gameMatrix[+i][+j + 1].used &&
            !state.gameMatrix[+i][+j + 1].lines?.includes("left")
          ) {
            state.gameMatrix[+i][+j - 1].lines?.push("left");
            checkFillCell(
              state.gameMatrix[+i][+j - 1],
              state.currentPlayerNumber,
            );
          }
          break;
      }
    },
    resetGameMatrix: (state) => {
      const initGameMatrix = CreateRhombusArray(state.fieldsNumber);
      const gameMatrix = initGameMatrix.map((row, i) => {
        return row.map((cell, j): cellType => {
          if (!cell.used) return { ...cell, lines: [] };
          if (
            i === 0 ||
            i === state.fieldsNumber - 1 ||
            j === 0 ||
            j === state.fieldsNumber - 1
          ) {
            const playerCell = i === 0 || i === state.fieldsNumber - 1 ? 1 : 2;
            return {
              ...cell,
              lines: ["top", "left", "right", "bottom"],
              playerCell: playerCell,
            };
          }
          const neighbour = getCellNeighbour(cell.id, initGameMatrix);
          let lines: linesListType[] = [];
          let k: linesListType;
          for (k in neighbour) {
            if (!neighbour[k]) lines.push(k);
          }
          return {
            ...cell,
            lines: lines,
          };
        });
      });
      gameMatrix[1][Math.floor(state.fieldsNumber / 2)].lines = ["top"];
      gameMatrix[state.fieldsNumber - 2][
        Math.floor(state.fieldsNumber / 2)
      ].lines = ["bottom"];
      gameMatrix[Math.floor(state.fieldsNumber / 2)][1].lines = ["left"];
      gameMatrix[Math.floor(state.fieldsNumber / 2)][
        state.fieldsNumber - 2
      ].lines = ["right"];
      state.gameMatrix = gameMatrix;
    },
  },
});

export const { resetGameMatrix, setGameLine, setHoverGameLine } =
  gameSlice.actions;

export const selectFieldsNumberGame = (state: RootState) =>
  state.game.fieldsNumber;

export const selectCellGame = (state: RootState, id: string) => {
  const [i, j] = id.split(":");
  return state.game.gameMatrix[+i][+j];
};

export default gameSlice.reducer;
