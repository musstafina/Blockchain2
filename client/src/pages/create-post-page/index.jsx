import { Col, Row } from 'antd'
import { Helmet } from 'react-helmet'
import { CreatePostForm } from '../../components/create-post-form'

const CreatePostPage = () => {
	return (
		<>
			<Helmet>
				<title>Create post</title>
			</Helmet>
			<Row className='mt-5'>
				<Col offset={6} span={12}>
					<CreatePostForm />
				</Col>
			</Row>
		</>
	)
}
export default CreatePostPage
