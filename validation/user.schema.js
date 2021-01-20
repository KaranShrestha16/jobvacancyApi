const joi = require("@hapi/joi");
const PasswordComplexity = require('joi-password-complexity');
const coustom_phone = joi.extend(require('joi-phone-number'));
const complexityOptions = {
    min: 8,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 5,
  }
  
const schama={
   user:joi.object({
      user_id:joi.number().allow(''),
       name:joi.string().min(4).max(50).required(),
       birth_date:joi.string().min(4).max(10).required(),
       contact:coustom_phone.string().phoneNumber().min(10).max(10),
       gender: joi.string().valid('Male', 'Female', 'Other').required(),
       address:joi.string().min(4).max(70).required(),
       email: joi.string().email().required(),
       password: PasswordComplexity(complexityOptions).required(),
       user_type: joi.string().valid('Admin', 'User').required(),
       image_name: joi.string().min(4).max(20).allow(''),   
       education_level: joi.string().min(4).max(20).allow(''),
       professional_skill: joi.string().min(4).max(50).allow(''),     
       experience: joi.string().min(4).max(200).allow('')
   })
};

module.exports= schama;