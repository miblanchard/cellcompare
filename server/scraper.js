'use strict';

const cheerio = require('cheerio');
const request = require('request');

const webScapeController = {
  combineCellPlanData: (req, res, next) => {
    // call att & verizon get requests
    // I will have added ATT & VZW to req body
    // req.body.attData add to req.body.vzwData
    // can add additional calls later
    res.writeHead(200, {'Content-Type': 'application/json',});
    res.send(dataOutput);
  },

  getCarrierData: (req, res, next, url) => {
    request(url, (error, reqResponse, html) => {
      if (error) {
        console.log(error.message);
      }
      let $ = cheerio.load(html);
      var carrierData = $('.results-list')['0'].children.filter((elem) => {
        return ($(elem).find('h2').html()) ? true : false;
      })
      .map(function(elem){
        return {
          name: $(elem).find('h2').html(),
          dataPlan: $(elem).find('.font-600').eq(2).html(),
          contractPlan: $(elem).find('.mar-y-3 strong').html(),
          price: $(elem).find('li.c-gray.font-5.visible-xs').find('strong').html()
        };
      });
      //console.log();
      // req.body.attData = attData;
      //next();
      //res.writeHead(200, {'Content-Type': 'application/json'});
      res.send(carrierData);
    });
  },

  getATTData: (req, res, next) => {
    let attUrl = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=500&data=200&supplier=ATT&network=2';
    webScapeController.getCarrierData(req, res, next, attUrl);
  },

  getVZWData: (req, res, next) => {
    let vzwUrl = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=500&data=200&supplier=Verizon-Wireless&network=8';
    request(zvwUrl, (error, reqResponse, html) => {
      if (error) {
        console.log(error.message);
      }
      let $ = cheerio.load(html);

      req.body.vzwData = output;
      //next();
    });
  },
};

module.exports = webScapeController;
