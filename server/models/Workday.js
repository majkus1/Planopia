const mongoose = require('mongoose');

const workdaySchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hoursWorked: {
      type: Number, // Liczba godzin pracy
    },
    additionalWorked: {
      type: Number, // Liczba godzin pracy
    },
    realTimeDayWorked: {
      type: String,
    },
    absenceType: {
      type: String, // Rodzaj nieobecności
    }
  });
  
  module.exports = mongoose.model('Workday', workdaySchema);
