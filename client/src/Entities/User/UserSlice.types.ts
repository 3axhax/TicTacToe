import { Action } from "@reduxjs/toolkit";

export interface ActionType extends Action {
  error: { message: string };
}

export interface userType {
  id: number;
  email: string;
  name: string;
  token: string;
}

export interface userSliceInitialType extends userType {
  pending: any;
  error: string;
}
