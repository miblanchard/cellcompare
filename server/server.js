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

app.get('/', webScaperController.getTMOBILEData);//, webScaperController.getVZWData, , webScaperController.combineCellPlanData, function(req, res) {
  //res.render('./../client/signup', {error: null});
//});

app.listen(4000, () => console.log('Listening on port 4000'));

module.exports = app;
