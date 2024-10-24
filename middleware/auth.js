const { getuser } = require('../service/auth');

async function restrictToLoggedInUser(req,res,next) {
    console.log("middleware");
    const cookie = req.cookies?.uid;
    console.log(cookie);

    if(cookie){
        const user_payload = getuser(cookie);
        req.user = user_payload;
        next();
    }else{
        return res.redirect('/user/signin');
    }

}

module.exports = {
    restrictToLoggedInUser
}