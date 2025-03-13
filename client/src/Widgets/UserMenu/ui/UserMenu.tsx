import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../Shared/storeHooks";
import {logoutUser, selectUserName, selectUserToken} from "../../../Entities/User/UserSlice";
import ArrowDownIcon from "../../../Shared/ui/icons/ArrowDownIcon";
import cn from "classnames";

const UserMenu: React.FC = () => {
    const userName = useAppSelector(selectUserName)
    const token = useAppSelector(selectUserToken)

    const dispatch =  useAppDispatch();

    const [open, setOpen] = useState(false);

    if (!userName || !token) {
        return null;
    }

    return (
        <div className={'user_menu'}>
        <div onClick={() => setOpen(!open)}>
            {userName} <ArrowDownIcon size={15}
                                      style={{transform: `rotate(${open ? 180 : 0}deg)`}}/>
        </div>
        <div className={cn('user_menu__action_list', {'hidden': !open})}>
            <ul>
                <li onClick={() => {
                    dispatch(logoutUser())
                    setOpen(false);
                }}>Logout</li>
            </ul>
        </div>
        </div>
    );
}

export default UserMenu;