const joi = require("@hapi/joi");
 
const schama={
   job:joi.object({
       job_id:joi.number().allow(''),
       org_id:joi.number().required(),
       title:joi.string().min(4).max(50).required(),
       no_of_vacancy:joi.number().positive().min(1).max(100).required(),
       job_category:joi.string().min(2).max(15).required(),
       no_of_vacancy:joi.number().positive().min(1).max(100).required(),
       job_type: joi.string().valid('Full Time', 'Half Time').required(),
       location:joi.string().min(4).max(50).required(),
       salary: joi.string().min(3).max(50).required(),
       deadline: joi.string().min(4).max(50).required(),
       education_level: joi.string().min(4).max(220).required(),   
       job_description: joi.string().min(4).max(220).required(),
       professional_skill: joi.string().min(4).max(50).required(),     
       experience: joi.string().min(4).max(200).required()
   })
};

module.exports= schama;