import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { loggedOut } from '../../shared/slices/user-slice'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:6600/api',
	credentials: 'include',
	prepareHeaders: headers => {
		const token = localStorage.getItem('token')
		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}
		return headers
	},
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		api.dispatch(loggedOut())
	}
	return result
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
})
