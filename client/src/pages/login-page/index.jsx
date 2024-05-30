import { WalletModalButton } from '@solana/wallet-adapter-react-ui'
import { Helmet } from 'react-helmet'

const LoginPage = () => {
	return (
		<>
			<Helmet>
				<title>Connect wallet</title>
			</Helmet>

			<div className='d-flex justify-content-center mt-5'>
				<WalletModalButton />
			</div>
		</>
	)
}

export default LoginPage
