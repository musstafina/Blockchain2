const app = require('./src/config/index');
const router = require('./src/api/router');
const connectDB = require('./src/config/db');
const {
	setupSolanaProgram,
} = require('./src/blockchainInteractions/solana-connection');

connectDB();
setupSolanaProgram();
app.use('/', router);

const port = process.env.PORT || 7700;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
