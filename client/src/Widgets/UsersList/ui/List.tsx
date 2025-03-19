import React from "react";
import { useAppSelector } from "../../../Shared/storeHooks";
import { selectListUsersList } from "../../../Entities/UsersList/UsersListSlice";
import styles from "../UsersList.module.scss";
import { selectUserID } from "../../../Entities/User/UserSlice";

const List: React.FC = () => {
  const usersList = useAppSelector(selectListUsersList);
  const currentUserId = useAppSelector(selectUserID);

  return (
    <div className={styles.usersList}>
      <ul>
        {usersList.map((user) => (
          <li key={user.id}>
            {user.name} {currentUserId !== user.id && <button>Invite</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
