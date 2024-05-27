import { Card, Col, Divider, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'

import { LogoutButton } from '../../components/logout-button'
import { PostsList } from '../../components/posts-list'
import { UserCard } from '../../components/user-card'
import { UserList } from '../../components/user-list'
import { useUserProfileQuery } from '../../shared/api/user-api-slice'

const friends = [
	{
		firstName: 'ernur',
		lastName: 'garifullin',
		profilePicture: '',
		id: '',
	},
]

const ProfilePage = () => {
	const { data, isLoading } = useUserProfileQuery()

	if (isLoading) return null

	const { firstName, lastName, email, personalPhoto } = data

	return (
		<>
			<Helmet>
				<title>
					{firstName} {lastName}
				</title>
			</Helmet>

			<Row>
				<Col offset={2} span={4}>
					<UserCard
						firstName={firstName}
						lastName={lastName}
						email={email}
						profilePicture={personalPhoto}
					/>
					<LogoutButton />
				</Col>
				<Col offset={1} span={10}>
					<PostsList />
				</Col>

				<Col offset={1} span={4}>
					<Card>
						<Typography.Title level={2} style={{ marginLeft: 6, fontSize: 15 }}>
							Friends
						</Typography.Title>
						<UserList />
						<Divider />
						<Typography.Title level={2} style={{ marginLeft: 6, fontSize: 15 }}>
							Friend requests
						</Typography.Title>
						<UserList />
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ProfilePage
