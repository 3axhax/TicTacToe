import { cellType } from "../../Entities/Game/GameSlice";

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
    return row.map((cell: any, j: number): any => {
      return {
        id: `${i}:${j}`,
        used:
          Math.abs(j - Math.floor(size / 2)) < Math.abs(i - size) &&
          Math.abs(j - Math.floor(size / 2)) <= i,
      };
    });
  });
};
