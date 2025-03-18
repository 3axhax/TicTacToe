import React, { FC } from "react";
import styles from "../Game.module.scss";
import cn from "classnames";
import { linesListType } from "../../../Entities/Game/GameSlice";

interface gameCellLineType {
  type: linesListType;
  onClick(): void;
  exist?: boolean;
}

const GameCellLine: FC<gameCellLineType> = ({
  type,
  onClick,
  exist = false,
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
      className={`${styles.line} ${stylesList[type]} ${exist ? " " + styles.lineExist : ""}`}
      onClick={handlerClick}
    ></div>
  );
};

export default GameCellLine;
