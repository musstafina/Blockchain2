import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from '../../shared/slices/user-slice'
import logoutIcon from '/assets/icons/logout.png'

export const LogoutButton = () => {
	const dispatch = useDispatch()

	const onClick = () => {
		dispatch(logout())
	}
	return (
		<Button
			variant='light'
			className='w-100 p-0 d-flex justify-content-center align-items-center'
			onClick={onClick}
		>
			<img src={logoutIcon} alt='logout button' />
		</Button>
	)
}
