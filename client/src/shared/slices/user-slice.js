import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	name: '',
	avatar: '',
	lastPostId: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loggedIn: (state, action) => {
			const { token } = action.payload
			if (!token) return
			state.isAuthenticated = true
			localStorage.setItem('token', token)
		},
		loggedOut: state => {
			state.isAuthenticated = false
			localStorage.removeItem('token')
		},
		setUser: (state, action) => {
			const { name, avatar, lastPostId } = action.payload
			state.name = name
			state.avatar = avatar
			state.lastPostId = lastPostId
		},
	},
})

export const { loggedIn, loggedOut, setUser } = userSlice.actions

export const userReducer = userSlice.reducer

export const selectIsAuthenticated = store => store.user.isAuthenticated

export const selectUserProfileData = store => ({
	name: store.user.name,
	avatar: store.user.avatar,
	lastPostId: store.user.lastPostId,
})
