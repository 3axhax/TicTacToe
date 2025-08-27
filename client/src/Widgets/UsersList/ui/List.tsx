import React from "react";
import { useAppSelector } from "../../../Shared/storeHooks";
import { selectListUsersList } from "../../../Entities/UsersList/UsersListSlice";
import styles from "../UsersList.module.scss";
import { selectUserID } from "../../../Entities/User/UserSlice";
import Websocket from "../../../Shared/Transport/Websocket";
import {WEBSOCKET_GAME_URL} from "../../../Entities/Game/GameSlice.constants";

const List: React.FC = () => {
  const usersList = useAppSelector(selectListUsersList);
  const currentUserId = useAppSelector(selectUserID);

  const handlerInviteClick = (userId: number) => {
      Websocket.emit({
          url: WEBSOCKET_GAME_URL,
          message: 'UserInvite',
          data: {userId: currentUserId, userIdInvited: userId}
      })
  }

  return (
    <div className={styles.usersList}>
      <ul>
        {usersList.map((user) => (
          <li key={user.id}>
            {user.name} {currentUserId !== user.id && <button onClick={() => handlerInviteClick(user.id)}>Invite</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
