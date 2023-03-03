const UserModel = require("../models/userModel");
module.exports = {
    isUserExist : function(req,res,next){
        UserModel.getWithEmail(req.sqlCon,req.body.email,async function(err,rows){
            if (err) throw err;
            if (typeof (rows) != "undefined" && rows.length > 0){
                return res.status(401).json({
                    errors: [{ "user": "User already exists" }],
                })
            }else{
                next();
            }
        })
    }
}