import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { PostsList } from '../../components/posts'

import { useBlog } from '../../app/solana'

const HomePage = () => {
	const [posts, setPosts] = useState([])
	const { getAllPosts } = useBlog()

	useEffect(() => {
		getAllPosts().then(posts => {
			if (posts) {
				console.log('posts:', posts)
				setPosts(
					posts.map(post => ({
						id: post.account.id,
						title: post.account.title,
						content: post.account.content,
						authority: post.account.authority.toString(),
						lastCommentId: post.account.lastCommentId,
						publicKey: post.publicKey.toString(),
						user: post.account.user.toString(),
					}))
				)
			}
		})
	}, [getAllPosts])

	return (
		<>
			<Helmet>
				<title>all posts</title>
			</Helmet>
			<Row>
				<Col offset={6} span={12}>
					<PostsList posts={posts} />
				</Col>
			</Row>
		</>
	)
}

export default HomePage
