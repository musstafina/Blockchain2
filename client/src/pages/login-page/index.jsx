import { Helmet } from 'react-helmet'

import { Col, Row } from 'antd'
import { LoginForm } from '../../components/auth-forms'

const LoginPage = () => {
	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>

			<Row>
				<Col offset={8} span={8}>
					<LoginForm />
				</Col>
			</Row>
		</>
	)
}

export default LoginPage
