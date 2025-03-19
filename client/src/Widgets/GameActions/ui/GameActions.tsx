import React, { ChangeEvent } from "react";
import styles from "../GameActions.module.scss";
import { useAppDispatch } from "../../../Shared/storeHooks";
import { setCurrentPlayerNumber } from "../../../Entities/Game/GameSlice";

const GameActions: React.FC = () => {
  const dispatch = useAppDispatch();

  const handlerOnPlayerSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentPlayerNumber(e.target.value));
  };

  return (
    <div className={styles.block}>
      <div className={styles.selectBlock}>
        <label htmlFor="playerNumber">Player Number: </label>
        <select
          id="playerNumber"
          onChange={handlerOnPlayerSelect}
          className={styles.select}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>
    </div>
  );
};

export default GameActions;
