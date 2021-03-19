// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0.;

import "./Crowdsale.sol";
import "./GGBContract.sol";

contract GoodGameBeTokenSale is Crowdsale {
    GGBContract ggb;
    
    constructor(uint256 rate, address payable wallet, IERC20 token, GGBContract _ggb) Crowdsale(rate, wallet, token) public {
        ggb = _ggb;
    }

    /**
     * @dev Overriding function from parent Crowdsale contract.
     * Checking if address is approved through GGB before purchasing of the tokens.
     */
     function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
         // Calling the original function from parent contract
         super._preValidatePurchase(beneficiary, weiAmount);
         
         // Checking if the buyer's address has been GGB approved
         require(ggb.isKycCompleted(beneficiary), "GGB is not completed. You cannot buy tokens.");
     }
}