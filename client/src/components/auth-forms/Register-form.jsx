import { Button, Typography } from 'antd'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useSelector } from 'react-redux'
import { CONNECTED_STATUS } from '../../shared/constants/wallet-loading-statuses'
import {
	selectWalletAddress,
	selectWalletAddressLoadingStatus,
} from '../../shared/slices/user-slice'
import { ConnectWalletButton } from '../connect-wallet-button'
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
	const walletStatus = useSelector(selectWalletAddressLoadingStatus)
	const walletAddress = useSelector(selectWalletAddress)
	const navigate = useNavigate()

	const onSubmit = async values => {
		console.log(values)
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			body: JSON.stringify({
				...values,
				walletAddress,
			}),
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
				<Typography.Title style={{ textAlign: 'center' }}>
					Register
				</Typography.Title>

				<TextInput name='firstName' label={'enter firstName'} />
				<TextInput name='lastName' label={'enter lastName'} />
				<TextInput name='email' label={'enter email'} />
				<TextInput name='password' type='password' label={'enter password'} />
				<TextInput name='biography' label={'enter biography'} />
				<TextInput name='personalPhoto' label={'enter profilePicture'} />
				<ConnectWalletButton type={'text'} className={'w-100 mt-3'} />

				<Button
					type='primary'
					htmlType='submit'
					style={{ margin: '20px auto 0', display: 'block' }}
					disabled={walletStatus !== CONNECTED_STATUS}
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
