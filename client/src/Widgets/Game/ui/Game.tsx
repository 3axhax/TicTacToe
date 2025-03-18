import React, { useEffect } from "react";
import styles from "../Game.module.scss";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import {
  cellType,
  resetGameMatrix,
  selectFieldsNumberGame,
} from "../../../Entities/Game/GameSlice";
import GameCell from "./GameCell";
import { CreateRhombusArray } from "../../../Shared/Helpers/CreateGameField";

const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGameMatrix({}));
  }, []);

  const grid: cellType[][] = CreateRhombusArray(
    useAppSelector(selectFieldsNumberGame),
  );
  console.log(grid);

  return (
    <div className={styles.block}>
      {grid.map((i) => {
        return i.map((j: cellType) => {
          return <GameCell id={j.id} key={j.id} />;
        });
      })}
    </div>
  );
};

export default Game;
