const express = require('express');
const { connectDB } = require('./connect');
const urlRouter = require('./router/url');
const userRouter = require('./router/user');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const { restrictToLoggedInUser } = require('./middleware/auth')

const PORT = 8001;
const app = express();
connectDB('mongodb://localhost:27017/userDatabase');

app.use(cookieParser());
app.use(express.urlencoded({ extended: 'false' }));

app.set('view engine','ejs');
app.set('views',path.resolve('./view'));

//following routes should be in order : 1st) "/user" then 2nd) "/"  : interpreter first interprete fist line, then second : || order should be like : line1> "/a/b" line2> "/a" line3> "/"
app.use('/user', userRouter);
app.use('/',restrictToLoggedInUser, urlRouter);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });


