const {verify} = require('jsonwebtoken')

exports.validateToken = (req,res,next)=>{
    let token = req.get('authorization');
    console.log("This is the token from auth",token);
    if(token){
        token = token.slice(7);
        verify(token,'Ashish#123?',(err,data)=>{
            if(err){
                res.json({
                    success:0,
                    message:"Invalid token"
                })
            }else{
                req.body.id = data.result.id;
                console.log("this is userid",data.result.id);
                next();
            }
        });
    }else{
        res.json({
            success:0,
            message:"Access denied! unauthorized user"
        })
    }
}