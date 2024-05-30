import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Typography } from 'antd'
import PropTypes from 'prop-types'

export const UserCard = ({ name, avatar }) => {
	return (
		<Card style={{ textAlign: 'center' }}>
			<Avatar
				size={100}
				src={avatar}
				alt={name}
				icon={<UserOutlined />}
				style={{ marginBottom: 20 }}
			/>
			<Typography.Title style={{ fontSize: 25 }}>{name}</Typography.Title>
		</Card>
	)
}
UserCard.propTypes = {
	name: PropTypes.string,
	avatar: PropTypes.string,
}
