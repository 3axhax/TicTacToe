import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {UserMenu} from "../../../Widgets/UserMenu";

const MainLayout: React.FC = () => {
    return (
        <>
            <div className={'header__content'}>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/auth">Auth</NavLink>
                        </li>
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