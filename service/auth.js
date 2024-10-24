const jwt = require("jsonwebtoken");

const key = "$eCreTE";

function setuser(user){
    const token = jwt.sign({
        email : user.email,
        _id : user._id
    },key);
    return token;

}
function getuser(token){
    const payload = jwt.verify(token,key);
    return payload;
}

module.exports = {
    setuser,
    getuser
}