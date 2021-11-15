import express from 'express';
import experienceendpoint from './handler.js';
import experienceModel from './schema.js';
import multer from 'multer';

import q2m from 'query-to-mongo';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_KEY,
	api_secret: CLOUDINARY_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
});
 

const {
	downloadCSV,
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
	.delete(deleteExperience);

experienceRouter.put('/:experienceId/picture',multer({storage:cloudinaryStorage}).single('img'), imgExperience);
experienceRouter.get('/:experienceId/downloadCSV', downloadCSV);

// experienceRouter.put('/:experienceId/picture', multer({storage:cloudinaryStorage}).single('img'), async(req, res, next)=>{
//     try{
//     const profile = await experienceModel.findById(req.params.experienceId)
// 	console.log(profile)
//     profile.image = req.file.path
//     await profile.save()
//     res.status(201).send(profile)
//     }catch (error){
//         next(error)
//     }

  
//   })


export default experienceRouter;
