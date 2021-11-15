import express from 'express';
import experienceendpoint from './handler.js';

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
	.put(imgExperience)
	.put(updateExperience)
	.get(getExperienceById)
	.delete(deleteExperience);

//experienceRouter.get('/:experienceId/downloadPDF', downloadPDF);
experienceRouter.get('/:experienceId/downloadCSV', downloadCSV);

export default experienceRouter;
