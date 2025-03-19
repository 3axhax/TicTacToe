import React from "react";
import { Chat } from "../../../Widgets/Chat";
import styles from "../GamePage.module.scss";
import { Game } from "../../../Widgets/Game";
import { GameActions } from "../../../Widgets/GameActions";

const GamePage: React.FC = () => {
  return (
    <div>
      <h1>Game Page</h1>
      <div className={styles.container}>
        <div className={styles.gameField}>
          <Game />
          <GameActions />
        </div>
        <div className={styles.chat}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
