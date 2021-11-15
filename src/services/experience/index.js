import express from 'express';
import experienceendpoint from './handler.js';

const {
	getAllExperience,
	creatExperience,
	getExperienceById,
	updateExperience,
	deleteExperience,
} = experienceendpoint;

const experienceRouter = express.Router();

experienceRouter.route('/').get(getAllExperience).get(getExperienceById);

experienceRouter
	.route('/:userPassword')
	.post(creatExperience)
	.put(updateExperience)
	.delete(deleteExperience);

export default experienceRouter;
