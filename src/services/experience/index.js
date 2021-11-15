import express from 'express';
import experienceendpoint from './routers.js';

const {
	getAllExperience,
	creatExperience,
	getExperienceById,
	updateExperience,
	deleteExperience,
} = experienceendpoint;

const experienceRouter = express.Router();

experienceRouter.route('/experience/:userID').get(getAllExperience);

experienceRouter
	.route('/:userID')
	.post(creatExperience)
	.put(updateExperience)
	.get(getExperienceById)
	.delete(deleteExperience);

export default experienceRouter;
