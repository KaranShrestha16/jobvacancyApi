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
  organization:joi.object({
       org_id:joi.number().allow(''),
       name:joi.string().min(4).max(50).required(),
       contact:coustom_phone.string().phoneNumber().min(10).max(10),
       address:joi.string().min(4).max(70).required(),
       email: joi.string().email().required(),
       password: PasswordComplexity(complexityOptions).required(),
       image_name: joi.string().min(4).max(20).allow(''),      
       varified: joi.string().valid('y', 'n').required(),   
       description: joi.string().min(4).max(200).required()
   })
};

module.exports= schama;