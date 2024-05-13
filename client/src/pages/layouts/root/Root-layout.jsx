import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../../components/navbar'
import { PageLoadingSpinner } from '../../../shared/ui'

export const RootLayout = () => {
	return (
		<>
			<Navbar />
			<Suspense fallback={<PageLoadingSpinner />}>
				<Outlet />
			</Suspense>
		</>
	)
}
