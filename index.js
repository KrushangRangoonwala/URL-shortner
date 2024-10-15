const express = require('express');
const { connectDB } = require('./connect');
const urlRouter = require('./router/url');
const userRouter = require('./router/user');
const path = require('path');
const ejs = require('ejs');

const PORT = 8005;
const app = express();
connectDB('mongodb://localhost:27017/userDatabase');
app.use(express.urlencoded({ extended: 'false' }));

app.set('view engine','ejs');
app.set('views',path.resolve('./view'));

app.use('/', urlRouter);
app.use('/user', userRouter);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });


