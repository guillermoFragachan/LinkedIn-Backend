import multer from 'multer';
import q2m from 'query-to-mongo';
import createHttpError from 'http-errors';
import experienceModel from './sechema.js';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import json2csv from 'json2csv';
import { pipeline } from 'stream';

const cloudinaryStorage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'Experience',
	},
});
const parcing = multer({ storage: cloudinaryStorage }).single('profilePic');

const getAllExperience = async (req, res, next) => {
	try {
		const querys = q2m(req.query);
		const total = await experienceModel.countDocuments(querys.criteria);
		const allExperience = await experienceModel
			.find({
				"username" : req.params.username
			})
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
		const username = req.params.username
		const newexperience = new experienceModel({...req.body, "username":username});
		const { _id } = await newexperience.save();
		res.status(200).send(_id);
	} catch (error) {
		next(error);
	}
};

const imgExperience =
	(parcing,
	async (req, res, next) => {
		try {
			const allExperiences = await experienceModel.findById(req.params.experienceId);
			console.log(req.file)
			allExperiences.image = req.file.path;
			await allExperiences.save();
			res.status(200).send(allExperiences);
			


			/*
			
			const profile = await ProfileModel.findById(req.params.id)
    profile.image = req.file.path
    await profile.save()
    res.status(201).send(profile)
			
			*/

			res.send('ok');
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

const downloadCSV = async (req, res, next)=> {
	try {
		
	const id = req.params.experienceId;
	const destination = res;
	const data = await experienceModel.find({"username": req.params.username});
	const json = JSON.stringify(data);
	res.setHeader("Content-Disposition", "attachment; filename=exp.csv")
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
		console.error('req send');
		next(error);
	}
};

const downloadPDF =
	('/downloadPDF',
	(req, res, next) => {
		try {
		} catch (error) {
			console.error('req send');
			next(error);
		}
	});

const experienceendpoint = {
	downloadPDF,
	downloadCSV,
	imgExperience,
	creatExperience,
	updateExperience,
	deleteExperience,
	getAllExperience,
	getExperienceById,
};

export default experienceendpoint;
