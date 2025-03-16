import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "../../App/store";
import Request from "../../Shared/API/Request";
import {AxiosError} from "axios";
import {USER_LS_KEY} from "./UserConstants";

export type authorizationData = {
    email: string,
    password: string,
}

export const userAuthorize = createAsyncThunk(
    'user/authorize',
    async (userData: authorizationData) => {
        try {
            const response = await Request.post('/auth/login', userData);
            return response.data;
        } catch (e) {
            if (typeof e === "string") {
                throw new Error(e.toUpperCase())
            } else if (e instanceof AxiosError) {
                throw new Error(e?.response?.data.message)
            } else if (e instanceof Error) {
                throw new Error(e.message)
            }
        }
    }
)

export const updateUserLocalStorage = (key: string, value: string) => {
    const ls = localStorage.getItem(USER_LS_KEY);
    const user = ls ? JSON.parse(ls) : {};
    user[key] = value;
    localStorage.setItem(USER_LS_KEY, JSON.stringify(user));

}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        token: '',
        pending: false,
        error: '',
    },
    reducers: {
        logoutUser: (state) => {
            state.name = ''
            state.token = ''
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

        }
    },
    extraReducers: builder => {
        builder
            .addCase(userAuthorize.pending, (state) => {
                state.pending = true;
                state.error = '';
            })
            .addCase(userAuthorize.fulfilled, (state, action) => {
                if (action.payload.token) {
                    state.token = action.payload.token;
                    updateUserLocalStorage('token', state.token);
                    state.name = action.payload.name;
                    updateUserLocalStorage('name', state.name);
                }
                state.pending = false;
            })
            .addCase(userAuthorize.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message ? action.error.message : '';
            })
    }
})

export const {logoutUser, checkLSUser} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.name;
export const selectUserToken = (state: RootState) => state.user.token;
export const selectPendingAuthorize = (state: RootState) => state.user.pending;
export const selectErrorAuthorize = (state: RootState) => state.user.error;

export const selectIsUserAuthorized = (state: RootState) => state.user.token && state.user.name;

export default userSlice.reducer