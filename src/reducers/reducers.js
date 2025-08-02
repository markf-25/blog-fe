import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user.slice.js';
import { postsSlice } from './posts.slice.js';

export const reducers = combineReducers({
    user: userSlice.reducer,
    posts: postsSlice.reducer
})