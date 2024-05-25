import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../../slices/user-slice'

export const RequireAuth = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated)

	if (!isAuthenticated) {
		return <Navigate to={'/auth/login'} replace />
	}

	return children
}
RequireAuth.propTypes = {
	children: PropTypes.node,
}
