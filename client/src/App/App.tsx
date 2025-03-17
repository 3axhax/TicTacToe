import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import { AuthPage } from "../Pages/AuthPage";
import { NotFoundPage } from "../Pages/404";
import { MainLayout } from "./MainLayout";
import { useAppDispatch, useAppSelector } from "../Shared/storeHooks";
import {
  checkLSUser,
  selectIsUserAuthorized,
} from "../Entities/User/UserSlice";
import { RegistrationPage } from "../Pages/RegistrationPage";
import GamePage from "../Pages/GamePage/ui/GamePage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkLSUser());
  }, []);

  const isUserAuthorized = useAppSelector(selectIsUserAuthorized);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {isUserAuthorized ? (
          <>
            <Route path="/game" element={<GamePage />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
