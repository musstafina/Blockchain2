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
				setPosts(
					posts.map(({ account }) => ({
						id: account.id,
						title: account.title,
						content: account.content,
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
