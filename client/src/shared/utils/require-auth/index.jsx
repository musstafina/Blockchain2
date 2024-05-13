import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectToken } from '../../slices/user-slice'

export const RequireAuth = ({ children }) => {
	const token = useSelector(selectToken)

	if (!token) {
		return <Navigate to={'/auth/login'} replace />
	}

	return children
}
RequireAuth.propTypes = {
	children: PropTypes.node,
}
