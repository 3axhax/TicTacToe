import { USER_LS_KEY } from "./UserConstants";
import { userSliceInitialType, userType } from "./UserSlice.types";

export const updateUserLocalStorage = (key: string, value: string | number) => {
  const ls = localStorage.getItem(USER_LS_KEY);
  const user = ls ? JSON.parse(ls) : {};
  user[key] = value;
  localStorage.setItem(USER_LS_KEY, JSON.stringify(user));
};

export const saveUser = (state: userSliceInitialType, user: userType) => {
  state.token = user.token;
  updateUserLocalStorage("token", state.token);
  state.name = user.name;
  updateUserLocalStorage("name", state.name);
  state.id = user.id;
  updateUserLocalStorage("id", state.id);
  state.email = user.email;
  updateUserLocalStorage("email", state.email);
};
