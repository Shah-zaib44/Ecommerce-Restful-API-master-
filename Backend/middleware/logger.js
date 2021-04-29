const logger=(req,res,next)=>{
    req.hello='Hello friends';
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    //console.log('Middleware is running...');
    next();
    }
    module.exports=logger;
