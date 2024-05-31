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
		return getUserByWalletAddress(publicKey)
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

	const getUserByWalletAddressWithoutFriends = async walletAddress => {
		const publicKey = new PublicKey(walletAddress)
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

	const getUserByWalletAddress = async walletAddress => {
		if (!program || !publicKey) return

		try {
			const user = await getUserByWalletAddressWithoutFriends(walletAddress)
			const friendRequests = await Promise.all(
				user.friendRequests.map(pubKey =>
					getUserByWalletAddressWithoutFriends(pubKey)
				)
			)
			const friends = await Promise.all(
				user.friends.map(pubKey => getUserByWalletAddressWithoutFriends(pubKey))
			)
			return {
				name: user.name,
				avatar: user.avatar,
				friends: friends.map(user => ({
					name: user.name,
					avatar: user.avatar,
					authority: user.authority.toString(),
				})),
				friendRequests: friendRequests.map(user => ({
					name: user.name,
					avatar: user.avatar,
					authority: user.authority.toString(),
				})),
			}
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
			const [senderPda] = findProgramAddressSync(
				[utf8.encode('user'), publicKey.toBuffer()],
				program.programId
			)
			const [receiverPda] = findProgramAddressSync(
				[utf8.encode('user'), receiverPublicKey.toBuffer()],
				program.programId
			)
			await program.methods
				.sendFriendRequest()
				.accounts({
					sender: senderPda,
					receiver: receiverPda,
					authority: publicKey,
				})
				.rpc()
		} catch (err) {
			console.log(err)
		}
	}

	const getFriendStatus = async walletAddress => {
		const profileData = await getMyProfile()
		const requestedFriend = profileData.friendRequests.find(
			user => user.authority === walletAddress
		)
		if (requestedFriend) {
			return 'requested'
		}

		const friend = profileData.friends.find(
			user => user.authority === walletAddress
		)
		if (friend) {
			return 'friend'
		}

		return 'not_friend'
	}

	const acceptRequest = async walletAddress => {
		if (!program || !publicKey) return
		const friendPublicKey = new PublicKey(walletAddress)
		try {
			const [userPda] = findProgramAddressSync(
				[utf8.encode('user'), publicKey.toBuffer()],
				program.programId
			)
			const [friendPda] = findProgramAddressSync(
				[utf8.encode('user'), friendPublicKey.toBuffer()],
				program.programId
			)

			await program.methods
				.respondToFriendRequest(true)
				.accounts({
					userAccount: userPda,
					friendAccount: friendPda,
					authority: publicKey,
					friend: friendPublicKey,
					systemProgram: SystemProgram.programId,
				})
				.rpc()
		} catch (err) {
			console.log(err)
		}
	}

	const addComment = async (
		content,
		lastCommentId,
		postAccountAuthority,
		postId
	) => {
		if (!program || !publicKey) return
		postAccountAuthority = new PublicKey(postAccountAuthority)
		try {
			const [commentPda] = findProgramAddressSync(
				[
					utf8.encode('post'),
					publicKey.toBuffer(),
					Uint8Array.from([lastCommentId]),
				],
				program.programId
			)
			const [postPda] = findProgramAddressSync(
				[
					utf8.encode('post'),
					postAccountAuthority.toBuffer(),
					Uint8Array.from([postId]),
				],
				program.programId
			)
			await program.methods
				.addComment(content)
				.accounts({
					commentAccount: commentPda,
					postAccount: postPda,
					authority: publicKey,
					systemProgram: SystemProgram.programId,
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
				getUserByWalletAddress,
				getAllUsers,
				sendFriendRequest,
				getFriendStatus,
				acceptRequest,
				addComment,
			}}
		>
			{children}
		</BlogContext.Provider>
	)
}
BlogProvider.propTypes = {
	children: PropTypes.node,
}
