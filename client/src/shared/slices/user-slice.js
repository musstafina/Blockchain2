import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
	token: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { user, token } = action.payload
			state.user = {
				id: user['_id'],
				firstName: user['firstName'],
				lastName: user['lastName'],
				email: user['email'],
				personalPhoto: user['personalPhoto'],
				biography: user['biography'],
			}
			state.token = token
		},
		logout: state => {
			state.user = null
			state.token = ''
		},
	},
})

export const user = userSlice.reducer

export const { setUser, logout } = userSlice.actions

export const selectUser = state => state.user.user

export const selectToken = state => state.user.token
