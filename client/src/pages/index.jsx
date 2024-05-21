import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout, RootLayout } from './layouts'

import { RequireAuth } from '../shared/utils/require-auth'

const LoginPage = lazy(() => import('./login-page'))
const RegisterPage = lazy(() => import('./register-page'))
const HomePage = lazy(() => import('./home-page'))
const ProfilePage = lazy(() => import('./profile-page'))
const FindUserPage = lazy(() => import('./find-user-page'))
const UserPage = lazy(() => import('./user-page'))

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<RootLayout />
			</RequireAuth>
		),
		children: [
			{
				path: '',
				element: <HomePage />,
			},
			{
				path: '/me',
				element: <ProfilePage />,
			},
			{
				path: '/find-user',
				element: <FindUserPage />,
			},
			{
				path: '/users/:id',
				element: <UserPage />,
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
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
])
