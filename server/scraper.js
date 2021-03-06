/* eslint arrow-body-style: 0, no-unused-vars: 0*/

const cheerio = require('cheerio');
const request = require('request');
const Promise = require('bluebird');

const webScrapeController = {
  // attach returned data to this storage array
  data: [],
  // add all requests to array and process with promise.all
  processCarrierData: (req, res, next) => {
    const promisesArray = [];
    const attURL = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=500&data=200&supplier=ATT&network=2';
    promisesArray.push(webScrapeController.getCarrierData(req, res, attURL, next, 'AT&T'));
    const vzwURL = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=500&data=200&supplier=Verizon-Wireless&network=8';
    promisesArray.push(webScrapeController.getCarrierData(req, res, vzwURL, next, 'Verizon'));
    const tmoURL = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=-1&data=200&supplier=T-Mobile&network=6';
    promisesArray.push(webScrapeController.getCarrierData(req, res, tmoURL, next, 'T-Mobile'));
    const sprintURL = 'https://www.whistleout.com/Ajax/MobilePhones/SearchResults/SingleLineSearch?minutes=-1&sms=-1&data=200&supplier=Sprint&network=4';
    promisesArray.push(webScrapeController.getCarrierData(req, res, sprintURL, next, 'Sprint'));
    Promise.all(promisesArray).then(() => next());
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
    return new Promise((resolve, reject) => {
      request(url, (error, reqResponse, html) => {
        if (error) console.log(error.message);
        const $ = cheerio.load(html);
        $('.results-list')['0'].children
          .filter((elem) => ($(elem).find('h2').html()))
          .forEach((elem) => {
            webScrapeController.data.push({
              name: $(elem)
                .find('h2')
                .html(),
              dataPlan: $(elem)
                .find('.font-600')
                .eq(2)
                .html(),
              dataSize: (() => {
                const size = Number($(elem)
                  .find('.font-600')
                  .eq(2)
                  .html()
                  .replace(/[A-Za-z]+/g, ''));
                if (size === 300) {
                  return 0.3;
                } else if (size === 0) return Infinity;
                return size;
              })(),
              // TODO: Check for no contract and add/change to post-paid
              contractPlan: $(elem)
                .find('.mar-y-3 strong')
                .html(),
              price: $(elem)
                .find('li.c-gray.font-5.visible-xs')
                .find('strong')
                .html(),
              priceNum: Number($(elem)
                .find('li.c-gray.font-5.visible-xs')
                .find('strong')
                .html()
                .replace(/[^0-9]+/g, '')),
              carrier: carrierName,
            });
          });
        resolve();
      });
    });
  },
};

module.exports = webScrapeController;
