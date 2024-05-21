import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	username: '',
}

const findUserPageSlice = createSlice({
	name: 'findUserPage',
	initialState,
	reducers: {
		setUsername: (state, { payload }) => {
			state.username = payload
		},
	},
})

export const { setUsername } = findUserPageSlice.actions

export const findUserPageReducer = findUserPageSlice.reducer

export const selectFindUserPageUsername = store => store.findUserPage.username
