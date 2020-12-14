// ReactJS components
import React, { Component } from "react";

// Ethereum contracts
import KryptoniteToken from "./contracts/KryptoniteToken.json";
import KryptoniteTokenSale from "./contracts/KryptoniteTokenSale.json";
import KYCContract from "./contracts/KYCContract.json";
import getWeb3 from "./getWeb3";

// Local ReactJs components
import HomepageScreen from "./screens/HomepageScreen";
import ContractContex from "./context/ContractContex";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3Loaded: false,
      contractContext: null
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      //Getting the ethereum network id (Mainnet, Testnet, Ropsten, ...)
      this.networkId = await this.web3.eth.net.getId();

      this.kryptoniteToken = new this.web3.eth.Contract(
        KryptoniteToken.abi,
        KryptoniteToken.networks[this.networkId] && KryptoniteToken.networks[this.networkId].address
      );

      this.kryptoniteTokenSale = new this.web3.eth.Contract(
        KryptoniteTokenSale.abi,
        KryptoniteToken.networks[this.networkId] && KryptoniteToken.networks[this.networkId].address
      );

      this.kycContract = new this.web3.eth.Contract(
        KYCContract.abi,
        KYCContract.networks[this.networkId] && KYCContract.networks[this.networkId].address
      );

      // Loading is finished.
      // Setting up the contract context so other components could use the contract abi. 
      this.setState({
        web3Loaded: true,
        contractContext: {
          kryptoniteToken: this.kryptoniteToken,
          kryptoniteTokenSale: this.kryptoniteTokenSale,
          kycContract: this.kycContract,
          web3: this.web3,
          accounts: this.accounts
        }
      });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3Loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <ContractContex.Provider value={this.state.contractContext}>
          <HomepageScreen />
        </ContractContex.Provider>
      </div>
    );
  }
}

export default App;
