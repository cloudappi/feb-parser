'use strict';

const name = 'fase-grupo';

const expect = require('chai').expect;

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
    let total = 0;
    let prob = 0;
    realValues.forEach((value) => {
      const { title, matchedBy, result } = value;

      const shouldBeMatched = matchedBy === name;
      const match = matcher.test(title);

      expect(match).to.equal(shouldBeMatched);

      if (match) {
        total += value.times;
        prob += value.probability*100;

        const parsed = handler(title);

        expect(parsed).to.have.property('phase');
        expect(parsed).to.have.property('group');
        if (result) expect(parsed).to.eql(result);

      }
    });
    console.log('Matches:', total, 'Prob:', prob);
  });
});
