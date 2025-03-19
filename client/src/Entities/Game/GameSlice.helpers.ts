import { cellNeighbourType, cellType } from "../../Shared/Types/GameTypes";

export const CreateGameField = (rows: number, columns: number): any[] => {
  const arr: any[] = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < columns; j++) {
      arr[i][j] = null;
    }
  }
  return arr;
};

export const CreateRhombusArray = (size: number): cellType[][] => {
  const matrix = CreateGameField(size, size);
  return matrix.map((row, i) => {
    return row.map((_cell: any, j: number): any => {
      return {
        id: `${i}:${j}`,
        used:
          Math.abs(j - Math.floor(size / 2)) < Math.abs(i - size) &&
          Math.abs(j - Math.floor(size / 2)) <= i,
      };
    });
  });
};

export const getCellNeighbour = (
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

export const checkFillCell = (cell: cellType, playerNumber: number) => {
  if (cell.lines?.length === 4) {
    cell.playerCell = playerNumber;
  }
};
