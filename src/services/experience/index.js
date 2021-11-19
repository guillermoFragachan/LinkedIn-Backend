import multer from 'multer';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import experienceendpoint from './handler.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import experienceModel from './sechema.js';

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});


const cloudinaryStorage = new CloudinaryStorage({
	cloudinary:cloudinary
})


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

	experienceRouter.put('/:experienceId/picture', multer({ storage: cloudinaryStorage }).single('profilePic'), async (req, res) => {
		const allExperiences = await experienceModel.findById(req.params.experienceId);
			console.log(req.file)
			allExperiences.image = req.file.path;
			await allExperiences.save();
			res.status(200).send(allExperiences);
	});

export default experienceRouter;
