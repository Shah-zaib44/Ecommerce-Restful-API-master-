const ErrorResponse = require('./erroResponse');
const asyncHandler=require('../middleware/async')
const jwt= require('jsonwebtoken');
exports.protect= asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
           }
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route',401))
    }
    try {
        const decoded=jwt.verify(token,process.env.jwt_secret)
        //console.log(decoded)
        next()
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route',401))
    }
})
exports.authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes('admin')){
            return next(new ErrorResponse('User is not authorized to access this route',401))
        }
        next();
    }
}