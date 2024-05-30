import { Button, Form, Input } from 'antd'
import { useBlog } from '../../app/solana'

const { TextArea } = Input

const initialValues = {
	title: '',
	content: '',
}

export const CreatePostForm = () => {
	const { initPost } = useBlog()

	const onSubmit = async ({ title, content }) => {
		if (!title || !content) return
		try {
			await initPost(title, content)
			console.log('post created')
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<Form onFinish={onSubmit}>
			<Form.Item name={'title'}>
				<TextArea
					name='title'
					placeholder='post title'
					autoSize={{ minRows: 1 }}
				/>
			</Form.Item>

			<Form.Item name={'content'}>
				<TextArea
					name='content'
					className='mt-3'
					placeholder='Post content'
					autoSize={{ minRows: 4 }}
				/>
			</Form.Item>
			<Button className='mx-auto d-block mt-3' htmlType='submit'>
				post
			</Button>
		</Form>
	)
}
