const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 2,
		maxlength: 100
	},
	teamId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team',
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	}
}, {
	collection: 'departments',
	timestamps: true
});

departmentSchema.index({ name: 1, teamId: 1 }, { unique: true });
departmentSchema.index({ teamId: 1 });

module.exports = conn => (conn.models.Department || conn.model('Department', departmentSchema));
