import PropTypes from 'prop-types'
import { PostCard } from './post-card'

export const PostsList = ({ posts = [] }) => {
	return (
		<div
			style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
		>
			{posts.map(post => (
				<PostCard key={post.id} {...post} />
			))}
		</div>
	)
}
PostsList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			title: PropTypes.string,
			content: PropTypes.string,
			authority: PropTypes.string,
			commentCount: PropTypes.number,
			lastCommentId: PropTypes.number,
			user: PropTypes.string,
		})
	),
}
