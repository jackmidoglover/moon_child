const User = require("../models/User");
const expect = require("chai").expect;

describe("User Model Authentication and Validation", function () {
    it("Should throw an error when password does not include: one uppercase, one number, and one symbol", function () {
        expect(function () {
            var badPwordUser = new User({
                username: "testname",
                password: "testing",
                email: "test1@test.com"
            });

            badPwordUser.save(function (err) {
                if (err) throw err;
            }).to.throw(Error);

        });
    });

    it("Should throw an error when the email is not in a text@text.com format", function () {
        expect(function () {
            var badEmailUser = new User({
                username: "testname",
                password: "Test123!",
                email: "test"
            });

            badEmailUser.save(function (err) {
                if (err) throw err;
            }).to.throw(Error);
        });
    });

    it("Should throw an error with message when attempting to save a username already in the database", function () {
        expect(function () {
            var duplicateUser = new User({
                username: "Test",
                password: "Test123!",
                email: "test2@test.com"
            });

            duplicateUser.save(function (err) {
                if (err) throw err;
            }).to.be.a(Error, "There was a duplicate key error");
        });
    });

    it("Should throw an error with message when attempting to save an email already in the database", function () {
        expect(function () {
            var duplicateUser = new User({
                username: "Test3",
                password: "Test123!",
                email: "test2@test.com"
            });

            duplicateUser.save(function (err) {
                if (err) throw err;
            }).to.be.a(Error, "There was a duplicate key error");
        });
    });

    it("Should work just fine when user saves unique username, email, and valid password", function () {
        expect(function () {
            var correctUser = new User({
                username: "Test3",
                password: "Test123!",
                email: "test3@test.com"
            });

            correctUser.save(function (err) {
                if (err) throw err;
            }).to.be.null;
        });
    });

    it("Should correctly compare matching, hashed passwords", function(){
        expect(function(){
            var testUser = new User({
                username: "Test",
                password: "Test123!"
            });

            User.findOne({username: "Test"}, function(err, user){
                if (err) throw err;

                user.comparePassword("Test123!", function(err, isMatch){
                    if (err) throw err;
                    return isMatch;
                })
            }).to.be.true;
        });
    });

    it("Should throw an error when passwords do not match", function(){
        expect(function(){
            var testUser = new User({
                username: "Test",
                password: "Test123!"
            });

            User.findOne({username: "Test"}, function(err, user){
                if (err) throw err;

                user.comparePassword("Test321?", function(err, isMatch){
                    if (err) throw err;
                    return isMatch;
                })
            }).to.throw(Error);
        });
    });
});