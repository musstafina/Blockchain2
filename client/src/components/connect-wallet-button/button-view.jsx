import { WalletFilled, WalletOutlined } from '@ant-design/icons'
import { Button, Tooltip, Typography } from 'antd'
import PropTypes from 'prop-types'

import {
	CONNECTED_STATUS,
	LOADING_STATUS,
} from '../../shared/constants/wallet-loading-statuses'

export const ButtonView = ({ loadingStatus, onClick, ...props }) => {
	let walletIcon
	let tooltipTitle = ''
	switch (loadingStatus) {
		case LOADING_STATUS: {
			walletIcon = <WalletFilled />
			tooltipTitle = 'connecting...'
			break
		}
		case CONNECTED_STATUS: {
			walletIcon = <WalletOutlined />
			tooltipTitle = 'disconnect'
			break
		}
		default: {
			walletIcon = <WalletFilled />
			tooltipTitle = 'connect'
		}
	}

	return (
		<div
			{...props}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: 90,
			}}
		>
			<Tooltip title={tooltipTitle}>
				<Button
					size='large'
					disabled={loadingStatus === 'loading'}
					type='primary'
					icon={walletIcon}
					onClick={onClick}
				/>
			</Tooltip>
			{loadingStatus === 'connected' && (
				<Typography.Text>Connected</Typography.Text>
			)}
			{loadingStatus === 'disconnected' && (
				<Typography.Text>Disconnected</Typography.Text>
			)}
			{loadingStatus === 'Loading' && (
				<Typography.Text>connecting...</Typography.Text>
			)}
		</div>
	)
}
ButtonView.propTypes = {
	loadingStatus: PropTypes.string,
	onClick: PropTypes.func,
	props: PropTypes.object,
}
