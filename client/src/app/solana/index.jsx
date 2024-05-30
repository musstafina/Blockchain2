import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { BlogProvider } from './blog-provider'

export const PhantomWalletProvider = ({ children }) => {
	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
	const network = WalletAdapterNetwork.Devnet

	// You can also provide a custom RPC endpoint.
	const endpoint = useMemo(() => clusterApiUrl(network), [network])

	const wallets = useMemo(
		() => [new PhantomWalletAdapter()],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[network]
	)

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<BlogProvider>
					<WalletModalProvider>{children}</WalletModalProvider>
				</BlogProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}
PhantomWalletProvider.propTypes = {
	children: PropTypes.node,
}

export { useBlog } from './blog-provider'
