const user = require('../model/user');
const { setuser } = require('../service/auth');

async function handleSignUp(req,res){
    let body = req.body;
    let user_email = body.email;

    if(user_email===(user.findOne({email : body.email}))){
        return res.render('signup',{
            msg : true
        })
    }

    let newUser = new user(body);
    let savedUser = await newUser.save();
    console.log(savedUser);
    return res.render('signin');
}

async function handleSignIn(req,res){
    const { email, password } = req.body;
    let user_data = user.findOne({ email , password });

    if(!user_data){
        return res.render('signin',{
            msg : true
        })
    }

    const token = setuser(user_data);
    res.cookie('uid',token);
    return res.redirect('/')
}

async function SignInView(req,res) {
    return res.render('signin');
}

async function SignInView(req,res) {
    return res.render('signup');
    
}

module.exports = {
    handleSignIn,
    handleSignUp,
    SignInView,
    SignUpView,
}