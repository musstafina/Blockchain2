import { WalletFilled, WalletOutlined } from '@ant-design/icons'
import { Button, Tooltip, Typography } from 'antd'
import PropTypes from 'prop-types'

export const ButtonView = ({ loadingStatus, onClick }) => {
	let walletIcon
	let tooltipTitle = ''
	switch (loadingStatus) {
		case 'loading': {
			walletIcon = <WalletFilled />
			tooltipTitle = 'connecting...'
			break
		}
		case 'connected': {
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
}
