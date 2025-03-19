import React, { useEffect } from "react";
import styles from "../UsersList.module.scss";
import List from "./List";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import Websocket from "../../../Shared/Transport/Websocket";
import {
  selectOnlineCountUsersList,
  setOnlineUserList,
} from "../../../Entities/UsersList/UsersListSlice";

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    Websocket.subscribe({
      url: "/game",
      data: {
        message: "onlineUsersList",
        cb: (usersList: never[]) => {
          dispatch(setOnlineUserList(usersList));
        },
      },
    }).emit({ url: "/game", message: "onlineUsersList" });

    return () => {
      Websocket.destroy("/game");
    };
  }, []);

  const onlineCount = useAppSelector(selectOnlineCountUsersList);

  return (
    <div className={styles.block}>
      <div className={styles.usersListBlock}>
        <div className={styles.listCount}>Players online: {onlineCount}</div>
        <List />
      </div>
      <div className={styles.inputMessage}></div>
    </div>
  );
};

export default UsersList;
