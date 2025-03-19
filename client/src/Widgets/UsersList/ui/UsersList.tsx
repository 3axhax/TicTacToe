import React, { useEffect } from "react";
import styles from "../UsersList.module.scss";
import MessageList from "../../../Pages/GamePage/ui/MessageList";
import { useAppDispatch } from "../../../Shared/storeHooks";
import Websocket from "../../../Shared/Transport/Websocket";
import { setOnlineCount } from "../../../Entities/UsersList/UsersListSlice";

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    Websocket.subscribe({
      url: "/game",
      data: {
        message: "onlineUsersCount",
        cb: (count) => dispatch(setOnlineCount(count)),
      },
    }).emit({ url: "/game", message: "onlineUsersCount" });

    return () => {
      Websocket.destroy("/game");
    };
  }, []);

  return (
    <div className={styles.block}>
      <div className={styles.messageList}>
        <MessageList />
      </div>
      <div className={styles.inputMessage}></div>
    </div>
  );
};

export default UsersList;
