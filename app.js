require('dotenv').config();
var express = require('express');
var app = express();
const ejs = require("ejs");
const path = require("path");
const router = require('./routes');
const bodyparser = require('body-parser');
const studentinfo = require('./models/studentinfo')

// sequelize.sync().then(() => {
//    console.log('Book table created successfully!');
// }).catch((error) => {
//    console.error('Unable to create table : ', error);
// });

var port = 80;
var host = '127.0.0.1'


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// network routs
app.use('/api/v1',router)


// Error Handelling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
 })
 
 app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
       error: {
          message: error.message
       }
    });
 })

//  Listening
var server = app.listen(process.env.port, function () {
   console.log("Example app listening at http://%s:%s/",host, process.env.port)
})