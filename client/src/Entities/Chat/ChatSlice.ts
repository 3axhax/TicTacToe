import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    pending: false,
    error: "",
    onlineCount: 0,
  },
  reducers: {
    setOnlineCount: (state, action: PayloadAction<number>) => {
      state.onlineCount = action.payload;
    },
  },
});

export const { setOnlineCount } = chatSlice.actions;

export const selectOnlineCountChat = (state: RootState) =>
  state.chat.onlineCount;

export default chatSlice.reducer;
