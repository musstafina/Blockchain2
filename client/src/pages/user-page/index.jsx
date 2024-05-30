import { Card, Col, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

import { useBlog } from '../../app/solana'

import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { PostsList } from '../../components/posts'
import { UserCard } from '../../components/user-card'
import { UserList } from '../../components/user-list'

const UserPage = () => {
	const { getUserByPublicKey } = useBlog()
	const { publicKey } = useParams()
	const [user, setUser] = useState(null)

	useEffect(() => {
		getUserByPublicKey(new PublicKey(publicKey)).then(user => {
			if (user) {
				setUser({
					name: user.name,
					avatar: user.avatar,
				})
			}
		})
	})

	if (!user) {
		return (
			<Typography.Title style={{ textAlign: 'center' }}>
				User not found
			</Typography.Title>
		)
	}

	const { avatar, name } = user

	return (
		<>
			<Helmet>
				<title>{name}</title>
			</Helmet>

			<Row>
				<Col offset={2} span={4}>
					<UserCard name={name} avatar={avatar} />
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
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default UserPage
