import createHttpError from 'http-errors';
import experienceModel from './sechema.js';
import q2m from 'query-to-mongo';

const getAllExperience = async (req, res, next) => {
	try {
		const querys = q2m(req.query);
		const total = await experienceModel.countDocuments(querys.criteria);
		const allExperience = await experienceModel
			.find(querys.criteria)
			.limit(querys.options.limit)
			.skip(querys.options.skip)
			.sort(querys.options.sort);
		res.send({
			link: querys.links(
				'',
				total,
			),
			pageTotal: Math.ceil(total / querys.options.limit),
			total,
			allExperience,
		});
	} catch (error) {
		next(error);
	}
};

const creatExperience = async (req, res, next) => {
	try {
		const newexperience = new experienceModel(req.body);
		const { _id } = await newexperience.save();
		res.status(200).send(_id);
	} catch (error) {
		next(error);
	}
};

const getExperienceById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const experience = await experienceModel.findById(id);
		if (experience) {
			res.send(experience);
		}
	} catch (error) {
		next(error);
	}
};

const updateExperience = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatexperience = await experienceModel.findByIdAndUpdate(
			id,
			req.body,
			{ new: true },
		);
		if (updatexperience) {
			res.send(updatexperience);
		} else {
			next(createHttpError(404, `Experience with id ${id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const deleteExperience = async (req, res, next) => {
	try {
		const id = req.params.id;
		const deletexperience = await experienceModel.findByIdAndDelete(id);
		if (deletexperience) {
			res.status(200).send();
		} else {
			next(createHttpError(404, `Post with id ${id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const experienceendpoint = {
	getAllExperience,
	creatExperience,
	getExperienceById,
	updateExperience,
	deleteExperience,
};

export default experienceendpoint;
