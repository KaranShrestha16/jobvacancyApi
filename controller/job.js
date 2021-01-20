const knex = require('knex');
const config = require('../knexfile');
const dbClient = knex(config);
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY = 'secret_key';
const tableName='jobs';


function notAuthenticated(res) {
    res.json({
        status: false,
        message: 'You are not authenticate user',
        code: 404
    });
}

function authenticate(token) { //token -> 123123789127389213
    if (!token) {
        return false;
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return true;
        // use payload if required
    } catch (error) {
        console.log(error)
        return false
    }

}


async function jobpost(req, res){
    if (authenticate(req.headers.authorization) === false) {
          notAuthenticated(res);
          return;
        }

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
    console.log(req.body)
    const data = {
        title: req.body.title,
        job_category : req.body.job_category ,
        no_of_vacancy : req.body.no_of_vacancy ,
        job_type: req.body.job_type,
        location: req.body.location,
        salary: req.body.salary,
        deadline: req.body.deadline,
        postdate: date,
        education_level: req.body.education_level,
        job_description: req.body.job_description,
        education_level: req.body.education_level,
        professional_skill: req.body.professional_skill,
        org_id: req.body.org_id,
        experience: req.body.experience
    }

    try {
        await dbClient.table(tableName).insert(data);
        res.json({
            status: true,
            message: 'Job successfully posted'
        });        
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: 'Error: '+error
        })
    }
}



async function applyjob(req, res){
  if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
      }

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  
  const data = {
      job_id : req.body.job_id ,
      user_id : req.body.user_id ,
      apply_date: date
  }

  console.log(data)

  try {
    const result = await dbClient('job_apply').select()
    .where({'job_id':req.body.job_id })
    .where({'user_id':req.body.user_id });
    console.log(result)

    //

    if(result.length!=0){
    res.json({
              status: false,
              message: 'You already applyed'
                });  
        }else{
        try {
               await dbClient.table('job_apply').insert(data);
                res.json({
                status: true,
                message: 'Job Applyed'
                     });        
            } catch (error) {
            res.json({
                    status: false,
                    message: 'Error: '+error
                })
            } 
        }
  } catch (error) {
    res.json({
        status: false,
        message: 'Error: '+error
    })
  }
}



  async function getbyid(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }

    try {
      const result = await dbClient('jobs as b' ).select()
                      .innerJoin('organizations as o','b.org_id', 'o.org_id')
                      .where({'job_id':req.params.id});
                     
    const data={
          job_id:result[0].job_id,
          title : result[0].title ,
          job_category :result[0].job_category ,
          job_type: result[0].job_type,
          location: result[0].location,
          salary:result[0].salary,
          deadline:result[0].deadline,
          no_of_vacancy:result[0].no_of_vacancy,
          postdate:result[0].postdate,
          education_level:result[0].education_level,
          professional_skill: result[0].professional_skill,
          experience: result[0].experience,
          job_description:result[0].job_description,
          name: result[0].name,
          description: result[0].description
    }
      res.json(data);
    }catch(error){
      res.json({
        status: false,
        message: error
      });
    }
  
  }


async function get_by_user_id(req, res){
  if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
  }
  try{
    const result = await dbClient('job_apply as jb' ).select()
    .innerJoin('jobs as j','jb.job_id', 'j.job_id')
    .innerJoin('organizations as o','j.org_id', 'o.org_id')
    .where({'jb.user_id':req.params.id});
      res.json(result);
  
  }
  catch(err){
      res.json(err)
  }
  
}
async function get_by_org_id(req, res){
  if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
  }
  try{
    const result = await dbClient('jobs as b' ).select()
    .innerJoin('organizations as o','b.org_id', 'o.org_id')
    .where({'b.org_id':req.params.id});
      res.json(result);
  
  }
  catch(err){
      res.json(err)
  }
  
}

async function delete_job (req, res){
  if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
  }
  try{
    const result = await dbClient('jobs').delete() 
    .where({'job_id':req.params.id});

    console.log(result)
    res.json({
      status: true,
      message: 'Job Deleted'
    });
  
  }
  catch(err){
    res.json({
      status: false,
      message: 'Error: '+error
    });
  }
  
}

async function get_all_post_job(req, res){
  if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
  }
  try{
      const result = await dbClient('jobs as b' ).select()
      .innerJoin('organizations as o','b.org_id', 'o.org_id');
      res.json(result);

  
  }
  catch(err){
      res.json(err)
  }
  
}



async function update_job(req, res){
  if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
      }

      console.log(res.body)
 
  const data = {
      title: req.body.title,
      job_category : req.body.job_category ,
      no_of_vacancy : req.body.no_of_vacancy ,
      job_type: req.body.job_type,
      location: req.body.location,
      salary: req.body.salary,
      deadline: req.body.deadline,
      education_level: req.body.education_level,
      job_description: req.body.job_description,
      education_level: req.body.education_level,
      professional_skill: req.body.professional_skill,
      org_id: req.body.org_id,
      experience: req.body.experience
  }

  try {
      await dbClient.table(tableName).where('job_id', req.params.id).update(data);;
      res.json({
          status: true,
          message: 'Job update sucessfully'
      });        
  } catch (error) {
      console.log(error);
      res.json({
          status: false,
          message: 'Error: '+error
      })
  }
}







module.exports = {
    jobpost,
    getbyid,
    get_all_post_job,
    get_by_org_id,
    applyjob,
    delete_job,
    get_by_user_id,
    update_job
}


