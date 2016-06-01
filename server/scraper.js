'use strict';

const cheerio = require('cheerio');
const request = require('request');

const webScrapeController = {

  data: {},

  combineCellPlanData: (req, res, next) => {
    // console.log(webScrapeController.data);
    // console.log('At combine function');
    // console.log('ATT Data', webScrapeController.data.att);
    // console.log('VZW Data', webScrapeController.data.vzw);
    //var dataOutput = req.body.att.concat(req.body.vzw);
    //console.log(dataOutput);
    // res.writeHead(200, {'Content-Type': 'application/json',});
    // res.send('final output');
    //next();
  },

  getATTData: (req, res, next) => {
    let attUrl = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=500&data=200&supplier=ATT&network=2';
    webScrapeController.getCarrierData(req, res, attUrl, next, 'att');
    //console.log('inside att');
    //console.log('att', webScrapeController.data);
    //next();
  },

  getVZWData: (req, res, next) => {
    let vzwUrl = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=500&data=200&supplier=Verizon-Wireless&network=8';
    webScrapeController.getCarrierData(req, res, vzwUrl, next, 'vzw')
    //next();
  },

  getTMOBILEData: (req, res, next) => {
    let tmoURL = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=-1&data=200&supplier=T-Mobile&network=6';
    webScrapeController.getCarrierData(req, res, tmoURL, next, 'tmo');
    //next();
  },

  getCarrierData: (req, res, url, next, carrierName) => {
    request(url, (error, reqResponse, html) => {
      if (error) {
        console.log(error.message);
      }
      let $ = cheerio.load(html);
      var carrierData = $('.results-list')['0'].children
      .filter((elem) => {
        return ($(elem).find('h2').html()) ? true : false;
      })
      .map((elem) => {
        return {
          name: $(elem).find('h2').html(),
          dataPlan: $(elem).find('.font-600').eq(2).html(),
          dataSize: $(elem).find('.font-600').eq(2).html().replace(/[A-Za-z]+/g,''),
          contractPlan: $(elem).find('.mar-y-3 strong').html(),
          price: $(elem).find('li.c-gray.font-5.visible-xs').find('strong').html(),
          priceNum: $(elem).find('li.c-gray.font-5.visible-xs').find('strong').html().replace(/[^0-9]+/g,''),
          carrier: carrierName
        };
      });
      res.send(carrierData);
      //webScrapeController.data[carrierName] = carrierData;
      //return carrierData;
      //console.log(webScrapeController.data);
      //console.log(req.body[carrierName]);
      //next();
    });
  },

};

module.exports = webScrapeController;
