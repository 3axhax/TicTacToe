import React, { FC } from "react";
import styles from "../Game.module.scss";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import {
  cellType,
  linesListType,
  selectCellGame,
  selectFieldsNumberGame,
  setGameLine,
} from "../../../Entities/Game/GameSlice";
import cn from "classnames";
import GameCellLine from "./GameCellLine";

interface gameCellType {
  id: string;
}

const GameCell: FC<gameCellType> = ({ id }) => {
  const fieldsNumber = useAppSelector(selectFieldsNumberGame);
  const cell: cellType = useAppSelector((state) => selectCellGame(state, id));

  const dispatch = useAppDispatch();

  const handlerLineClick = (type: string) => {
    dispatch(setGameLine({ id: id, type: type }));
  };

  const linesList: linesListType[] = ["top", "left", "right", "bottom"];

  return (
    <div
      className={`${styles.cell} ${cell.used ? styles.usedCell : ""} ${cell.playerCell ? styles[`playerCell_${cell.playerCell}`] : ""}`}
      style={{
        height: `calc(${100 / fieldsNumber}% - 2px)`,
        width: `calc(${100 / fieldsNumber}% - 2px)`,
      }}
    >
      {cell.used &&
        linesList.map((type) => (
          <GameCellLine
            key={`${id}:${type}Line`}
            type={type}
            onClick={() => handlerLineClick(type)}
            exist={cell.lines && cell.lines.includes(type)}
          />
        ))}
    </div>
  );
};

export default GameCell;
