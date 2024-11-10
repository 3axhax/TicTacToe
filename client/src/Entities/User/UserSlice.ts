import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../App/store";
import Request from "../../Shared/API/Request";
import {AxiosError} from "axios";

export type authorizationData = {
    email: string,
    password: string,
}

export const userAuthorize = createAsyncThunk(
    'user/authorize',
    async (userData: authorizationData) => {
        try {
            const response = await Request.post('/auth/login', userData);
            console.log(response);
            return response.data;
        }
        catch (e) {
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

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        pending: false,
        error: '',
    },
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(userAuthorize.pending, (state) => {
                state.pending = true;
                state.error = '';
            })
            .addCase(userAuthorize.fulfilled, (state, action) => {
                state.pending = false;
                console.log(action);
            })
            .addCase(userAuthorize.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message ? action.error.message : '';
            })
    }
})

export const {setName} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.name;
export const selectPendingAuthorize = (state: RootState) => state.user.pending;
export const selectErrorAuthorize = (state: RootState) => state.user.error;

export default userSlice.reducer