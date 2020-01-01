const chai = require('chai');
chai.use(require('chai-datetime'));
const expect  = require('chai').expect;

const parser = require('../parser');

describe('Testing parser.js', () => {
  describe('Date parsing', () => {
    it('should parse a date of format dd/mm/yyyy', () => {
      colName = 'dia';
      dateStr = '25/12/2019';
      expectedDate = new Date('2019-12-25');
      expect(parser.parseHtmlData(dateStr, colName)).to.equalDate(expectedDate);
    });

    it('should not parse an invalid date', () => {
      colName = 'dia';
      dateStr = 'abc';
      invalidDate = parser.parseHtmlData(dateStr, colName);
      expect(invalidDate).to.be.instanceOf(Date);
      expect(isNaN(invalidDate)).to.be.true;
    });
  });

  describe('Integer parsing', () => {
    it('should parse an integer', () => {
      colName = 'vazao_afluente_m3s';
      valueStr = '42';
      valueInt = 42;
      expect(parser.parseHtmlData(valueStr, colName)).to.equal(valueInt);
    });

    it('should return NaN when an integer is not passed', () => {
      colName = 'vazao_afluente_m3s';
      invalidStr = '()';
      expect(isNaN(parser.parseHtmlData(invalidStr, colName))).to.be.true;
    });
  });

  describe('Float parsing', () => {
    it('should parse a float', () => {
      colName = 'cota_inicial_m';
      valueStr = '42,2';
      valueFloat = 42.2;
      expect(parser.parseHtmlData(valueStr, colName)).to.equal(valueFloat);
    });

    it('should return NaN when a float is not passed', () => {
      colName = 'cota_inicial_m';
      invalidStr = '()';
      expect(isNaN(parser.parseHtmlData(invalidStr, colName))).to.be.true;
    });
  });

  describe('String trimming', () => {
    it('should remove unexpected characters from string', () => {
      colName = 'cota_inicial_m';
      valueStr = '& a42,2 ';
      valueFloat = 42.2;
      expect(parser.parseHtmlData(valueStr, colName)).to.equal(valueFloat);
    })

    it('should return undefined when input is not string', () => {
      colName = 'cota_inicial_m';
      invalidValue = null;
      expect(parser.parseHtmlData(invalidValue, colName)).to.be.undefined;
    });
  });

})
