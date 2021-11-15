import express from 'express';
import experienceendpoint from './handler.js';

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

experienceRouter.put('/:experienceId/picture', imgExperience);
experienceRouter.get('/:experienceId/downloadCSV', downloadCSV);

export default experienceRouter;
