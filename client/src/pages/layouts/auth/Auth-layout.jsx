import { Layout } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLoadingSpinner } from '../../../shared/ui'

export const AuthLayout = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Layout.Content style={{ paddingTop: 100 }}>
				<Suspense fallback={<PageLoadingSpinner />}>
					<Outlet />
				</Suspense>
			</Layout.Content>
		</Layout>
	)
}
