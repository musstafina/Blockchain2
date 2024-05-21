import { Col, Row } from 'antd'
import { Helmet } from 'react-helmet'

import { RegisterForm } from '../../components/auth-forms'

const RegisterPage = () => {
	return (
		<>
			<Helmet>
				<title>Register</title>
			</Helmet>

			<Row>
				<Col offset={8} span={8}>
					<RegisterForm />
				</Col>
			</Row>
		</>
	)
}

export default RegisterPage
