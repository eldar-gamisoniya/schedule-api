const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String, required: true },
  professor: { type: String, required: false },
  duration: { type: Number, required: false },
  time: { type: Date, required: true },
  dayOfWeek: { type: Number, min: 1, max: 7, required: true },
  place: { type: String, required: false },
  description: { type: String, required: false }
});

module.exports = subjectSchema;
