const { getuser } = require('../service/auth');

async function restrictToLoggedInUser(req,res,next) {
    const cookie = req.cookies?.uid;

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