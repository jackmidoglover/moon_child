const User = require("../models/User");
const expect = require("chai").expect;

describe("User Model Authentication and Validation", function () {

    // Describing username validation
    context("The user should enter a unique username using only alphanumeric characters", function () {
        it("on duplicate: 'There was a duplicate key error' + key", function () {
            expect(function () {
                var duplicateUser = new User({
                    username: "Test",
                    password: "Test123!",
                    email: "test4@test.com"
                });

                duplicateUser.save(function (err) {
                    if (err) throw err;
                }).to.be.a(Error, "There was a duplicate key error", 'username');
            });
        });

        it("on special characters: throw validator message + key", function(){
            expect(function(){
                var weirdUser = new User({
                    username: "T#STTH!S", 
                    password: "Test123!",
                    email: "testy@test.com"
                });

                weirdUser.save(err => {if (err) throw err}).to.be.a(Error, "Validator failed for path `username` with value `T#STTH!S`", "username")
            })
        })
    });

    context("The user's username should be more than 3 characters long and less than 25", function () {
        it("on minLength failed: 'is shorter than minimum allowed length' + key", function () {
            expect(function () {


                var shortUser = new User({
                    username: "Te",
                    password: "Test123!",
                    email: "test5@test.com"
                });

                shortUser.save(err => { if (err) throw err }).to.be.a(Error, "Path `username` (`Te`) is shorter than the minimum allowed length (3).", "username")
            });
        });

        it("on maxLength failed: 'is longer than maximum allowed length' + key", function(){
            expect(function(){
                var longUser = new User({
                    username: "Testingthatthisistoounreasonablylong",
                    password: "Test123!",
                    email: "test5@test.com"
                });

                longUser.save(err => {if (err) throw err}).to.be.a(Error, "Path `username` (`Testingthatthisistoounreasonablylong`) is longer than the maximum allowed length (25).", "username")
            })
        })
    });

    // Describing password validation behavior
    context("When the password does not include all required characters or is too short", function () {
        it("on lacking uppercase, number, and special character: throw validator failed message + key", function () {
            expect(function () {
                var badPwordUser = new User({
                    username: "testname",
                    password: "testinng",
                    email: "test1@test.com"
                });

                badPwordUser.save(function (err) {
                    if (err) throw err;
                }).to.be.a(Error, "Validator failed for path `password` with value `testinng`", "password");

            });
        });

        it("on minLength failed: 'is shorter than minimum allowed length' + key", function () {
            expect(function () {
                var badPwordUser = new User({
                    username: "testname",
                    password: "Te1!",
                    email: "test1@test.com"
                });

                badPwordUser.save(function (err) {
                    if (err) throw err;
                }).to.be.a(Error, "Path `password` (`Te1!`) is shorter than the minimum allowed length (8).", 'password');

            });
        });
    });

    // Describing email validation
    context("When the email is not not formatted correctly, too short, or already registered:", function () {
        it("on incorrect format: 'Validator failed for path `email` with value `testing`' + key", function () {
            expect(function () {
                var badEmailUser = new User({
                    username: "testname",
                    password: "Test123!",
                    email: "testing"
                });

                badEmailUser.save(function (err) {
                    if (err) throw err;
                }).to.be.a(Error, "'Validator failed for path `email` with value `testing`'", "email");
            });
        });

        it("on failed minLength: 'is shorter than the minimum allowed length' + key", function () {
            expect(function () {
                var shortEmailUser = new User({
                    username: "Test5",
                    password: "Test123!",
                    email: "test"
                });

                shortEmailUser.save(err => { if (err) throw err }).to.be.a(Error, "Path `email` (`test`) is shorter than the minimum allowed length (6).", "email")
            });

        });

        it("on duplicate: 'There was a duplicate key error' + key", function () {
            expect(function () {
                var duplicateUser = new User({
                    username: "Test4",
                    password: "Tnest123!",
                    email: "test@test.com"
                });

                duplicateUser.save(function (err) {
                    if (err) throw err;
                }).to.be.a(Error, "There was a duplicate key error", 'email');
            });
        });
    });

    // Correct user behavior
    context("When the user enters a valid username, password, and email", function(){
        it("Should work just fine", function () {
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
    })

    // Describing comparePassword method
    context("When logging in, it should hash the user's input and compare it to the hash", function () {
        it("When the user enters the correct password, it should return true", function () {
            expect(function () {
                var testUser = new User({
                    username: "Test",
                    password: "Test123!"
                });

                User.findOne({ username: "Test" }, function (err, user) {
                    if (err) throw err;

                    user.comparePassword("Test123!", function (err, isMatch) {
                        if (err) throw err;
                        return isMatch;
                    })
                }).to.be.true;
            });
        });

        it("When the user enters an incorrect password, it should throw an error", function () {
            expect(function () {
                var testUser = new User({
                    username: "Test",
                    password: "Test123!"
                });

                User.findOne({ username: "Test" }, function (err, user) {
                    if (err) throw err;

                    user.comparePassword("Test321?", function (err, isMatch) {
                        if (err) throw err;
                        return isMatch;
                    })
                }).to.throw(Error);
            });
        });
    });
});