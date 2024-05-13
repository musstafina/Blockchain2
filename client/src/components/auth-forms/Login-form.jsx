import { Form, Formik } from 'formik'
import { Button, Spinner } from 'react-bootstrap'
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
					<h1 className='h1 text-center'>Login</h1>
					<TextInput name='email' label={'enter email'} />
					<TextInput name='password' type='password' label={'enter password'} />
					<Button
						className='d-block mx-auto mt-3'
						type='submit'
						variant='outline-secondary'
					>
						login
					</Button>
					<Link
						className='d-block mx-auto mt-3 btn btn-outline-secondary'
						to='/auth/register'
						style={{ width: 150 }}
					>
						go to register
					</Link>
				</Form>
			</Formik>

			{isUninitialized || <Spinner className='d-block mx-auto mt-5' />}
		</>
	)
}
