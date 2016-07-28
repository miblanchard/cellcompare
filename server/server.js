'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const webScraperController = require('./scraper');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/')));

app.get('/data', webScraperController.getTMOBILEData, webScraperController.getVZWData, webScraperController.getATTData, webScraperController.getSprintData, (req, res) => {
  // console.log(webScraperController.data);
  res.send(webScraperController.data);
});

app.get('*', function(req, res) {
    res.sendFile(path.resolve('../cellcompare/client/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(4000, () => console.log('Listening on port 4000'));

module.exports = app;
//__dirname+'
