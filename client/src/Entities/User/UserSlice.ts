import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { USER_LS_KEY } from "./UserConstants";
import { ActionType, userSliceInitialType, userType } from "./UserSlice.types";
import { saveUser } from "./UserSlice.helpers";
import {
  UserAuthorizationType,
  userRegistrationType,
} from "./dto/UserSlice.dto";
import Request from "../../Shared/Transport/RestAPI";
import { HandlerAxiosError } from "../../Shared/Helpers/RequestHandlersError";

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

export const userSlice: Slice<userSliceInitialType> = createSlice({
  name: "user",
  initialState: {
    id: 0,
    name: "",
    email: "",
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
          state.email = user.email;
          state.id = user.id;
        }
      }
    },
    resetUserError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        userAuthorize.fulfilled,
        (state, action: PayloadAction<userType>) => {
          if (action.payload.token) {
            saveUser(state, action.payload);
          }
          state.pending = false;
        },
      )
      .addCase(
        userRegistration.fulfilled,
        (state, action: PayloadAction<userType>) => {
          if (action.payload.token) {
            saveUser(state, action.payload);
          }
          state.pending = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string> & ActionType) => {
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
export const selectUserID = (state: RootState) => state.user.id;
export const selectPendingAuthorize = (state: RootState) => state.user.pending;
export const selectErrorAuthorize = (state: RootState) => state.user.error;

export const selectIsUserAuthorized = (state: RootState) =>
  state.user.token && state.user.name;

export default userSlice.reducer;
