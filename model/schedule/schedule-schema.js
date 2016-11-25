const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const subjectSchema = require('./subject-schema');

const scheduleSchema = new Schema({
  created: { type: Date, required: true },
  modified: { type: Date, required: true },
  active: { type: Boolean, required: false },
  university: { type: String, required: true },
  country: { type: String, required: true },
  course: { type: String, required: true },
  group: { type: String, required: true },
  name: { type: String, required: true },
  subjects: [subjectSchema]
});

module.exports = mongoose.model('Schedule', scheduleSchema);
