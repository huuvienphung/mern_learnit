import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postUp: { title: '', description: '', url: '', status: '' },
    posts: [],
    postsLoading: true,
    showModel: false,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload.obj.posts;
            state.postsLoading = action.payload.obj.postsLoading;
        },
        setShowModel: (state) => {
            state.showModel = !state.showModel;
        },
        addPost: (state, action) => {
            state.posts = [...state.posts, action.payload];
        },
        deletePost: (state, action) => {
            state.posts = [...state.posts].filter(
                (post) => post._id !== action.payload._id
            );
        },
        setPost: (state, action) => {
            state.postUp = action.payload;
        },
        updatePost: (state, action) => {
            state.posts = [...state.posts].map((post) =>
                post._id === action.payload._id ? action.payload : post
            );
        },
    },
});

export const {
    setPosts,
    setShowModel,
    addPost,
    deletePost,
    updatePost,
    setPost,
} = postsSlice.actions;

export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
