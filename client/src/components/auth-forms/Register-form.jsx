import { Form, Formik } from 'formik'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { TextInput } from './Text-input'

const initialValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	biography: '',
	personalPhoto: '',
}

const validationSchema = yup.object({
	firstName: yup.string().required('first name is required'),
	lastName: yup.string().required('last name is required'),
	email: yup.string().required('email is required'),
	password: yup.string().required('password is required'),
	biography: yup.string(),
	personalPhoto: yup.string(),
})

export const RegisterForm = () => {
	const navigate = useNavigate()

	const onSubmit = async values => {
		console.log(values)
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			body: JSON.stringify(values),
		}
		const response = await fetch(
			'http://localhost:6600/api/register',
			fetchOptions
		)

		if (response.status === 201) {
			navigate('/auth/login')
		}
	}
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			<Form>
				<h1 className='h1 text-center'>Register</h1>
				<TextInput name='firstName' label={'enter firstName'} />
				<TextInput name='lastName' label={'enter lastName'} />
				<TextInput name='email' label={'enter email'} />
				<TextInput name='password' type='password' label={'enter password'} />
				<TextInput name='biography' label={'enter biography'} />
				<TextInput name='personalPhoto' label={'enter profilePicture'} />
				<Button
					className='d-block mx-auto mt-3'
					type='submit'
					variant='outline-secondary'
				>
					register
				</Button>
				<Link
					className='d-block mx-auto mt-3 btn btn-outline-secondary'
					to='/auth/login'
					style={{ width: 150 }}
				>
					go to login
				</Link>
			</Form>
		</Formik>
	)
}
