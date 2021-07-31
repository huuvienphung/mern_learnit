import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/auth/userSlice';
import postsReducer from './components/posts/postSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
    },
});
