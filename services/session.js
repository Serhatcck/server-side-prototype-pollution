module.exports={
    isLogin :function(req, res, next){
        if(req.session && req.session.login){
            next();
        }else{
           
            return res.status(401).json({
                errors: [{ "auth": "Unauthorized" }],
            })
            
        }
    }
}