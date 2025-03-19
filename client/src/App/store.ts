import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Entities/User/UserSlice";
import gameReducer from "../Entities/Game/GameSlice";
import usersList from "../Entities/UsersList/UsersListSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    usersList: usersList,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
