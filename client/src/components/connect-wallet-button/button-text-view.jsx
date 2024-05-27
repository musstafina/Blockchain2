import { Button } from 'antd'
import PropTypes from 'prop-types'

import {
	CONNECTED_STATUS,
	LOADING_STATUS,
} from '../../shared/constants/wallet-loading-statuses'

export const ButtonTextView = ({ loadingStatus, onClick, ...props }) => {
	let text = ''
	switch (loadingStatus) {
		case LOADING_STATUS: {
			text = 'connecting...'
			break
		}
		case CONNECTED_STATUS: {
			text = 'connected'
			break
		}
		default: {
			text = 'connect wallet'
		}
	}

	return (
		<Button {...props} onClick={onClick}>
			{text}
		</Button>
	)
}
ButtonTextView.propTypes = {
	loadingStatus: PropTypes.string,
	onClick: PropTypes.func,
	props: PropTypes.object,
}
