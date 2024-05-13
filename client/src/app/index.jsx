import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from '../pages'
import { store } from './store'
import './style/index.sass'

export const App = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	)
}

// TODO: use asyncThunk instead rtk query