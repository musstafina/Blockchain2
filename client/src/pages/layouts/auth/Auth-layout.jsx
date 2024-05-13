import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLoadingSpinner } from '../../../shared/ui'

export const AuthLayout = () => {
	return (
		<Suspense fallback={<PageLoadingSpinner />}>
			<Outlet />
		</Suspense>
	)
}
