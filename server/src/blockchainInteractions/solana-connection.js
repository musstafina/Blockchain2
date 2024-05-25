const { Connection, PublicKey, SystemProgram } = require('@solana/web3.js');
const anchor = require('@project-serum/anchor');
const fs = require('fs');
const path = require('path');

const DEVNET_URL = 'https://api.devnet.solana.com';
const PROGRAM_KEY = 'DbBS9aWMY4V5bQQtjf376r8aGNXBYxhYk9heqduc6WJf';
const IDL_LOCATION = path.join(__dirname, '../../idl.json');

const idl = JSON.parse(fs.readFileSync(IDL_LOCATION, 'utf-8'));
const solanaConnection = new Connection(DEVNET_URL, 'confirmed');
const userWallet = new anchor.Wallet(anchor.web3.Keypair.generate());

let solanaProgram;

async function setupSolanaProgram() {
	const provider = new anchor.AnchorProvider(solanaConnection, userWallet, {
		preflightCommitment: 'confirmed',
	});
	anchor.setProvider(provider);
	const programID = new PublicKey(PROGRAM_KEY);
	solanaProgram = new anchor.Program(idl, programID, provider);
	return solanaProgram;
}

async function initiateFriendship(sender, recipient) {
	const senderPublicKey = new PublicKey(sender);
	const recipientPublicKey = new PublicKey(recipient);

	await solanaProgram.rpc.sendRequest({
		accounts: {
			request: senderPublicKey,
			sender: senderPublicKey,
			recipient: recipientPublicKey,
			systemProgram: SystemProgram.programId,
		},
		signers: [userWallet.payer],
	});
	console.log('Friendship initiation requested!');
}

async function confirmFriendship(requestID, recipient) {
	const requestPublicKey = new PublicKey(requestID);
	const recipientPublicKey = new PublicKey(recipient);

	await solanaProgram.rpc.acceptRequest({
		accounts: {
			request: requestPublicKey,
			recipient: recipientPublicKey,
		},
		signers: [userWallet.payer],
	});
	console.log('Friendship confirmed!');
}

async function fetchFriendRequests() {
	const requests = await solanaProgram.account.friendRequest.all();
	requests.forEach((request) => {
		console.log('Friendship Request Detail:', request.account);
	});
}

module.exports = {
	setupSolanaProgram,
	initiateFriendship,
	confirmFriendship,
	fetchFriendRequests,
};
