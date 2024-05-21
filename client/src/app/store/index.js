import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../../shared/slices/auth-slice'
import { findUserPageReducer } from '../../shared/slices/find-user-page-slice'
import { apiSlice } from './api-slice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		findUserPage: findUserPageReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export const { getState, dispatch } = store

export * from './api-slice'
