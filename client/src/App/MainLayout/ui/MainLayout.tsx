import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserMenu } from "../../../Widgets/UserMenu";
import { useAppSelector } from "../../../Shared/storeHooks";
import { selectIsUserAuthorized } from "../../../Entities/User/UserSlice";
import styles from "../MainLayout.module.scss";

const MainLayout: React.FC = () => {
  const isUserAuthorized = useAppSelector(selectIsUserAuthorized);

  return (
    <>
      <div className={styles.header}>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {isUserAuthorized ? (
              <>
                <NavLink to="/game">Game</NavLink>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/auth">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/registration">Registration</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        <UserMenu />
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
