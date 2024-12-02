require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const connectDB = require('./utils/db');

const identifyRoutes = require('./routes/identify');

const searchRoutes = require('./routes/search');

const app = express();

app.use(bodyParser.json());

connectDB();

app.use('/api', identifyRoutes);

app.use('/api', searchRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server running on port ${PORT}'));

