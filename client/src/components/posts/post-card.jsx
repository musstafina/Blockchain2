import { Button, Card, List, Typography } from 'antd'
import PropTypes from 'prop-types'
import { useBlog } from '../../app/solana'

const { Title, Text } = Typography

export const PostCard = ({
	id,
	title,
	content,
	lastCommentId,
	authority,
	user,
	...props
}) => {
	const { addComment } = useBlog()
	// return (
	// 	<Card
	// 		{...props}
	// 		title={title}
	// 		style={{ width: '100%', margin: '20px auto' }}
	// 	>
	// 		<p>{content}</p>
	// 	</Card>
	// )
	const onAddComment = async () => {
		const commentContent = 'comment_content'
		console.log(commentContent, lastCommentId, authority, id)
		await addComment(commentContent, lastCommentId, authority, id)
	}
	return (
		<Card style={{ marginBottom: 16 }}>
			<Title level={4}>{title}</Title>
			<Text type='secondary'>by author</Text>
			<p>{content}</p>
			<Title level={5}>Comments</Title>
			<List
				dataSource={[]}
				renderItem={(comment, index) => (
					<List.Item key={index}>
						<Text>{comment}</Text>
					</List.Item>
				)}
			/>
			{/* <TextArea
				value={newComment}
				onChange={e => setNewComment(e.target.value)}
				rows={2}
				placeholder='Add a comment'
				style={{ marginBottom: 8 }}
			/> */}
			<Button type='primary' onClick={onAddComment}>
				Add Comment
			</Button>
		</Card>
	)
}
PostCard.propTypes = {
	props: PropTypes.object,
	id: PropTypes.number,
	title: PropTypes.string,
	content: PropTypes.string,
	authority: PropTypes.string,
	commentCount: PropTypes.number,
	lastCommentId: PropTypes.number,
	user: PropTypes.string,
	publicKey: PropTypes.string,
}
