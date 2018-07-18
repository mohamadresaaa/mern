const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
global.config = require('./config');

//mongoDb//
mongoose.Promise = global.Promise;
mongoose.connect(
        config.database,
        { useNewUrlParser : true },
        (err) => err ? console.log(err) : console.log('Database Connected.')
    );


//use Static File And View Engine//
app.use('/public',express.static('public'));


//body Parser//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//express Validator//
app.use(expressValidator());


//routes//
const Route = require('./routes');
app.use('/api',Route);

//cell Server//
app.listen(config.port,() => console.log(`server started in port ${config.port}...`));