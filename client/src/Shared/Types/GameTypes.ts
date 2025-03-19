export type linesListType = "top" | "bottom" | "left" | "right";

export interface cellNeighbourType {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export type cellType = {
  id: string;
  used: boolean;
  lines?: linesListType[];
  hoverPlayerLines: {
    [index in linesListType]: number;
  };
  playerCell?: number;
};

export interface initialGameStateType {
  fieldsNumber: number;
  gameMatrix: cellType[][];
  currentPlayerNumber: number;
}

export interface gameLineType {
  id: string;
  type: linesListType;
}
