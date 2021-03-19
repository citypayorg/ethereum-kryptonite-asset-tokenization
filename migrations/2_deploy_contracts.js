// For loading initial supply amount from environment file 
// (via "dotenv" library)
require("dotenv").config({"path": "../.env"});

var GoodGameBeToken = artifacts.require("./GoodGameBeToken.sol");
var GoodGameBeTokenSale = artifacts.require("./GoodGameBeTokenSale.sol"); 
var GGB = artifacts.require("./GGBContract.sol");

module.exports = async function (deployer) {
    let tokenSupply = process.env.INITIAL_TOKEN_SUPPLY;
    let address = await web3.eth.getAccounts();

    // Creating/minting new ERC-20 token with given initial supply
    await deployer.deploy(GoodGameBeToken, tokenSupply);

    // Creating GGB contract
    await deployer.deploy(GGB);

    // Creating crowdsale contract
    await deployer.deploy(GoodGameBeTokenSale, 1, address[0], GoodGameBeToken.address, GGB.address);
    
    // Transfering the ownership of tokens to the crowdsale contract
    let instance = await GoodGameBeToken.deployed();
    await instance.transfer(GoodGameBeTokenSale.address, tokenSupply);
};
