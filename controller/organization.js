const knex = require('knex');
const config = require('../knexfile');
const dbClient = knex(config);
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY = 'secret_key';
const tableName='organizations';


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
       
        
        return false
    }

}


async function signup(req, res){
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email,
        password: hashedPassword,
        image_name: req.body.image_name,
        description: req.body.description,
        varified: req.body.varified
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
                    message: 'Signup Sucessful'
                });        
            } catch (error) {
              
                res.json({
                    status: false,
                    message: 'Organization name already exit'
                })
            
            }


        }

    }catch(error){
      
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
                id:result[0].org_id,
                varified:result[0].varified
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
        const result = await dbClient.table(tableName).select()
        .where({ varified: "y"});
      res.json(result);
    }catch(error){
      res.json({
        status: false,
        message: "Error: "+ error
      });
    }
  
  }

  async function get_new(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {
        const result = await dbClient.table(tableName).select()
        .where({ varified: "n"});
      res.json(result);
    }catch(error){
      res.json({
        status: false,
        message: "Error: "+ error
      });
    }
  
  }

  

  async function updateorg(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }

    const data = {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email,
        description: req.body.description
    
    }
    try {
        await dbClient.table(tableName).where('org_id', req.params.id).update(data);;
        res.json({
            status: true,
            message: 'Organization update sucessfully'
        });        
    } catch (error) {
       
        res.json({
            status: false,
            message: 'Error: '+error
        })
    }
  
  }

  async function verify (req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
   
    try {
        const result= await dbClient(tableName).where('org_id', req.params.id).update({varified:"y"});;
                if(result!=0){
                    res.json({
                        status: true,
                        message: 'Update sucessful'
                    })
                }else{
                    res.json({
                        status: false,
                        message: 'Not Scuess'
                    })
                }
        
    } catch (error) {
           
            res.json({
                status: false,
                message: 'Error: '+error
            })
        }
        
  
  }


  


  async function get_profile(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    try {
        const result = await dbClient.table(tableName).select().where({ org_id: req.params.id });
    const data={
          org_id:result[0].org_id,
          name: result[0].name,
          address:result[0].address,
          email: result[0].email,
          contact: result[0].contact,
          image_name:result[0].image_name,
          description:result[0].description,
          varified:result[0].varified
          
    }
  
      res.json(data);
    }catch(error){
      res.json({
        status: false,
        message: error
      });
    }
  
  }





module.exports = {
    signup,
    login,
    get_all,
    get_new,
    verify,
    get_profile,
    updateorg
}


