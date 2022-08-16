require('dotenv').config();
var express = require('express');
var app = express();
const ejs = require("ejs");
const path = require("path");
const router = require('./routes');


var port = 80;
var host = '127.0.0.1'


app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// network routs
app.use(router)


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