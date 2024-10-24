const user = require('../model/user');
const { setuser } = require('../service/auth');

async function handleSignUp(req,res){
    let body = req.body;
    const user_email = await user.findOne({email : body.email});

    if(user_email){
        return res.render('signup',{
            msg : true
        })
    }

    let newUser = new user(body);
    let savedUser = await newUser.save();
    console.log(savedUser);
    return res.redirect("/user/signin"); 
}

async function handleSignIn(req,res){
    const { email, password } = req.body;
    const user_data = await user.findOne({ email , password });

    if(!user_data){
        return res.render('signin',{
            msg : true
        })
    }

    const token = setuser(user_data);
    res.cookie('uid',token);
    return res.redirect('/');
}

async function SignInView(req,res) {
    console.log("signin view");
    return res.render("signin",{
        msg : false, 
    });
}

async function SignUpView(req,res) {
    return res.render("signup",{
        msg : false, 
    });
    
}

module.exports = {
    handleSignIn,
    handleSignUp,
    SignInView,
    SignUpView,
}