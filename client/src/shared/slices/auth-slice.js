import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: localStorage.getItem('token'),
}

const authSlice = createSlice({
	name: 'auth',
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
	},
})

export const { loggedIn, loggedOut } = authSlice.actions

export const authReducer = authSlice.reducer

export const selectIsAuthenticated = store => store.auth.isAuthenticated
