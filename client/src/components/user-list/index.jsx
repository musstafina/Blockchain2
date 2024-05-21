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
						avatar={<Avatar src={user.personalPhoto} />}
						title={
							<Link
								to={`/users/${user._id}`}
								style={{ textDecoration: 'none' }}
							>
								<Typography.Text>
									{user.firstName} {user.lastName}
								</Typography.Text>
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
			_id: PropTypes.string,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
			personalPhoto: PropTypes.string,
		})
	),
}
