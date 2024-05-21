import { apiSlice } from '../../app/store'

const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		usersByName: builder.query({
			query: name => `/users/search?query=${name}`,
		}),
		userById: builder.query({
			query: id => `/${id}`,
		}),
		userProfile: builder.query({
			query: () => '/profile/me',
		}),
	}),
})

export const { useUserByIdQuery, useUsersByNameQuery, useUserProfileQuery } =
	userApiSlice
