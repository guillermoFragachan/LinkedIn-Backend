import multer from 'multer';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import experienceendpoint from './handler.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const {
	downloadCSV,
	downloadPDF,
	imgExperience,
	creatExperience,
	updateExperience,
	getAllExperience,
	deleteExperience,
	getExperienceById,
} = experienceendpoint;

const experienceRouter = express.Router();

experienceRouter.route('/').get(getAllExperience).post(creatExperience);

experienceRouter
	.route('/:experienceId')
	.put(updateExperience)
	.get(getExperienceById)
	.put(imgExperience)
	.get(downloadPDF)
	.get(downloadCSV)
	.delete(deleteExperience);

export default experienceRouter;
