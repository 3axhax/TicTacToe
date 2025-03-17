import { Action, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import Request from "../../Shared/Transport/RestAPI";
import { USER_LS_KEY } from "./UserConstants";
import {
  UserAuthorizationType,
  userRegistrationType,
} from "./dto/UserSlice.dto";
import { HandlerAxiosError } from "../../Shared/Helpers/RequestHandlersError";

interface ActionType extends Action {
  error: { message: string };
}
export const updateUserLocalStorage = (key: string, value: string) => {
  const ls = localStorage.getItem(USER_LS_KEY);
  const user = ls ? JSON.parse(ls) : {};
  user[key] = value;
  localStorage.setItem(USER_LS_KEY, JSON.stringify(user));
};

export const userAuthorize = createAsyncThunk(
  "user/authorize",
  async (userData: UserAuthorizationType) => {
    try {
      const response = await Request.post("/auth/login", userData);
      return response.data;
    } catch (e) {
      HandlerAxiosError(e);
    }
  },
);

export const userRegistration = createAsyncThunk(
  "user/registration",
  async (userData: userRegistrationType) => {
    if (!userData.password) {
      throw new Error("Empty password");
    }
    if (userData.password !== userData.confirmPassword) {
      throw new Error("Incorrect Confirm Password");
    }
    try {
      const response = await Request.post("/auth/registration", userData);
      return response.data;
    } catch (e) {
      HandlerAxiosError(e);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    token: "",
    pending: false,
    error: "",
  },
  reducers: {
    logoutUser: (state) => {
      state.name = "";
      state.token = "";
      localStorage.removeItem(USER_LS_KEY);
    },
    checkLSUser: (state) => {
      const ls = localStorage.getItem(USER_LS_KEY);
      if (ls) {
        const user = JSON.parse(ls);
        if (user) {
          state.name = user.name;
          state.token = user.token;
        }
      }
    },
    resetUserError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthorize.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.token = action.payload.token;
          updateUserLocalStorage("token", state.token);
          state.name = action.payload.name;
          updateUserLocalStorage("name", state.name);
        }
        state.pending = false;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.token = action.payload.token;
          updateUserLocalStorage("token", state.token);
          state.name = action.payload.name;
          updateUserLocalStorage("name", state.name);
        }
        state.pending = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: ActionType) => {
          state.pending = false;
          state.error = action.error.message ? action.error.message : "";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.pending = true;
          state.error = "";
        },
      );
  },
});

export const { logoutUser, checkLSUser, resetUserError } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;
export const selectUserToken = (state: RootState) => state.user.token;
export const selectPendingAuthorize = (state: RootState) => state.user.pending;
export const selectErrorAuthorize = (state: RootState) => state.user.error;

export const selectIsUserAuthorized = (state: RootState) =>
  state.user.token && state.user.name;

export default userSlice.reducer;
