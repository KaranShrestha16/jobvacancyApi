const {job}= require("./job.schema");

module.exports={
    jobValidation: async(req,res,next)=>{
        const value= await job.validate(req.body);

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


