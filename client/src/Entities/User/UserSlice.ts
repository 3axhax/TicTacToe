import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../App/store";

export type authorizationData = {
    email: string,
    password: string,
}

export const userAuthorize = createAsyncThunk(
    'user/authorize',
    async (amount: authorizationData) => {
        const response = () => {
            return {status: 'success'};
        }
        // The value we return becomes the `fulfilled` action payload
        return response
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: ''
    },
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(userAuthorize.pending, (state, action) => {
                console.log('userAuthorize.pending', action)
            })
            .addCase(userAuthorize.fulfilled, (state, action) => {
                console.log('userAuthorize.fulfilled', action)
            })
            .addCase(userAuthorize.rejected, (state, action) => {
                console.log('userAuthorize.rejected', action)
            })
    }
})

export const {setName} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.name

export default userSlice.reducer