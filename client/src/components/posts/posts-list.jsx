import PropTypes from 'prop-types'
import { PostCard } from './post-card'

export const PostsList = ({ posts = [] }) => {
	return (
		<div
			style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
		>
			{posts.map(({ id, title, content }) => (
				<PostCard key={id} title={title} content={content} />
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
		})
	),
}
