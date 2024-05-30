import { Card, Col, Divider, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlog } from '../../app/solana'
import { PostsList } from '../../components/posts'
import { UserCard } from '../../components/user-card'
import { UserList } from '../../components/user-list'

const friends = [
	{
		firstName: 'ernur',
		lastName: 'garifullin',
		profilePicture: '',
		id: '',
	},
]

const ProfilePage = () => {
	const navigate = useNavigate()
	const { getMyProfile, getAllPosts } = useBlog()
	const wallet = useWallet()
	const [user, setUser] = useState(null)
	const [posts, setPosts] = useState([])

	useEffect(() => {
		getMyProfile().then(data => setUser(data))
	}, [])

	useEffect(() => {
		getAllPosts().then(posts => {
			if (posts) {
				posts = posts.map(post => ({
					authority: post.account.authority.toString(),
					title: post.account.title,
					content: post.account.content,
				}))

				posts = posts.filter(
					post => post.authority === wallet.publicKey.toString()
				)

				setPosts(posts)
			}
		})
	}, [])

	if (!user) return null

	const { name, avatar, friendRequests, friends } = user

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
					<PostsList posts={posts} />
				</Col>

				<Col offset={1} span={4}>
					<Card>
						<Typography.Title level={2} style={{ marginLeft: 6, fontSize: 15 }}>
							Friends
						</Typography.Title>
						<UserList users={friends} />
						<Divider />
						<Typography.Title level={2} style={{ marginLeft: 6, fontSize: 15 }}>
							Friend requests
						</Typography.Title>
						<UserList users={friendRequests} />
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ProfilePage
