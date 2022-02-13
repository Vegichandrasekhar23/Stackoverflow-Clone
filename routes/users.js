var express = require('express');
var router = express.Router();
const {User} = require('../Schema');
const { hashing, createJWT, hashCompare, authentication } = require('../Library/Auth');


//User Registration
router.post('/register',async(req,res)=>{
    const {name,password,email} = req.body;    
    try{
      let user = await User.findOne({email})
      if(user){
        res.json({
          message:"User Already Exists"
        })
      }
      else{      
        const hash = await hashing(password);
        req.body.password = hash; 
           
        await User.create({
          name,
          email,
          password:hash,
          verify_value:"N"
        })
        .then(async (doc)=>{         
          const token = await createJWT({email:req.body.email}) 
          res.send({
            message:"User Registered Successfully",
            emailVerifyToken:token         
          })
        })
      }
      
    }
    catch(err){
      if(err.code === 11000){
        //duplicate key
        res.json({
          status:"error",
          error:"userName already exists"
        })
      }
      else{
        throw(err);
      }
      
    }
})

//User Login
router.post('/login',async(req,res)=>{ 
  try{  
    const user =  await User.findOne({email:req.body.email})
    
    if(user)
        {
         const compare = await hashCompare(req.body.password,user.password);      
      if(compare === true){
        res.json({
        message:"Login Successfull"
        })
      }
      else{
        res.json({
          status:"error",
          error:"Invalid UserName/Password "
        })    
      }    
    }    
    else{
      res.json({
        status:"error",
        error:"User Doesnot Exist"
      })

    }
  }
  catch(err){
    res.send(err);
  }

 
})

//Reset-Password
router.put('/reset-password',async(req,res)=>{ 
  try{  
    const user =  await User.findOne({email:req.body.email})
    
    if(user)
        {
          const compare = await hashCompare(req.body.oldpassword,user.password);      
      if(compare === true){
       {
         const hash = await hashing(req.body.newPassword);
         await User.updateOne({email:req.body.email},{$set:{password:hash}})
         .then((doc)=>{
           res.json({
             message:"Password Changed Successfully"
           })
         })
       }
      }
      else{
        res.json({
          status:"error",
          error:"Invalid UserName/Password "
        })    
      }    
    }    
}
  catch(err){
    res.send(err);
  }

 
})


//verify-token
router.post('/verify-token/:token',async(req,res)=>{ 
  try{  
    const validity = await authentication(req.params.token)  
    
    if(validity.validity===true)
        {
        const user =  await User.updateOne({email:validity.email},{$set:{verify_value:"Y"}})     
        res.json({
        message:"Email Verified Successfully",
        
        })        
    }    
    else{
      res.json({
        status:"error",
        error:"Token Expired"
      })

    }
  }
  catch(err){
    res.send(err);
  } 
})


//forgot-password
router.post('/forgot-password',async(req,res)=>{ 
  try{  
    const user =  await User.findOne({email:req.body.email})
    
    if(user)
        {
          const hash = await hashing(req.body.password);      
         await User.updateOne({email:req.body.email},{$set:{password:hash}})
         .then((doc)=>{
           res.json({
             message:"Password Changed Successfully"
           })
         })
      }    
      else{
        res.json({
          status:"error",
          error:"Invalid UserName/Password "
        })    
      }    
    }    

  catch(err){
    res.send(err);
  }

 
})

module.exports = router;
