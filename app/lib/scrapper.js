const cheerio = require('cheerio');
const rp = require('request-promise');

const parser = require('./parser');
const scrapperConfig = require('../config/scrapper.json');


const scrapTresMarias = (latestDate = new Date('2017-01-02')) => {
  const options = {
    uri: scrapperConfig.url,
    transform: body => cheerio.load(body)
  };

  return rp(options)
    .then(($) => {
      const isValidDate = d => d instanceof Date && !isNaN(d);
      const posToColName = scrapperConfig
                            .columns
                            .sort((a, b) => a.position - b.position)
                            .map(x => x.name);
      const data = [];
      let skip = 0;

      $(scrapperConfig.htmlElementsSelector).each((i, elem) => {
        const colPos = (i - skip) % 7;
        const colName = posToColName[colPos]
        const rawValue = elem.children[0].data ||
                          elem.children[0].children[0].data;
        const processedValue = parser.parseHtmlData(rawValue, colName);

        if (isValidDate(processedValue) && colName == 'dia') {
          if (processedValue <= latestDate) {
            return false;
          }
          data.push({});
          data[Math.trunc((i - skip) / 7)][colName] = processedValue;
        } else if (colName == 'dia') {
          skip += 1;
        } else {
          data[Math.trunc((i - skip) / 7)][colName] = processedValue;
        };
      });
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

exports.scrapTresMarias = scrapTresMarias;
