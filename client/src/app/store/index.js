import { configureStore } from '@reduxjs/toolkit'
import { user } from '../../shared/slices/user-slice'
import { apiSlice } from './api-slice'

export const store = configureStore({
	reducer: { user, [apiSlice.reducerPath]: apiSlice.reducer },
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export const { getState, dispatch } = store

export * from './api-slice'
