import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.authLoading = action.payload.check.authLoading;
            state.isAuthenticated = action.payload.check.isAuthenticated;
            state.user = action.payload.check.user;
        },
    },
});

export const selectUser = (state) => state.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
