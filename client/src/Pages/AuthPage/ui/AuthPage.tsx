import React from 'react';
import {UserAuthorizationForm} from "../../../Widgets/UserAuthorizationForm";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../Shared/storeHooks";
import {selectIsUserAuthorized} from "../../../Entities/User/UserSlice";

const AuthPage: React.FC = () => {

    const navigate = useNavigate();

    const isUserAuthorized = useAppSelector(selectIsUserAuthorized)

    if (isUserAuthorized) navigate("/")

    return (
        <>
            <h1>Auth Page</h1>
            <UserAuthorizationForm/>
        </>
    )
}

export default AuthPage;