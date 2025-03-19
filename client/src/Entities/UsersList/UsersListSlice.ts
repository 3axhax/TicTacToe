import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

export interface userType {
  id: number;
  name: string;
  email: string;
}

export interface usersListInitialType {
  list: userType[];
}

export const usersListSlice: Slice<usersListInitialType> = createSlice({
  name: "usersList",
  initialState: {
    list: <userType[]>[],
  },
  reducers: {
    setOnlineUserList: (state, action: PayloadAction<userType[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setOnlineUserList } = usersListSlice.actions;

export const selectListUsersList = (state: RootState) => state.usersList.list;
export const selectOnlineCountUsersList = (state: RootState) =>
  state.usersList.list.length;

export default usersListSlice.reducer;
