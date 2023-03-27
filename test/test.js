const checkRules = require('../src/turbo.js');
const expect = require('chai').expect;

describe('gpt3.5-test', function() {
    it('should check rules and return false', function() {
        let response = checkRules("biosphere", "Beautiful islands offer scenic paradise escapes.");
        expect(response).to.equal(false);

        response = checkRules("biscuit", "Before I start cooking, I chop up tiny slices.");
        expect(response).to.equal(false);

        response = checkRules("bike", "Before I knew everything, it was just a Kawasaki.");
        expect(response).to.equal(false);
    });


    it('should check rules and return true', function() {
        let response = checkRules("vertex", "Very excited rabbits tease eager xylophones.");
        expect(response).to.equal(true);
        response = checkRules("trim", "This rabbit is magnificent.");
        expect(response).to.equal(true);
        response = checkRules("tricky", "The RACCOON inched closer, knowing you.");
        expect(response).to.equal(true);
        response = checkRules("trident", "the rat in Dave's ear nibbled today.");
        expect(response).to.equal(true);
        response = checkRules("ass", "All silly situations!");
        expect(response).to.equal(true);

    });
});