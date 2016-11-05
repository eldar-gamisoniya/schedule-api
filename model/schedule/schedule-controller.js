const Controller = require('../../lib/controller');
const scheduleFacade  = require('./schedule-facade');

class ScheduleController extends Controller {}

module.exports = new ScheduleController(scheduleFacade);
