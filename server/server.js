'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const webScaperController = require('./scraper');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//root route is where all the fun will happen
// app.get('/', function(req, res) {
//   console.log('GET to root');
//   res.send('Data response');
// });
app.get('/', webScaperController.getATTData);//, webScaperController.getVZWData, webScaperController.combineCellPlanData, function(req, res) {
  //res.render('./../client/signup', {error: null});
//});

app.listen(4000, () => console.log('Listening on port 4000'));

module.exports = app;
