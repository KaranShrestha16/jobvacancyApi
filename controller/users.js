const knex = require('knex');
const config = require('../knexfile');
const dbClient = knex(config);
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY = 'secret_key';
const tableName='users';


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


async function signup(req, res){
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {
        name: req.body.name,
        address: req.body.address,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
        contact: req.body.contact,
        user_type: req.body.user_type,
        email: req.body.email,
        password: hashedPassword,
        image_name: req.body.image_name,
        education_level: req.body.education_level,
        professional_skill: req.body.professional_skill,
        experience: req.body.experience
    }
    try{
        const result = await dbClient.table(tableName).select().where({ 'email':req.body.email});
        if(result.length!=0){
            res.json({
                status: false,
                message: 'Email already exit'
            })
        }else{

            try {
                await dbClient.table(tableName).insert(data);
                res.json({
                    status: true,
                    message: 'User register success'
                });        
            } catch (error) {
                console.log(error);
                res.json({
                    status: false,
                    message: 'Error:'+error
                })
            
            }


        }

    }catch(error){
        console.log(error);
        res.json({
            status: false,
            message: 'Error:'+error
        })
    }

}
async function login(req,res){
    const email = req.body.email;
    const password = req.body.password;
    try{
    const result = await dbClient.table(tableName).select().where({ 'email':email});
    if(result.length!=0){
        const passwordFromDB = result[0].password;
        const isMatchPassword = bcrypt.compareSync(password, passwordFromDB);
        if (isMatchPassword) {
            res.json({
                status: true,
                accessToken: jwt.sign({ userEmail: req.body.email }, SECRET_KEY),
                message: 'Login Success',
                id:result[0].user_id,
                user_type:result[0].user_type

            })
        } else {

            res.json({
                status: false,
                message: 'Password do not match'
            })
        }
    }else{
        res.json({
            status: false,
            message: 'Email do not match'
        })
    }
      
    }catch(error){
        console.log(error);
        res.json({
            status: false,
            message: 'Error: '+error
        })
    }

}

async function get_all(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {
        const result = await dbClient.table(tableName).select();
      res.json(result);
    }catch(error){
      res.json({
        status: false,
        message: "Error: "+ error
      });
    }
  
  }


  async function get_profile(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
  console.log(req.params.id);
  
    try {
        const result = await dbClient.table(tableName).select().where({ user_id: req.params.id });
    const data={
          user_id:result[0].user_id,
          name: result[0].name,
          address:result[0].address,
          birth_date: result[0].birth_date,
          gender: result[0].gender,
          contact:result[0].contact,
          user_type:result[0].user_type,
          email:result[0].email,
          password:result[0].password,
          image_name: result[0].image_name,
          education_level: result[0].education_level,
          professional_skill:result[0].professional_skill,
          experience: result[0].experience
    }
      res.json(data);
    }catch(error){
      res.json({
        status: false,
        message: error
      });
    }
  
  }



  async function update_user(req, res){
    if (authenticate(req.headers.authorization) === false) {
          notAuthenticated(res);
          return;
        }
    
    const data = {
        name: req.body.name,
        address: req.body.address,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
        contact: req.body.contact,
        education_level: req.body.education_level,
        professional_skill: req.body.professional_skill,
        experience: req.body.experience
    }
  
    try {
        await dbClient.table(tableName).where('user_id', req.params.id).update(data);;
        res.json({
            status: true,
            message: 'User update sucessfully'
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
    signup,
    login,
    get_all,
    get_profile,
    update_user
}


