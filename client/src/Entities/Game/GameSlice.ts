import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { CreateRhombusArray } from "../../Shared/Helpers/CreateGameField";
import { INITIAL_FIELDS_NUMBER } from "./GameSlice.constants";

export type linesListType = "top" | "bottom" | "left" | "right";

interface cellNeighbourType {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export type cellType = {
  id: string;
  used: boolean;
  lines?: linesListType[];
  playerCell?: number;
};

interface initialStateType {
  fieldsNumber: number;
  gameMatrix: cellType[][];
}

const getCellNeighbour = (
  id: string,
  matrix: cellType[][],
): cellNeighbourType => {
  const [i, j] = id.split(":");
  return {
    top: +i > 0 && matrix[+i - 1][+j].used,
    bottom: matrix[+i + 1] && matrix[+i + 1][+j].used,
    left: +j > 0 && matrix[+i][+j - 1].used,
    right: matrix[+i] && matrix[+i][+j + 1] && matrix[+i][+j + 1].used,
  };
};

const checkFillCell = (cell: cellType) => {
  if (cell.lines?.length === 4) {
    cell.playerCell = 1;
  }
};

export const gameSlice: Slice<initialStateType> = createSlice({
  name: "game",
  initialState: {
    fieldsNumber: INITIAL_FIELDS_NUMBER,
    gameMatrix: CreateRhombusArray(INITIAL_FIELDS_NUMBER),
  },
  reducers: {
    setGameLine: (
      state,
      action: PayloadAction<{ id: string; type: linesListType }>,
    ) => {
      const [i, j] = action.payload.id.split(":");
      if (!state.gameMatrix[+i][+j].lines?.includes(action.payload.type)) {
        state.gameMatrix[+i][+j].lines?.push(action.payload.type);
        checkFillCell(state.gameMatrix[+i][+j]);
      }
      switch (action.payload.type) {
        case "top":
          if (
            state.gameMatrix[+i - 1] &&
            state.gameMatrix[+i - 1][+j].used &&
            !state.gameMatrix[+i - 1][+j].lines?.includes("bottom")
          ) {
            state.gameMatrix[+i - 1][+j].lines?.push("bottom");
            checkFillCell(state.gameMatrix[+i - 1][+j]);
          }
          break;
        case "bottom":
          if (
            state.gameMatrix[+i + 1] &&
            state.gameMatrix[+i + 1][+j].used &&
            !state.gameMatrix[+i + 1][+j].lines?.includes("top")
          ) {
            state.gameMatrix[+i + 1][+j].lines?.push("top");
            checkFillCell(state.gameMatrix[+i + 1][+j]);
          }
          break;
        case "left":
          if (
            state.gameMatrix[+i][+j - 1] &&
            state.gameMatrix[+i][+j - 1].used &&
            !state.gameMatrix[+i][+j - 1].lines?.includes("right")
          ) {
            state.gameMatrix[+i][+j - 1].lines?.push("right");
            checkFillCell(state.gameMatrix[+i][+j - 1]);
          }
          break;
        case "right":
          if (
            state.gameMatrix[+i][+j + 1] &&
            state.gameMatrix[+i][+j + 1].used &&
            !state.gameMatrix[+i][+j + 1].lines?.includes("left")
          ) {
            state.gameMatrix[+i][+j - 1].lines?.push("left");
            checkFillCell(state.gameMatrix[+i][+j - 1]);
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

export const { resetGameMatrix, setGameLine } = gameSlice.actions;

export const selectFieldsNumberGame = (state: RootState) =>
  state.game.fieldsNumber;

export const selectCellGame = (state: RootState, id: string) => {
  const [i, j] = id.split(":");
  return state.game.gameMatrix[+i][+j];
};

export const selectGameMatrixGame = (state: RootState) => state.game.gameMatrix;

export default gameSlice.reducer;
