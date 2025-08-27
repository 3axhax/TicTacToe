import React, { useEffect } from "react";
import styles from "../UsersList.module.scss";
import List from "./List";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import Websocket from "../../../Shared/Transport/Websocket";
import {
  selectOnlineCountUsersList,
  setOnlineUserList, userType,
} from "../../../Entities/UsersList/UsersListSlice";
import {WEBSOCKET_GAME_URL} from "../../../Entities/Game/GameSlice.constants";

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    Websocket.subscribe({
      url: WEBSOCKET_GAME_URL,
      data: {
        message: "onlineUsersList",
        cb: (usersList: userType[]) => {
          dispatch(setOnlineUserList(usersList));
        },
      },
    }).subscribe({
      url: WEBSOCKET_GAME_URL,
      data: {
        message: 'inviteList',
        cb: (inviteList) => {
          console.log(inviteList);
        }
      }
    })
        .emit({ url: WEBSOCKET_GAME_URL, message: "onlineUsersList" });
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
