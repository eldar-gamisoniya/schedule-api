const Model = require('../../lib/facade');
const scheduleSchema  = require('./schedule-schema');

class ScheduleModel extends Model {}

module.exports = new ScheduleModel(scheduleSchema);
