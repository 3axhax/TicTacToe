import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../App/store";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: ''
    },
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    }
})

export const {setName} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.name

export default userSlice.reducer