import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

export const usersListSlice = createSlice({
  name: "usersList",
  initialState: {
    list: {},
    onlineCount: 0,
  },
  reducers: {
    setOnlineCount: (state, action: PayloadAction<number>) => {
      state.onlineCount = action.payload;
    },
  },
});

export const { setOnlineCount } = usersListSlice.actions;

export const selectListUsersList = (state: RootState) =>
  state.usersList.onlineCount;
export const selectOnlineCountUsersList = (state: RootState) =>
  state.usersList.onlineCount;

export default usersListSlice.reducer;
