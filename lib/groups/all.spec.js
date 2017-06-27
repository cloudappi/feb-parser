'use strict';


const expect = require('chai').expect;
const names = ['fase-grupo', 'playoff-final', 'division-fase-grupo',
  'fase-grupo-2', 'puestos-division', 'puestos-final', 'fase-final',
  'puestos-grupo', 'descenso-div-grupo', 'clas-fase-div-grupo',
  'playoff-final-space', 'playoff-fase-division', 'fase-grupo-3',
  'puestos-y', 'pre-playoff'
];

let total = 0;
let prob = 0;

names.forEach((name) => {
  const parser = require('./' + name);
  describe(`Groups ${name} parser`, () => {
    it('should have the required properties correctly filled', () => {
      expect(parser).to.have.a.property('name');
      expect(parser.name).to.equal(name);

      expect(parser).to.have.a.property('matcher');
      expect(parser.matcher).to.be.instanceOf(RegExp);

      expect(parser).to.have.a.property('handler');
      expect(parser.handler).to.be.a('function');
    });

    it('should match the expected strings', () => {
      const { name, matcher, handler } = parser;

      const realValues = require('./data');
      realValues.forEach((value) => {
        const { title, matchedBy, result } = value;

        const shouldBeMatched = matchedBy === name;
        const match = matcher.test(title);

        if (match !== shouldBeMatched) console.log(title);
        expect(match).to.equal(shouldBeMatched);

        if (match) {
          total += value.times;
          prob += value.probability;

          const parsed = handler(title);

          if (result) expect(parsed).to.eql(result);

        }
      });
    });
  });
});

after(() => {
  console.log(`Provided parsers matches ${total} (${(prob*100).toFixed(2)}%) strings`);
});
