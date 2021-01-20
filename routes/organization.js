const Express = require('express');
const routes=Express.Router();
const bodyParser= require('body-parser');
const cors= require('cors');
const orgController= require('../controller/organization');
const {organizationValidation}= require("../validation/organization.validation");

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({extended:false}));
routes.use(cors.apply());


routes.post('/signup',organizationValidation,orgController.signup);
routes.post('/login',orgController.login);
routes.get('/get_all',orgController.get_all);
routes.get('/get_new',orgController.get_new);
routes.get('/get_profile/:id',orgController.get_profile);
routes.put('/verify/:id',orgController.verify);
routes.put('/update_org/:id',orgController.updateorg);




module.exports = routes;
