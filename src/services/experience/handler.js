import multer from 'multer';
import json2csv from 'json2csv';
import q2m from 'query-to-mongo';
import { pipeline } from 'stream';
import experienceModel from './schema.js';
import createHttpError from 'http-errors';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const jsoncsv = json2csv;

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_KEY,
	api_secret: CLOUDINARY_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
});

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
			link: querys.links('', total),
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

const imgExperience =
	(multer({ storage: cloudinaryStorage }).single('img'),
	async (req, res, next) => {
		try {
			const experience = await experienceModel.findById(
				req.params.experienceId,
			);
			console.log(req);
			experience.image = req.file.path;
			await image.save();
			res.status(201).send(image);
		} catch (error) {
			next(error);
		}
	});

const getExperienceById = async (req, res, next) => {
	try {
		const id = req.params.experienceId;
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
		const id = req.params.experienceId;
		const updatexperience = await experienceModel.findByIdAndUpdate(
			id,
			{ image: req.file.path },
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
		const id = req.params.experienceId;
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

const downloadCSV = async (req, res, next) => {
	try {
		const id = req.params.experienceId;
		const destination = res;
		const data = await experienceModel.findById(id);
		const json = JSON.stringify(data);
		console.log(json);
		const transform = new json2csv.Transform({
			fields: [
				'role',
				'company',
				'description',
				'startDate',
				'endDate',
				'area',
			],
		});
		pipeline(json, transform, destination, (err) => {
			if (err) next(err);
		});
	} catch (error) {
		next(error);
	}
};

const experienceendpoint = {
	downloadCSV,
	imgExperience,
	creatExperience,
	updateExperience,
	deleteExperience,
	getAllExperience,
	getExperienceById,
};

export default experienceendpoint;
