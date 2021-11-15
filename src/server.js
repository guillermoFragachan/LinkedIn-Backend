import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
import experienceRouter from './services/experience/index.js';

const server = express();

const port = process.env.PORT || 3001;

// ********************************* MIDDLEWARES ***************************************

server.use(cors());
server.use(express.json());

// ********************************* ROUTES ********************************************
server.use('/experience', experienceRouter);

// ********************************* ERROR HANDLERS ************************************

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on('connected', () => {
	console.log('Mongo Connected!');

	server.listen(port, () => {
		console.table(listEndpoints(server));
		console.log(`✅ Server running on port ${port}`);
	});
});

mongoose.connection.on('error', (err) => {
	console.log(err);
});
