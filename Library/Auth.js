const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');
const JWTD = require('jwt-decode')
const secret = "rtygkuhjgfd54y657iugkjhgfq3r4t5yuygcnbfdrtdhj";
const hashing = async(value)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(value,salt);
        return hash
    }
    catch(error)
    {
        return error
    }
}

const hashCompare = async(password,hashValue)=>{
    try {
        return await bcrypt.compare(password,hashValue)
    } catch (error) {
        return error
    }
}

const createJWT = async({email})=>{
    return await JWT.sign({
        email
    },
    secret,
    {
        expiresIn:'1m'
    }
    )
}

const authentication = async(token)=>{
    const decode = JWTD(token)
    if(Math.round(new Date()/1000)<=decode.exp)
    {
        return {
            email:decode.email,
            validity:true
        }
    }
    else
    {
        return {
            email:decode.email,
            validity:false
        }
    }
}

module.exports={hashing,hashCompare,createJWT,authentication}

