import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const items = [
	{
		key: '/',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/'>
				home
			</Link>
		),
	},
	{
		key: '/find-user',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/find-user'>
				find user
			</Link>
		),
	},
	{
		key: '/me',
		label: (
			<Link style={{ textDecoration: 'none' }} to='/me'>
				profile
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
			/>
		</Layout.Header>
	)
}
