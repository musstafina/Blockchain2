import { Button, Card, Col, Row, Typography } from 'antd'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'

import { useBlog } from '../../app/solana'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { PostsList } from '../../components/posts'
import { UserCard } from '../../components/user-card'
import { UserList } from '../../components/user-list'

const UserPage = () => {
	const navigate = useNavigate()
	const {
		getUserByWalletAddress,
		getAllPosts,
		sendFriendRequest,
		getFriendStatus,
		acceptRequest,
	} = useBlog()
	const wallet = useWallet()
	const { publicKey } = useParams()
	const [user, setUser] = useState(null)
	const [posts, setPosts] = useState([])
	const [friendStatus, setFriendStatus] = useState()

	useEffect(() => {
		if (wallet.publicKey.toString() === publicKey) {
			navigate('/me')
		}
	}, [publicKey])

	useEffect(() => {
		getUserByWalletAddress(publicKey).then(user => setUser(user))
		getFriendStatus(publicKey).then(result => setFriendStatus(result))
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

	const { avatar, name } = user
	console.log(user)

	const onSendFriendRequest = async () => {
		await sendFriendRequest(publicKey)
	}

	const onAcceptFriendRequest = async () => {
		await acceptRequest(publicKey)
	}

	return (
		<>
			<Helmet>
				<title>{name}</title>
			</Helmet>

			<Row>
				<Col offset={2} span={4}>
					<UserCard name={name} avatar={avatar} />
					{friendStatus === 'requested' && (
						<Button onClick={onAcceptFriendRequest} className='mt-2 ms-1'>
							Accept request
						</Button>
					)}
					{friendStatus === 'not_friend' && (
						<Button onClick={onSendFriendRequest} className='mt-2 ms-1'>
							Add to friends
						</Button>
					)}
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
