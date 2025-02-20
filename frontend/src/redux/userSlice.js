import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authToken: null,
        role: null
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = `Bearer ${action.payload}`;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        logout: (state) => {
            state.authToken = null;
            state.role = null;
            
        }
    }
});

export const { setAuthToken, setRole, logout } = userSlice.actions;
export default userSlice.reducer;


