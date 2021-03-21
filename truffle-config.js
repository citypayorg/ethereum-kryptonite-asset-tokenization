const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic="";
const accountIndex = 0;


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: "*",
      host: "127.0.0.1",
      port: 8545,
      // network_id: "15",
      // host: "192.168.126.131",
      // port: 7545,
      // from: "0x74ed3feb26e2331ed5d51fcc29911591ff57b30e", //
      // gas: 2000000
    },
    ganache_local: {
      provider: function(){
        // return new HDWalletProvider(process.env.MNEMONIC, "http://192.168.126.131:7545", accountIndex);
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:8545", accountIndex);
      },
      network_id: "15",
    }
  },
  compilers: {
    solc:{
      version: "0.6.6"
    }
  }
};
