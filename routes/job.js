const Express = require('express');
const routes=Express.Router();
const bodyParser= require('body-parser');
const cors= require('cors');
const jobController= require('../controller/job');
const {jobValidation}= require("../validation/job.validation");

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({extended:false}));
routes.use(cors.apply());

routes.post('/job_post',jobValidation,jobController.jobpost);
routes.get('/get_all',jobController.get_all_post_job);
routes.post('/job_apply',jobController.applyjob);
routes.get('/get_by_id/:id',jobController.getbyid);
routes.get('/get_by_org_id/:id',jobController.get_by_org_id);
routes.get('/get_by_user/:id',jobController.get_by_user_id);
routes.delete('/delete_job/:id',jobController.delete_job);
routes.put('/update_job/:id',jobController.update_job);
module.exports = routes;
