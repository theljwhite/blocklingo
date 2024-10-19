// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BlocklingoToken is ERC20 {
    constructor() ERC20("Blocklingo", "LINGO") {
        _mint(msg.sender, 10_000_000_000 * (10 ** uint256(decimals())));
    }
}