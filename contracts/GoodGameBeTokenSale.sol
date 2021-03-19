// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0.;

import "./Crowdsale.sol";
import "./GGBContract.sol";

contract GoodGameBeTokenSale is Crowdsale {
    GGBContract kyc;
    
    constructor(uint256 rate, address payable wallet, IERC20 token, GGBContract _kyc) Crowdsale(rate, wallet, token) public {
        kyc = _kyc;
    }

    /**
     * @dev Overriding function from parent Crowdsale contract.
     * Checking if address is approved through GGB before purchasing of the tokens.
     */
     function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
         // Calling the original function from parent contract
         super._preValidatePurchase(beneficiary, weiAmount);
         
         // Checking if the buyer's address has been GGB approved
         require(kyc.isKycCompleted(beneficiary), "GGB is not completed. You cannot buy tokens.");
     }
}