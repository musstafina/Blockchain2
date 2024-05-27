import {
	Connection,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from '@solana/web3.js'

export const connectWallet = async () => {
	if (window.solana && window.solana.isPhantom) {
		try {
			const response = await window.solana.connect()
			console.log('Connected with public key:', response.publicKey.toString())
		} catch (err) {
			console.error('Error connecting to wallet:', err)
		}
	} else {
		alert('Phantom wallet not found. Please install it.')
	}
}

// export const addFriend = async friendAddress => {
// 	const {} = useWallet()

// 	const connection = new Connection('https://api.devnet.solana.com')
// 	const transaction = new Transaction().add(
// 		SystemProgram.transfer({
// 			fromPubkey: publicKey,
// 			toPubkey: new PublicKey('RECIPIENT_PUBLIC_KEY'), // Replace with the recipient's public key
// 			lamports: 1000000, // Amount in lamports (1 SOL = 1,000,000,000 lamports)
// 		})
// 	)

// 	const signature = await sendTransaction(transaction, connection)
// 	setTxSignature(signature)
// }

// export const addFriend = async friendKey => {
// 	const connection = new Connection('https://api.devnet.solana.com')
// 	const wallet = window.solana
// 	const { publicKey } = window.solana
// 	const newFriendsList = [
// 		{
// 			id: '1',
// 			name: 'ernur',
// 		},
// 	]

// 	const transaction = new Transaction().add(
// 		SystemProgram.write({
// 			programId: SystemProgram.programId,
// 			accountPubkey: publicKey,
// 			offset: 0,
// 			data: Buffer.from(newFriendsList),
// 		})
// 	)

// 	try {
// 		const signature = await wallet.signAndSendTransaction(transaction)
// 		await connection.confirmTransaction(signature)

// 		console.log('Friend added: ', friendKey)
// 	} catch (err) {
// 		console.error(err)
// 	}
// }

export const addFriend = async friendAddress => {
	try {
		const { publicKey: walletPublicKey } = window.solana

		if (!walletPublicKey) {
			throw new Error('Wallet not connected')
		}

		const friendPublicKey = new PublicKey(friendAddress)
		const connection = new Connection('https://api.devnet.solana.com')
		const { blockhash } = await connection.getRecentBlockhash()

		const transaction = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: walletPublicKey,
				toPubkey: friendPublicKey,
				lamports: LAMPORTS_PER_SOL * 0.1, // Small amount of lamports to simulate adding friend
			})
		)

		transaction.recentBlockhash = blockhash
		transaction.feePayer = walletPublicKey

		// Sign the transaction with the wallet
		const signedTransaction = await window.solana.signTransaction(transaction)

		// Send the signed transaction
		const signature = await connection.sendRawTransaction(
			signedTransaction.serialize()
		)

		await connection.confirmTransaction(signature)

		console.log('Friend added:', friendAddress)
	} catch (error) {
		console.error('Error adding friend:', error)
	}
}

export const getTransactionHistory = async () => {
	try {
		const connection = new Connection('https://api.devnet.solana.com')
		const { publicKey: accountPublicKey } = window.solana

		try {
			const accountInfo = await connection.getAccountInfo(accountPublicKey)
			console.log(accountInfo.data.toString())
			// if (accountInfo) {
			//   const friendsList = accountInfo.data.toString().split(',');
			// }
		} catch (err) {
			console.error(err)
		}

		// // Fetch recent transaction signatures for the address
		// const signatures = await connection.getSignaturesForAddress(pubKey, {
		// 	limit: 1,
		// })

		// console.log(signatures)

		// // Fetch details for each transaction using the signatures
		// const transactions = await Promise.all(
		// 	signatures.map(async signatureInfo => {
		// 		const transaction = await connection.getTransaction(
		// 			signatureInfo.signature
		// 		)
		// 		return transaction
		// 	})
		// )

		// // Display the transaction history
		// console.log('Transaction History:', transactions)
		// return transactions
	} catch (error) {
		console.error('Error fetching transaction history:', error)
	}
}
