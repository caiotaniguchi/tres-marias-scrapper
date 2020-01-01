const moment = require('moment');

const scrapperConfig = require('../config/scrapper.json');


const parseHtmlData = (rawValue, colName) => {
  const isString = s => typeof s === 'string' || s instanceof String;
  const trimString = value => value.replace(/[^0-9,\.\/]/g, '');
  const parsers = {
    'date': value => moment(value, 'DD/MM/YYYY').toDate(),
    'integer': value => parseInt(value),
    'float': value => parseFloat(value.replace(',', '.'))
  };

  if (!isString(rawValue)) {
    return undefined;
  };
  colMetadata = scrapperConfig.columns.find(o => o.name === colName);
  return parsers[colMetadata.type](trimString(rawValue));
}

exports.parseHtmlData = parseHtmlData;
