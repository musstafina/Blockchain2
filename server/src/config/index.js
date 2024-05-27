require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);
app.use(express.json());
app.use(bodyParser.json());

module.exports = app;
