var Marketplace = artifacts.require("./Marketplace.sol"); // import Marketplce contract
// start contract
contract("Marketplace", function(accounts) {
    // morker testing frame jave script 
    var articleName = "test_Article";
    var articleDescription = "this is a test";
    var articlePrice = web3.toWei(10,"ether");

    // start firt test
    it("articleCounter is zero in the beginning", function() {
        // get an instance of the contract
        return Marketplace.deployed().then(function(instance) {
            // call the getNumberOfArticle function
            return instance.getNumberOfArticles();
        // pass on return value of getNumberOfArticle
        }).then(function(articleNumber) {
            // check condition
            assert.equal(articleNumber, 0, "initial number not equal to zero")
        });
    });

    it("should have one article for sale",function() {
        var MarketplaceInstance;
        return Marketplace.deployed().then(function(instance) {
            MarketplaceInstance = instance;
            return MarketplaceInstance.sellArticle(
                articleName,
                articleDescription,
                articlePrice,
                {'from': accounts[0]}
            )
        }).then(function(receipt) {
            
        }).then(function() {
            return MarketplaceInstance.getNumberOfArticles();
        }).then(function(articleCounter) {
            assert.equal(articleCounter, 1, "articleCounter has not increased")
        }).then(function() {
            return MarketplaceInstance.articles(1);
        }).then(function(article) {
            assert.equal(article[0], 1, "id is not 1");
            assert.equal(article[1], articlePrice, "price is not 10 ether");
            assert.equal(article[2], accounts[0], "seller is not correct");
            assert.equal(article[3], 0x0, "buyer is unknown");
            assert.equal(article[4], articleName, "articleName is not correct");
            assert.equal(article[5], articleDescription, "articleDescription is not correct");
        });
    });
});
