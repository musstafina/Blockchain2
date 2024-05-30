import { Button, Card, Col, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

import { useBlog } from '../../app/solana'

import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { PostsList } from '../../components/posts'
import { UserCard } from '../../components/user-card'
import { UserList } from '../../components/user-list'

const UserPage = () => {
	const { getUserByPublicKey, getAllPosts, sendFriendRequest } = useBlog()
	const { publicKey } = useParams()
	const [user, setUser] = useState(null)
	const [posts, setPosts] = useState([])

	console.log(user)

	useEffect(() => {
		getUserByPublicKey(new PublicKey(publicKey)).then(user => {
			if (user) {
				console.log('user:', user)
				setUser({
					authority: user.authority.toString(),
					name: user.name,
					avatar: user.avatar,
					userPublicKey: user.publicKey,
				})
			}
		})
	}, [publicKey])

	useEffect(() => {
		getAllPosts().then(posts => {
			if (posts) {
				posts = posts.map(post => ({
					authority: post.account.authority.toString(),
					title: post.account.title,
					content: post.account.content,
				}))

				posts = posts.filter(post => post.authority === publicKey)

				setPosts(posts)
			}
		})
	}, [])

	if (!user) {
		return (
			<Typography.Title style={{ textAlign: 'center' }}>
				User not found
			</Typography.Title>
		)
	}

	const { avatar, name, authority } = user

	const onSendFriendRequest = async () => {
		await sendFriendRequest(authority.toString())
	}

	return (
		<>
			<Helmet>
				<title>{name}</title>
			</Helmet>

			<Row>
				<Col offset={2} span={4}>
					<UserCard name={name} avatar={avatar} />
					<Button onClick={onSendFriendRequest} className='mt-2 ms-1'>
						Add to friends
					</Button>
				</Col>
				<Col offset={1} span={10}>
					<PostsList posts={posts} />
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
