import { Card } from 'antd'
import PropTypes from 'prop-types'

export const PostCard = ({ title, content, ...props }) => {
	return (
		<Card
			{...props}
			title={title}
			style={{ width: '100%', margin: '20px auto' }}
		>
			<p>{content}</p>
		</Card>
	)
}
PostCard.propTypes = {
	props: PropTypes.object,
	title: PropTypes.string,
	content: PropTypes.string,
}
