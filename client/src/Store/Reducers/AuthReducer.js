import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
    name: "Auth",
    initialState: {
        user: null,
        username: ""
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        }
    }
})


export const { setUser, setUsername }  = AuthReducer.actions;
export const authReducer = AuthReducer.reducer;