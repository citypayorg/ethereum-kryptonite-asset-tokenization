// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0.;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoodGameBeToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("GoodGameBe Token", "GGB") {
        _mint(msg.sender, initialSupply);
    }
}