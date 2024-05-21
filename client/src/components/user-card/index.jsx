import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Typography } from 'antd'
import PropTypes from 'prop-types'

export const UserCard = ({ profilePicture, firstName, lastName, email }) => {
	return (
		<Card style={{ textAlign: 'center' }}>
			<Avatar
				size={100}
				src={profilePicture}
				alt={`${firstName} ${lastName}`}
				icon={<UserOutlined />}
				style={{ marginBottom: 20 }}
			/>
			<Typography.Title
				style={{ fontSize: 25 }}
			>{`${firstName} ${lastName}`}</Typography.Title>
			<Typography.Paragraph>{email}</Typography.Paragraph>
		</Card>
	)
}
UserCard.propTypes = {
	profilePicture: PropTypes.string,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	email: PropTypes.string,
}
