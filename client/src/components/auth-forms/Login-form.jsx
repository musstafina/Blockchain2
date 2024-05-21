import { Button, Spin, Typography } from 'antd'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useLoginMutation } from '../../shared/api'
import { TextInput } from './Text-input'

const initialValues = {
	email: '',
	password: '',
}

const validationSchema = yup.object({
	email: yup.string().required('email is required'),
	password: yup.string().required('password is required'),
})

export const LoginForm = () => {
	const [login, { isUninitialized }] = useLoginMutation()
	const navigate = useNavigate()

	const onSubmit = async values => {
		await login(values)
		navigate('/')
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form>
					<Typography.Title style={{ textAlign: 'center' }}>
						Login
					</Typography.Title>

					<TextInput name='email' label={'enter email'} />
					<TextInput name='password' type='password' label={'enter password'} />

					<Button
						type='primary'
						htmlType='submit'
						style={{ margin: '20px auto 0', display: 'block' }}
					>
						login
					</Button>

					<Typography.Text
						style={{ textAlign: 'center', display: 'block', marginTop: 20 }}
					>
						Don`t have account?
						<Link to='/auth/register' style={{ marginLeft: 4 }}>
							register
						</Link>
					</Typography.Text>
				</Form>
			</Formik>

			{isUninitialized || (
				<Spin
					size='large'
					style={{ margin: '20px auto 0', display: 'block' }}
				/>
			)}
		</>
	)
}
