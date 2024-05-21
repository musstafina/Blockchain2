import { Layout } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Navbar } from '../../../components/navbar'
import { PageLoadingSpinner } from '../../../shared/ui'

export const RootLayout = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Navbar />

			<Layout.Content style={{ paddingTop: 20, height: '100%' }}>
				<Suspense fallback={<PageLoadingSpinner />}>
					<Outlet />
				</Suspense>
			</Layout.Content>
		</Layout>
	)
}
