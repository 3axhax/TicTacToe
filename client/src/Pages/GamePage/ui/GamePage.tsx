import React from "react";
import { Chat } from "../../../Widgets/Chat";
import styles from "../GamePage.module.scss";

const GamePage: React.FC = () => {
  return (
    <div>
      <h1>Game Page</h1>
      <div className={styles.container}>
        <div className={styles.gameField}></div>
        <div className={styles.chat}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
