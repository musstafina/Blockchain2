import { apiSlice } from '../../app/store'
import { loggedIn } from '../slices/user-slice'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: data => ({
				url: '/login',
				method: 'POST',
				body: data,
			}),
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				try {
					const {
						data: { token },
					} = await queryFulfilled

					dispatch(loggedIn({ token }))
				} catch (error) {
					console.log(error)
				}
			},
		}),
		register: builder.mutation({
			query: data => ({
				url: '/register',
				method: 'POST',
				body: data,
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice
