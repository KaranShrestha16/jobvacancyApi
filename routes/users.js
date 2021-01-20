const Express = require('express');
const routes=Express.Router();
const bodyParser= require('body-parser');
const cors= require('cors');
const userController= require('../controller/users');
const {userValidation}= require("../validation/user.validation");

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({extended:false}));
routes.use(cors.apply());

routes.post('/signup',userValidation,userController.signup);
routes.post('/login',userController.login);
routes.get('/get_all',userController.get_all);
routes.get('/get_profile/:id',userController.get_profile);
routes.put('/update_user/:id',userController.update_user);


// routes.get('/api/v1/users/:userId', userController.getById);
// routes.post('/api/v1/users/login',userController.login);
// routes.post('/api/v1/jobApply', userController.jobApply);
// routes.post('/api/v1/users/signup',userController.signUp);
// routes.delete('/api/v1/users/:userId', userController.deleteUserById );
// routes.put('/api/v1/users/:userId',userController.update);
// routes.put('/api/v1/users/updateImage/:userId', userController.updateImage);
// routes.put('/api/v1/users/updateResume/:userId', userController.updateResume);

module.exports = routes;
