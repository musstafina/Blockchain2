import { PublicKey } from '@solana/web3.js'
import { Button } from 'antd'
import {
	addFriend,
	connectWallet,
	getTransactionHistory,
} from '../../shared/solana-service'

const HomePage = () => {
	return (
		<>
			<h1 className='h1 text-center mt-5'>home page</h1>
			<Button type='primary' onClick={connectWallet}>
				connectWallet
			</Button>
			<Button
				type='primary'
				onClick={() => {
					const { publicKey } = window.solana
					// console.log('publicKey', publicKey && publicKey.toString())
					const walletPublicKey = new PublicKey(publicKey.toString())
					console.log(walletPublicKey)
					console.log(publicKey)
				}}
			>
				log publicKey
			</Button>
			<Button
				type='primary'
				onClick={() =>
					addFriend('5sY7zicgjDMeAsrE48po6yofEzv6GxdLTW9ACQWs2TtA')
				}
			>
				add to friends
			</Button>
			<Button type='primary' onClick={() => console.log(window.solana)}>
				log window solana
			</Button>
			<Button
				type='primary'
				onClick={() => {
					getTransactionHistory()
				}}
			>
				log transaction history
			</Button>
		</>
	)
}

export default HomePage
