import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	posts: [],
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload
		},
	},
})

export const { setPosts } = postsSlice.actions

export const postsReducer = postsSlice.reducer

export const selectPosts = state => state.posts.posts
