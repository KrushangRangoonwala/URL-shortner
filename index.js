const express = require('express');
const { connectDB } = require('./connect');
const router = require('./router/url');
const path = require('path');
const ejs = require('ejs');

const PORT = 8005;
const app = express();
connectDB('mongodb://localhost:27017/userDatabase');
app.use(express.urlencoded({ extended: 'false' }));

app.set('view engine','ejs');
app.set('views',path.resolve('./view'));

app.use('/', router);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });


