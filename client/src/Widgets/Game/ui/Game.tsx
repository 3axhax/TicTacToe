import React, { useEffect } from "react";
import styles from "../Game.module.scss";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import {
  resetGameMatrix,
  selectFieldsNumberGame,
  setGameMatrix,
} from "../../../Entities/Game/GameSlice";
import GameCell from "./GameCell";
import { cellType } from "../../../Shared/Types/GameTypes";
import { CreateRhombusArray } from "../../../Entities/Game/GameSlice.helpers";
import Websocket from "../../../Shared/Transport/Websocket";

const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGameMatrix({}));
  }, []);

  useEffect(() => {
    Websocket.subscribe({
      url: "/game",
      data: {
        message: "updateGameMatrix",
        cb: (matrix) => {
          dispatch(setGameMatrix(matrix));
        },
      },
    });
  }, []);

  const grid: cellType[][] = CreateRhombusArray(
    useAppSelector(selectFieldsNumberGame),
  );

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
