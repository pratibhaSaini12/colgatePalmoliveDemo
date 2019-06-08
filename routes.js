const leadController = require('./leadController');

const validator = require('./TokenValidator');


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.get('/api/leadlist',leadController.leadList);
  app.get('/api/taskList',leadController.taskList);
  app.get('/api/getLeadById',leadController.getLeadById);
  app.get('/api/taskListFromOppIdList',leadController.taskListFromOppIdList);
  app.get('/api/getMyLeads',leadController.getMyLeads);
  app.get('/api/getCountryList',leadController.getCountryList);
  app.post('/api/createlead',leadController.createLead)
  app.get('/api/getFields',leadController.getFields);
  app.get('/api/removeleadlist',leadController.removeLeadList);
  app.get('/api/removeSelectedLead',leadController.removeSelectedLead);
  app.post('/api/editlead',leadController.editLead);  app.post('/api/convertLead',leadController.convertLead);
  app.post('/api/restorelead',leadController.restoreLead);



  // // Dashboard
  // app.post('/api/report_for_dashboard',dashboardController.reportList);
  // app.post('/api/update_report',dashboardController.updateReport);
  // app.post('/api/update_field',dashboardController.updateField);
  // app.post('/api/update_filter',dashboardController.updateFilter);
  // app.post('/api/update_fromdate',dashboardController.updateFromDate);
  // app.post('/api/update_todate',dashboardController.updateToDate);
  // app.post('/api/dashboard_history',dashboardController.getDashboardHistory);




};
