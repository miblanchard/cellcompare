const express = require('express');
const app = express();
const cors = require('cors');
const webScraperController = require('./scraper');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/')));

app.get('/data', webScraperController.processCarrierData, (req, res) => {
  res.send(webScraperController.data);
});
app.get('*', (req, res) => {
  // load the single view file (angular will handle the page changes on the front-end)
  res.sendFile(path.resolve('../cellcompare/client/index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
