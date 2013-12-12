describe("Yhat", function() {
    describe("user does not exist", function() {
        beforeEach(function() {
            var yhat = new Yhat('sadfasdfasdfasdf', 'blahblahblah');
        });

        it("should throw an exception no user found", function() {
            expect(function() {
                yhat.init('localhost:5000');
            }).toThrow("No user was found with the username given.");
        });
    });

    describe("username and apikey don't match", function() {
        beforeEach(function() {
            var yhat = new Yhat('greg', 'blahblahblah');
        });

        it("should throw an exception apikey is incorrect", function() {
            expect(function() {
                yhat.init('localhost:5000');
            }).toThrow("The API Key passed for the username is incorrect.");
        });
    });

    describe("correct username and apikey BUT NOT allowed domain", function() {
        beforeEach(function() {
            var yhat = new Yhat('greg', 'fCVZiLJhS95cnxOrsp5e2VSkk0GfypZqeRCntTD1nHA');
        });

        it("should throw an exception domain not allowed", function() {
            expect(function() {
                yhat.init('localhost:5000');
            }).toThrow("The domain from which you are requesting access is not authorized by the username you provided.");
        });
    });

    describe("correct username and apikey AND allowed domain", function() {
        beforeEach(function() {
            var yhat = new Yhat('greg', 'fCVZiLJhS95cnxOrsp5e2VSkk0GfypZqeRCntTD1nHA');
        });

        it("should return json array", function() {
            yhat.init('localhost:5000');
            yhat.send({"beer": "Sierra Nevada Pale Ale"});
        });
    });
});
