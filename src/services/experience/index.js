import multer from 'multer';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import experienceendpoint from './handler.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinaryStorage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'Experience',
	},
});
const parcing = multer({ storage: cloudinaryStorage }).single('experiencePic');

const {
	getAllExperience,
	creatExperience,
	getExperienceById,
	updateExperience,
	deleteExperience,
	imgExperience,
} = experienceendpoint;

const experienceRouter = express.Router();

experienceRouter.route('/').get(getAllExperience).post(creatExperience);

experienceRouter
	.route('/:experienceId')
	.put(updateExperience)
	.put(parcing, imgExperience)
	.get(getExperienceById)
	.delete(deleteExperience);

export default experienceRouter;
