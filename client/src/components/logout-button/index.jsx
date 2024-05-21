import { RightSquareOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'

import { loggedOut } from '../../shared/slices/auth-slice'

export const LogoutButton = () => {
	const dispatch = useDispatch()

	const onClick = () => {
		dispatch(loggedOut())
	}

	return (
		<Tooltip title='logout'>
			<Button
				onClick={onClick}
				type='primary'
				size='large'
				icon={<RightSquareOutlined />}
			/>
		</Tooltip>
	)
}
