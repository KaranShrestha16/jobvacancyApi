const {organization}= require("./organization.schema");

module.exports={
    organizationValidation: async(req,res,next)=>{
        const value= await organization.validate(req.body);

        if(value.error){
            res.json({
                status:false,
                message:value.error.details[0].message
            })
        }else{
            next();
        }
    }
}


