'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const webScaperController = require('./scraper');

app.use(cors);

app.get('/', webScaperController.pullCellPlanData);

app.listen(4000, () => console.log('Listening on port 4000'));

module.exports = app;
