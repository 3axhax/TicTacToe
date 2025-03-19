import React, { FC } from "react";
import styles from "../Game.module.scss";
import { linesListType } from "../../../Shared/Types/GameTypes";
import { log } from "node:util";
import cn from "classnames";

interface gameCellLineType {
  type: linesListType;
  onClick(): void;
  onMouseOver(): void;
  onMouseOut(): void;
  exist?: boolean;
  hoverPlayer: number;
}

const GameCellLine: FC<gameCellLineType> = ({
  type,
  onClick,
  onMouseOver,
  onMouseOut,
  exist = false,
  hoverPlayer,
}) => {
  const stylesList = {
    top: styles.lineTop,
    bottom: styles.lineBottom,
    left: styles.lineLeft,
    right: styles.lineRight,
  };

  const handlerClick = () => {
    if (!exist) onClick();
  };

  return (
    <div
      className={`${styles.line} ${stylesList[type]} ${exist ? " " + styles.lineExist : ""} ${!exist && hoverPlayer ? styles[`LineHoverPlayer_${hoverPlayer}`] : ""}`}
      onClick={handlerClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    ></div>
  );
};

export default GameCellLine;
