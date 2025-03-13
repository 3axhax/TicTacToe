import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {UserMenu} from "../../../Widgets/UserMenu";
import {useAppSelector} from "../../../Shared/storeHooks";
import {selectIsUserAuthorized} from "../../../Entities/User/UserSlice";

const MainLayout: React.FC = () => {

    const isUserAuthorized = useAppSelector(selectIsUserAuthorized)

    return (
        <>
            <div className={'header__content'}>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {!isUserAuthorized &&
                        <li>
                            <NavLink to="/auth">Auth</NavLink>
                        </li>}
                    </ul>
                </nav>
                <UserMenu/>
            </div>
            <div className={'container'}>
                <Outlet/>
            </div>
        </>
    )
}

export default MainLayout;