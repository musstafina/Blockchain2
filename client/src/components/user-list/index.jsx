import { Avatar, List, Typography } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const UserList = ({ users, altLabel, ...props }) => {
	return (
		<List
			{...props}
			dataSource={users}
			locale={{ emptyText: altLabel || ' ' }}
			renderItem={user => (
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar src={user.avatar} />}
						title={
							<Link
								to={`/users/${user.authority}`}
								style={{ textDecoration: 'none' }}
							>
								<Typography.Text>{user.name}</Typography.Text>
							</Link>
						}
					/>
				</List.Item>
			)}
		/>
	)
}
UserList.propTypes = {
	altLabel: PropTypes.string,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			publicKey: PropTypes.string,
			authority: PropTypes.string,
			name: PropTypes.string,
			avatar: PropTypes.string,
		})
	),
}
