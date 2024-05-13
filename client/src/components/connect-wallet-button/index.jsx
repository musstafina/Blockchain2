import { ethers } from 'ethers'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import walletConnected from '/assets/icons/wallet-connected.png'
import walletLoading from '/assets/icons/wallet-loading.png'
import wallet from '/assets/icons/wallet.png'

export const ConnectWalletButton = () => {
	const [walletAddress, setWalletAddress] = useState('')
	const [loadingStatus, setLoadingStatus] = useState('disconnected')

	const onClick = async () => {
		setLoadingStatus('loading')
		try {
			if (loadingStatus === 'connected') {
				setLoadingStatus('disconnected')
				setWalletAddress('')
				return
			}

			const provider = new ethers.BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			const _walletAddress = await signer.getAddress()
			console.log('Connected wallet address: ', _walletAddress)
			setWalletAddress(_walletAddress)
			setLoadingStatus('connected')
		} catch (error) {
			console.log(error)
			setLoadingStatus('disconnected')
		}
	}

	let walletIcon = wallet
	if (loadingStatus === 'loading') {
		walletIcon = walletLoading
	} else if (loadingStatus === 'connected') {
		walletIcon = walletConnected
	}

	return (
		<Button
			variant='light'
			className='w-100 p-0 d-flex flex-wrap justify-content-center align-items-center'
			onClick={onClick}
			disabled={loadingStatus === 'loading'}
		>
			<img src={walletIcon} className='w-100' alt='connect wallet' />
			<div>{loadingStatus === 'connected' && 'Connected'}</div>
			<div>{loadingStatus === 'disconnected' && 'Connect'}</div>
		</Button>
	)
}
