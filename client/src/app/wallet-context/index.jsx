import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import PropTypes from 'prop-types'
import { createContext, useContext, useMemo } from 'react'

const WalletContext = createContext()

export const WalletContextProvider = ({ children }) => {
	const network = clusterApiUrl('devnet')
	const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

	return (
		<ConnectionProvider endpoint={network}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}
WalletContextProvider.propTypes = {
	children: PropTypes.node,
}

export const useWalletContext = () => {
	return useContext(WalletContext)
}
