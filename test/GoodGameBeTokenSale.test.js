/**
 * Testing of a smart contract using chai library.
 * In order to test it, start Ganache and update the truffle.config file to reglect the Ganache network parameters.
 * Command: "truffle test".
 */

// For loading initial supply amount from environment file
// (via "dotenv" library)
require("dotenv").config({"path": "../.env"});

// Setting up testing environment
const chai = require("./setupChai");
const BN = web3.utils.BN;
const expect = chai.expect;

// Contracts for testing
const GoodGameBeToken = artifacts.require("./GoodGameBeToken.sol");
const GoodGameBeTokenSale = artifacts.require("./GoodGameBeTokenSale.sol");
const GGBContract = artifacts.require("./GGBContract.sol");

contract("KryptoToken: Initial supply test", async (accounts) => {
    /**
     * We will test the migration of two contracts and the transfer of tokens.
     * Deploying the contracts through migrations file.
     */
    const [ owner, recipient, anotherAccount ] = accounts;

    it("All tokens are transfered to the Crowdsale contract", async () => {
        let instance = await GoodGameBeToken.deployed();
        
        // Owner has transfered all the tokens
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(new BN(0));
        
        // Tokens are now with the Crowdsale contract
        let balanceOfGoodGameBeTokenSale = await instance.balanceOf(GoodGameBeTokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balanceOfGoodGameBeTokenSale).to.be.a.bignumber.equal(totalSupply);
    });
    
    it("Should be possible to buy tokens", async () => {
        let instanceGoodGameBeToken = await GoodGameBeToken.deployed();
        let instanceKYC = await GGBContract.deployed(); 
        let instanceGoodGameBeTokenSale = await GoodGameBeTokenSale.deployed();

        // Approve address through GGB so the user could buy
        instanceKYC.approveAddress(anotherAccount);

        // Sent ether to GoodGameBeTokenSale smart contract and receive tokens in return
        balanceBefore = await instanceGoodGameBeToken.balanceOf(anotherAccount);
        expect(instanceGoodGameBeTokenSale.sendTransaction({from: anotherAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(instanceGoodGameBeToken.balanceOf(anotherAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    });
});