import React from 'react';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "../Pages/HomePage";
import {AuthPage} from "../Pages/AuthPage";
import {NotFoundPage} from "../Pages/404";
import {MainLayout} from "./MainLayout";
import {useAppDispatch} from "../Shared/storeHooks";
import {checkLSUser} from "../Entities/User/UserSlice";

function App() {
    useAppDispatch()(checkLSUser());


    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="*" element={<NotFoundPage/>}></Route>
            </Route>
        </Routes>
    );
}

export default App;
