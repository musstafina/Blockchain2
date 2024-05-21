import { Col, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

import { PostsList } from '../../components/posts-list'
import { UserCard } from '../../components/user-card'
import { UserList } from '../../components/user-list'
import { useUserByIdQuery } from '../../shared/api'

const UserPage = () => {
	const { id } = useParams()
	const { data: user, isLoading } = useUserByIdQuery(id)

	if (isLoading) return null

	if (!user)
		return (
			<Typography.Title style={{ textAlign: 'center' }}>
				User not found
			</Typography.Title>
		)

	const { firstName, lastName, email, personalPhoto } = user

	return (
		<>
			<Helmet>
				<title>
					{firstName} {lastName}
				</title>
			</Helmet>
			<Row>
				<Col span={4} offset={2}>
					<UserCard
						firstName={firstName}
						lastName={lastName}
						email={email}
						profilePicture={personalPhoto}
					/>
				</Col>
				<Col offset={1} span={10}>
					<PostsList />
				</Col>

				<Col offset={1} span={4}>
					<UserList />
				</Col>
			</Row>
		</>
	)
}

export default UserPage
