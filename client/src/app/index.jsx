import { RouterProvider } from 'react-router-dom'
import { router } from '../pages'
import { PhantomWalletProvider } from './solana'
import './style/index.sass'

export const App = () => {
	return (
		<PhantomWalletProvider>
			<RouterProvider router={router} />
		</PhantomWalletProvider>
	)
}
