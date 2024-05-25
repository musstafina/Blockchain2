require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./src/router');
const bodyParser = require('body-parser');
const {
	setupSolanaProgram,
} = require('./src/blockchainInteractions/solana-connection');

const app = express();
const port = process.env.PORT || 7700;

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB connected successfully.'))
	.catch((err) => console.error('MongoDB connection error:', err));

setupSolanaProgram();

app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);
app.use(express.json());
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
