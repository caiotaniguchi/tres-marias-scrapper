const fs = require('fs');
const path = require('path');

const chai = require('chai');
chai.use(require('chai-datetime'));
const expect  = require('chai').expect;
const nock = require('nock');

const scrapper = require('../scrapper');

const scope = nock('https://www.cemig.com.br')
              .get('/pt-br/a_cemig/nossos_negocios/usinas/Paginas/Tr%C3%AAs_Marias_dados.aspx')
              .times(5)
              .reply(
                200,
                fs.readFileSync(
                  path.join(__dirname, './assets/tres-marias.html'), { encoding: 'utf8' })
                );

describe('Testing scrapper.js', () => {
  describe('Date filter', () => {
    it('should return an empty array when target date is equal to the latest date in the data',
      async () => {
        targetDate = new Date('2019-12-26');
        results = await scrapper.scrapTresMarias(targetDate);
        expect(results).to.be.a('array')
                   .and.to.be.empty
      }
    );

    it('should return an empty array when target date is greater than the latest date in the data',
      async () => {
        targetDate = new Date('2019-12-31');
        results = await scrapper.scrapTresMarias(targetDate);
        expect(results).to.be.a('array')
                   .and.to.be.empty;
      }
    );

    it('should return an array with one element when target date is D-1',
      async () => {
        targetDate = new Date('2019-12-25');
        results = await scrapper.scrapTresMarias(targetDate);
        expect(results).to.be.a('array')
                   .and.to.have.lengthOf(1);
      }
    );

    it('should return every element when no target date is specified',
      async () => {
        results = await scrapper.scrapTresMarias();
        expect(results).to.be.a('array')
                   .and.to.have.lengthOf(1088);
      }
    );
  });

  describe('Data parser', () => {
    it('should return an array of objects with the correct data format',
      async () => {
        expectedResult = {
          dia: new Date('2019-12-26'),
          vazao_afluente_m3s: 470,
          cota_inicial_m: 564.98,
          volume_util_inicial_pct: 56.4,
          vazao_defluente_m3s: 300,
          cota_final_m: 565.0,
          volume_util_final_pct: 56.5
        }

        targetDate = new Date('2019-12-25');
        results = await scrapper.scrapTresMarias(targetDate);
        expect(results[0]).to.be.a('object')
                      .and.to.deep.equal(expectedResult)
      }
    );

  });
});
