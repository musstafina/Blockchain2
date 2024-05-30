import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const items = [
	{
		key: '/me',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/me'>
				profile
			</Link>
		),
	},
	{
		key: '/',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/'>
				all posts
			</Link>
		),
	},
	{
		key: '/users',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/users'>
				all users
			</Link>
		),
	},

	{
		key: '/create-post',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/create-post'>
				create post
			</Link>
		),
	},
	{
		key: '/auth/register',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/auth/register'>
				Register
			</Link>
		),
	},
	{
		key: '/auth/login',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/auth/login'>
				Connect wallet
			</Link>
		),
	},
]

export const Navbar = () => {
	const { pathname } = useLocation()

	return (
		<Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
			<Menu
				theme='dark'
				items={items}
				mode='horizontal'
				selectedKeys={[pathname]}
				style={{ width: '100%' }}
			/>
		</Layout.Header>
	)
}
