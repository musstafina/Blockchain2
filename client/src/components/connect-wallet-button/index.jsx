import { ethers } from 'ethers'
import { useState } from 'react'
import { ButtonView } from './button-view'

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

	return <ButtonView loadingStatus={loadingStatus} onClick={onClick} />
}
