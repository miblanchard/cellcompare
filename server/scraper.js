'use strict';

const cheerio = require('cheerio');
const request = require('request');
const async = require("async");
const Promise = require('promise');

const webScrapeController = {
  data: [],
  // route to request the AT&T plan data
  getATTData: (req, res, next) => {
    let attUrl = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=500&data=200&supplier=ATT&network=2';
    webScrapeController.getCarrierData(req, res, attUrl, next, 'att').then((data) => {
      next();
    });
  },
  // route to request the Verizon plan data
  getVZWData: (req, res, next) => {
    let vzwUrl = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=500&data=200&supplier=Verizon-Wireless&network=8';
    webScrapeController.getCarrierData(req, res, vzwUrl, next, 'vzw').then((data) => {
      next();
    });
  },
  // route to request the T-mobile plan data
  getTMOBILEData: (req, res, next) => {
    let tmoURL = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=-1&data=200&supplier=T-Mobile&network=6';
    webScrapeController.getCarrierData(req, res, tmoURL, next, 'tmo').then((data) => {
      next();
    });
  },
  // route to request the Sprint plan data
  getSprintData: (req, res, next) => {
    let sprintURL = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=-1&data=200&supplier=Sprint&network=4';
    webScrapeController.getCarrierData(req, res, sprintURL, next, 'sprint').then((data) => {
      next();
    });
  },
  /**
   * Loads the requested url into Cheerio then parses key plan details
   * @param  {Object} req - http request passed through middleware
   * @param  {Object} res - http request passed through middleware
   * @param  {String} url - url for particular carrier rate plans
   * @param  {Function} next - next function to move to next middleware
   * @param  {String} carrierName - AT&T, Verizon, T-Mobile, etc.
   * @return {Promise} webScrapeController.data - Stored each carrier data on a data object
   */
  getCarrierData: (req, res, url, next, carrierName) => {
    return new Promise (function(resolve, reject) {
      request(url, (error, reqResponse, html) => {
        if (error) {
          console.log(error.message);
        }
        let $ = cheerio.load(html);
        $('.results-list')['0'].children
          .filter((elem) => {
            return ($(elem).find('h2').html()) ? true : false;
          })
          .forEach((elem) => {
            webScrapeController.data.push({
              name: $(elem).find('h2').html(),
              dataPlan: $(elem).find('.font-600').eq(2).html(),
              dataSize: function () {
                var size = Number($(elem).find('.font-600').eq(2).html().replace(/[A-Za-z]+/g,''));
                if (size === 300) {
                  return .3;
                } else if (size === 0) return Infinity;
                else return size;
              }(),
              contractPlan: $(elem).find('.mar-y-3 strong').html(),
              price: $(elem).find('li.c-gray.font-5.visible-xs').find('strong').html(),
              priceNum: Number($(elem).find('li.c-gray.font-5.visible-xs').find('strong').html().replace(/[^0-9]+/g,'')),
              carrier: carrierName
            });
          });
          resolve();
      });
    });
  },
};

module.exports = webScrapeController;
