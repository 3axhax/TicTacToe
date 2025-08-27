import React, {useEffect} from "react";
import { UsersList } from "../../../Widgets/UsersList";
import styles from "../GamePage.module.scss";
import { Game } from "../../../Widgets/Game";
import { GameActions } from "../../../Widgets/GameActions";
import Websocket from "../../../Shared/Transport/Websocket";
import {useAppDispatch} from "../../../Shared/storeHooks";
import {WEBSOCKET_GAME_URL} from "../../../Entities/Game/GameSlice.constants";

const GamePage: React.FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            Websocket.destroy(WEBSOCKET_GAME_URL);
        };
    }, []);

  return (
    <div>
      <h1>Game Page</h1>
      <div className={styles.container}>
        <div className={styles.gameField}>
          <Game />
          <GameActions />
        </div>
        <div className={styles.chat}>
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
