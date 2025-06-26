const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: {
        type: [String],
        enum: [
            'Admin',                             // Admin (wszystko widzi)
            'Pracownik (Worker)',                         // Pracownik (Worker) (tylko swoje dane)
            'Może zatwierdzać urlopy swojego działu (Approve Leaves Department)',    // Przełożony urlopów
            'Może widzieć ewidencję czasu pracy swojego działu (View Timesheets Department)',
            'Może widzieć wszystkie wnioski i ewidencje (HR) (View All Leaves And Timesheets)'
        ],
        required: true
    },
    department: { type: String }, // dowolny tekst wpisany przez usera
    position: { type: String, required: false },
    leaveDays: { type: Number, default: 0 },
    vacationDays: { type: Number, default: 0 },
}, { collection: 'users' });

userSchema.pre('save', async function (next) {
    if (this.isModified('password') && this.password && !this.password.startsWith('$2a$12$')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

module.exports = conn => (conn.models.User || conn.model('User', userSchema));
