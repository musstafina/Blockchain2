const blockchainInteractions = require('../../blockchainInteractions/solana-connection');

class FriendshipManager {
	async initiateFriendship(req, res) {
		const { sender, recipient } = req.body;
		try {
			await blockchainInteractions.initiateFriendship(sender, recipient);
			res.status(200).json({
				message: 'Friendship initiation requested successfully!',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Failed to initiate friendship request',
			});
		}
	}

	async confirmFriendship(req, res) {
		const { requestID, recipient } = req.body;
		try {
			await blockchainInteractions.confirmFriendship(
				requestID,
				recipient
			);
			res.status(200).json({
				message: 'Friendship confirmed successfully!',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Failed to confirm friendship' });
		}
	}

	async getFriendshipRequests(req, res) {
		try {
			const requests = await blockchainInteractions.fetchFriendRequests();
			res.status(200).json({ requests });
		} catch (error) {
			console.error('Error fetching friendship requests:', error);
			res.status(500).json({
				message: 'Failed to fetch friendship requests',
			});
		}
	}
}

module.exports = new FriendshipManager();
