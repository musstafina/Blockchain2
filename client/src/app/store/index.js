import { configureStore } from '@reduxjs/toolkit'
import { findUserPageReducer } from '../../shared/slices/find-user-page-slice'
import { userReducer } from '../../shared/slices/user-slice'
import { apiSlice } from './api-slice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		findUserPage: findUserPageReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export const { getState, dispatch } = store

export * from './api-slice'
