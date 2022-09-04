import mongoose, { Schema } from 'mongoose';
import { toLowerCaseNonAccentVietnamese } from '../../utils/common.util';

const authSchema = new Schema({
	googleId: { type: String },
	userId: { type: String },
	firstName: { type: String },
	lastName: { type: String, required: true },
	fullName: { type: String },
	fullNameNoAccent: { type: String },
	email: { type: String, required: true },
	gender: { type: String },
	avatar: {
		type: String,
		default: 'images/default-avatar.png',
	},
	birthDay: {
		day: { type: Number },
		month: { type: Number },
		year: { type: Number },
	},
	accountType: {
		type: String,
		required: true,
		enum: ['google', 'local'],
	},
});

authSchema.index({ fullName: 'text' });

authSchema.pre('save', function () {
	this.fullName = `${this.firstName ? this.firstName + ' ' : ''}${
		this.lastName
	}`;

	this.fullNameNoAccent = toLowerCaseNonAccentVietnamese(this.fullName);
});

export default mongoose.model('auth', authSchema);
