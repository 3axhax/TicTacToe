import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import {
  logoutUser,
  selectIsUserAuthorized,
  selectUserName,
} from "../../../Entities/User/UserSlice";
import ArrowDownIcon from "../../../Shared/ui/icons/ArrowDownIcon";
import cn from "classnames";
import styles from "../UserMenu.module.scss";

const UserMenu: React.FC = () => {
  const userName = useAppSelector(selectUserName);

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  if (!useAppSelector(selectIsUserAuthorized)) {
    return null;
  }

  return (
    <div className={styles.userMenu}>
      <div onClick={() => setOpen(!open)} className={styles.userName}>
        {userName}{" "}
        <ArrowDownIcon
          size={15}
          style={{ transform: `rotate(${open ? 180 : 0}deg)` }}
        />
      </div>
      <div className={cn(styles.actionList, { hidden: !open })}>
        <ul>
          <li
            onClick={() => {
              dispatch(logoutUser(1));
              setOpen(false);
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
