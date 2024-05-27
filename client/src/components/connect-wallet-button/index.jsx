import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { CONNECTED_STATUS } from '../../shared/constants/wallet-loading-statuses'
import {
	connectWallet,
	disconnectWallet,
	selectWalletAddressLoadingStatus,
} from '../../shared/slices/user-slice'
import { ButtonTextView } from './button-text-view'
import { ButtonView } from './button-view'

export const ConnectWalletButton = ({ type, ...props }) => {
	const loadingStatus = useSelector(selectWalletAddressLoadingStatus)
	const dispatch = useDispatch()

	const onClick = () => {
		if (loadingStatus === CONNECTED_STATUS) {
			dispatch(disconnectWallet())
			return
		}
		dispatch(connectWallet())
	}

	switch (type) {
		case 'icon': {
			return (
				<ButtonView
					{...props}
					loadingStatus={loadingStatus}
					onClick={onClick}
				/>
			)
		}
		case 'text': {
			return (
				<ButtonTextView
					{...props}
					loadingStatus={loadingStatus}
					onClick={onClick}
				/>
			)
		}
		default: {
			return null
		}
	}
}
ConnectWalletButton.propTypes = {
	type: PropTypes.oneOf(['icon', 'text']),
	props: PropTypes.object,
}
