import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    cursor: null,
    direction: "next",
    limit: 10,
    nextCursor: null,
    prevCursor: null
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            const { posts, cursor, direction, limit, nextCursor, prevCursor } = action.payload;

            state.posts = posts;
            state.cursor = cursor;
            state.direction = direction;
            state.limit = limit;
            state.nextCursor = nextCursor;
            state.prevCursor = prevCursor;
        },

        updatePost: (state, action) =>{
        const postIndex = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[postIndex] = action.payload;
        },

        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        }
    }
});

export const {
    setPosts,
    updatePost,
    removePost
} = postsSlice.actions;

export const postsSelector = (state) => state.posts.posts

export const postsFullState = (state) => state.posts;