const API = require('../utils/api');
const expect = require("chai").expect;
const api = new API();

describe("API Search", function(){
    it("Should query the solunar API and return a JSON object with solunar data", function(){
        expect(function(){
            api.querySolunar(39.649441,-104.988907,20181215,-6).to.be.a('object');
        })
        });

    it("Should have a moonrise, moonset, and moonphase property", function(){
        expect(function(){
            api.querySolunar(39.649441,-104.988907,20181215,-6).to.have.a.property('moonRise');
            api.querySolunar(39.649441,-104.988907,20181215,-6).to.have.a.property('moonPhase');
            api.querySolunar(39.649441,-104.988907,20181215,-6).to.have.a.property('moonSet');
        });
    });

    it("Should throw error when not given the required parameters", function(){
        expect(function(){
            api.querySolunar(39.649441,-104.988907).to.throw(Error);
        });
    });

    it("Should throw an error if the required parameters are not a number", function(){
        expect(function(){
            api.querySolunar("Denver", "CO", "today", "MST").to.throw(Error);
        });
    })
});
