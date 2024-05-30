import * as anchor from '@project-serum/anchor'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import {
	useAnchorWallet,
	useConnection,
	useWallet,
} from '@solana/wallet-adapter-react'
import '@solana/wallet-adapter-react-ui/styles.css'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import PropTypes from 'prop-types'
import { createContext, useContext, useMemo } from 'react'
import idl from '../../shared/idle/idl.json'

const BlogContext = createContext()

export const useBlog = () => {
	const context = useContext(BlogContext)
	if (!context) {
		throw new Error('Parent must be wrapped inside PostsProvider')
	}

	return context
}

const PROGRAM_KEY = new PublicKey(idl.metadata.address)

export const BlogProvider = ({ children }) => {
	const anchorWallet = useAnchorWallet()
	const { connection } = useConnection()
	const { publicKey } = useWallet()

	const program = useMemo(() => {
		if (!anchorWallet) {
			return
		}
		const provider = new anchor.AnchorProvider(
			connection,
			anchorWallet,
			anchor.AnchorProvider.defaultOptions()
		)
		const program = new anchor.Program(idl, PROGRAM_KEY, provider)
		return program
	}, [connection, anchorWallet])

	const getMyProfile = async () => {
		if (!program || !publicKey) return

		try {
			const [userPda] = findProgramAddressSync(
				[utf8.encode('user'), publicKey.toBuffer()],
				program.programId
			)
			const user = await program.account.userAccount.fetch(userPda)
			return user
		} catch (err) {
			console.log('no user', err)
		}
	}

	const initUser = async (name, avatar) => {
		if (!program || !publicKey) return

		try {
			const [userPda] = findProgramAddressSync(
				[utf8.encode('user'), publicKey.toBuffer()],
				program.programId
			)
			await program.methods
				.initUser(name, avatar)
				.accounts({
					userAccount: userPda,
					authority: publicKey,
					systemProgram: SystemProgram.programId,
				})
				.rpc()
		} catch (err) {
			console.log('init user:', err)
		}
	}

	const initPost = async (title, content) => {
		if (!program || !publicKey) return

		try {
			const [userPda] = findProgramAddressSync(
				[utf8.encode('user'), publicKey.toBuffer()],
				program.programId
			)
			const user = await getMyProfile()
			const [postPda] = findProgramAddressSync(
				[
					utf8.encode('post'),
					publicKey.toBuffer(),
					Uint8Array.from([user.lastPostId]),
				],
				program.programId
			)
			await program.methods
				.createPost(title, content)
				.accounts({
					postAccount: postPda,
					userAccount: userPda,
					authority: publicKey,
					systemProgram: SystemProgram.programId,
				})
				.rpc()
		} catch (err) {
			console.log('init post:', err)
		}
	}

	const getAllPosts = async () => {
		if (!program || !publicKey) return

		try {
			const posts = await program.account.postAccount.all()
			return posts
		} catch (err) {
			console.log('getAllPosts:', err)
		}
	}

	const getUserByPublicKey = async publicKey => {
		if (!program || !publicKey) return

		try {
			const [userPda] = findProgramAddressSync(
				[utf8.encode('user'), publicKey.toBuffer()],
				program.programId
			)
			const user = await program.account.userAccount.fetch(userPda)
			return user
		} catch (err) {
			console.log('no user', err)
		}
	}

	const getAllUsers = async () => {
		if (!program || !publicKey) return

		try {
			const users = await program.account.userAccount.all()
			return users
		} catch (err) {
			console.log('getAllPosts:', err)
		}
	}

	const sendFriendRequest = async receiverWalletAddress => {
		if (!program || !publicKey) return
		const receiverPublicKey = new PublicKey(receiverWalletAddress)
		try {
			const [userPda] = findProgramAddressSync(
				[utf8.encode('user'), publicKey.toBuffer()],
				program.programId
			)
			await program.methods
				.sendFriendRequest()
				.accounts({
					sender: userPda,
					receiver: receiverPublicKey,
					authority: publicKey,
				})
				.rpc()
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<BlogContext.Provider
			value={{
				getMyProfile,
				initUser,
				initPost,
				getAllPosts,
				getUserByPublicKey,
				getAllUsers,
				sendFriendRequest,
			}}
		>
			{children}
		</BlogContext.Provider>
	)
}
BlogProvider.propTypes = {
	children: PropTypes.node,
}
