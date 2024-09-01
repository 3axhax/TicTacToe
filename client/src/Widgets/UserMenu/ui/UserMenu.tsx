import React from "react";
import {useAppSelector} from "../../../Shared/storeHooks";
import {selectUserName} from "../../../Entities/User/UserSlice";

const UserMenu: React.FC = () => {
    const userName = useAppSelector(selectUserName)
    return (
        <div>{userName}</div>
    );
}

export default UserMenu;