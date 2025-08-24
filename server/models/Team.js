const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 2,
		maxlength: 100
	},
	adminEmail: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	adminPassword: {
		type: String,
		required: true
	},
	adminFirstName: {
		type: String,
		required: true,
		trim: true
	},
	adminLastName: {
		type: String,
		required: true,
		trim: true
	},
	maxUsers: {
		type: Number,
		default: 8
	},
	currentUserCount: {
		type: Number,
		default: 1
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	subscriptionType: {
		type: String,
		default: 'free',
		enum: ['free', 'premium', 'enterprise']
	}
}, {
	collection: 'teams',
	timestamps: true
});

teamSchema.index({ name: 1 });
teamSchema.index({ adminEmail: 1 });
teamSchema.index({ isActive: 1 });

module.exports = conn => (conn.models.Team || conn.model('Team', teamSchema));
