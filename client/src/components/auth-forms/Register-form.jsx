import { Button, Typography } from 'antd'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useBlog } from '../../app/solana'

import { TextInput } from './Text-input'

const initialValues = {
	name: '',
	avatar: '',
}

const validationSchema = yup.object({
	name: yup.string().required('first name is required'),
	avatar: yup.string(),
})

export const RegisterForm = () => {
	const { initUser } = useBlog()
	const navigate = useNavigate()

	const onSubmit = async values => {
		// TODO: test this
		try {
			const { name, avatar } = values
			await initUser(name, avatar)
			navigate('/')
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			<Form>
				<Typography.Title style={{ textAlign: 'center' }}>
					Register
				</Typography.Title>

				<TextInput name='name' label={'enter name'} />
				<TextInput name='avatar' label={'enter avatar url'} />

				<Button
					type='primary'
					htmlType='submit'
					style={{ margin: '20px auto 0', display: 'block' }}
				>
					Register
				</Button>

				<Typography.Text
					style={{ textAlign: 'center', display: 'block', marginTop: 20 }}
				>
					Already have account?
					<Link to='/auth/login' style={{ marginLeft: 4 }}>
						login
					</Link>
				</Typography.Text>
			</Form>
		</Formik>
	)
}
