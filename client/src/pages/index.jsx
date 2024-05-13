import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from '../shared/utils/require-auth'
import { AuthLayout, RootLayout } from './layouts'

const LoginPage = lazy(() => import('./login-page'))
const RegisterPage = lazy(() => import('./register-page'))
const HomePage = lazy(() => import('./home-page'))
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
