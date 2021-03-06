import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const experienceSchema = new Schema(
	{
		role: { type: String, required: true },
		company: { type: String, required: true },
		description: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date },
		area: { type: String, required: true },
		username: { type: String, required: true },
		image: { type: String },
	},
	{
		timestamps: true,
	},
);
export default model('experience', experienceSchema);
