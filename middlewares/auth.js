const {getUser} = require('../services/auth');

async function restrictToLoggedinUserOnly(req , res , next){
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}


function checkForAuth(req, res, next){
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if(!tokenCookie) return next();

    const token = tokenCookie;
    const user = getUser(token);
    req.user=user;
    return next();
}

// ADMIN , Normal 
function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user ) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}

module.exports= {
    restrictToLoggedinUserOnly,
    checkForAuth,
    restrictTo
};