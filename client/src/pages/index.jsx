import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from './layouts'

const LoginPage = lazy(() => import('./login-page'))
const RegisterPage = lazy(() => import('./register-page'))
const HomePage = lazy(() => import('./home-page'))
const ProfilePage = lazy(() => import('./profile-page'))
const CreatePostPage = lazy(() => import('./create-post-page'))
const AllUsersPage = lazy(() => import('./all-users-page'))
const UserPage = lazy(() => import('./user-page'))

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '',
				element: <HomePage />,
			},
			{
				path: 'me',
				element: <ProfilePage />,
			},
			{
				path: 'create-post',
				element: <CreatePostPage />,
			},
			{
				path: '/users',
				element: <AllUsersPage />,
			},
			{
				path: '/users/:publicKey',
				element: <UserPage />,
			},
			{
				path: '/auth',
				children: [
					{
						path: 'login',
						element: <LoginPage />,
					},
					{
						path: 'register',
						element: <RegisterPage />,
					},
				],
			},
		],
	},
])
