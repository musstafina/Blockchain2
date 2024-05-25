import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	CONNECTED_STATUS,
	DISCONNECTED_STATUS,
	ERROR_STATUS,
	LOADING_STATUS,
} from '../../shared/constants/wallet-loading-statuses'

const initialState = {
	isAuthenticated: !!localStorage.getItem('token'),
	walletAddress: '',
	walletAddressLoadingStatus: DISCONNECTED_STATUS,
}

export const connectWallet = createAsyncThunk(
	'user/connectWallet',
	async (_, { rejectWithValue }) => {
		try {
			if (!window.solana || !window.solana.isPhantom) {
				return rejectWithValue('No Phantom wallet found')
			}
			const response = await window.solana.connect()
			const walletAddress = response.publicKey.toString()
			return {
				walletAddress,
			}
		} catch (error) {
			return rejectWithValue('Failed to connect to Phantom wallet')
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loggedIn: (state, action) => {
			const { token } = action.payload
			if (!token) return
			state.isAuthenticated = true
			localStorage.setItem('token', token)
		},
		loggedOut: state => {
			state.isAuthenticated = false
			localStorage.removeItem('token')
		},
		disconnectWallet: state => {
			window.solana.disconnect()
			state.walletAddress = ''
			state.walletAddressLoadingStatus = DISCONNECTED_STATUS
		},
	},
	extraReducers: builder => {
		builder.addCase(connectWallet.pending, state => {
			state.walletAddressLoadingStatus = LOADING_STATUS
		})
		builder.addCase(connectWallet.fulfilled, (state, action) => {
			const { walletAddress } = action.payload
			state.walletAddress = walletAddress
			state.walletAddressLoadingStatus = CONNECTED_STATUS
		})
		builder.addCase(connectWallet.rejected, (state, action) => {
			state.walletAddressLoadingStatus = ERROR_STATUS
			console.error('Connection error:', action.payload)
		})
	},
})

export const { loggedIn, loggedOut, disconnectWallet } = userSlice.actions

export const userReducer = userSlice.reducer

export const selectIsAuthenticated = store => store.user.isAuthenticated

export const selectWalletAddress = store => store.user.walletAddress
export const selectWalletAddressLoadingStatus = store =>
	store.user.walletAddressLoadingStatus
