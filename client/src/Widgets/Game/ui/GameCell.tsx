import React, { FC } from "react";
import styles from "../Game.module.scss";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import {
  selectCellGame,
  selectFieldsNumberGame,
  setGameLine,
  setHoverGameLine,
} from "../../../Entities/Game/GameSlice";
import GameCellLine from "./GameCellLine";
import { cellType, linesListType } from "../../../Shared/Types/GameTypes";

interface gameCellType {
  id: string;
}

const GameCell: FC<gameCellType> = ({ id }) => {
  const fieldsNumber = useAppSelector(selectFieldsNumberGame);
  const cell: cellType = useAppSelector((state) => selectCellGame(state, id));

  const dispatch = useAppDispatch();

  const handlerLineClick = (type: linesListType) => {
    dispatch(setGameLine({ id: id, type: type }));
  };

  const handlerMouseOver = (type: linesListType) => {
    dispatch(setHoverGameLine({ id: id, type: type }));
  };

  const handlerMouseOut = () => {
    dispatch(setHoverGameLine({ id: id, type: null }));
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
            onMouseOut={handlerMouseOut}
            onMouseOver={() => handlerMouseOver(type)}
            hoverPlayer={
              cell.hoverPlayerLines ? cell.hoverPlayerLines[type] : 0
            }
            exist={cell.lines && cell.lines.includes(type)}
          />
        ))}
    </div>
  );
};

export default GameCell;
