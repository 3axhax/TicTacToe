import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Entities/User/UserSlice";
import chatReducer from "../Entities/Chat/ChatSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
