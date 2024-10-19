// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

//NOTE - this is only for quick demo purposes of Blocklingo and would be secured and improved.

contract BlocklingoPuzzle {
    using SafeERC20 for IERC20;

     event ERC20Deposit(
        address sender,
        uint256 amount,
        uint256 depositedAt
    );

    string public constant VERSION = "0.01"; 
    address public manager = 0x20725713402BcE40302A8B1364a3c35A27a7A7e4;
    uint256 public escrowBalance;
    IERC20 rewardToken; 

    mapping(address => bool) isManager; 

    error OnlyManager();
   
    constructor(address _rewardTokenAddress){
            isManager[manager] = true; 
            isManager[msg.sender] = true; 

            rewardToken = IERC20(_rewardTokenAddress); 
    }

    function version() public pure returns (string memory){
        return VERSION; 
    }

    function depositEscrow(uint256 _amount) external returns (uint256){
        if (!isManager[msg.sender]) revert OnlyManager();

        rewardToken.safeTransferFrom(msg.sender, address(this), _amount); 

        escrowBalance += _amount;

         emit ERC20Deposit(
            msg.sender,
            _amount,
            block.timestamp
        );

        return rewardToken.balanceOf(msg.sender);
    }


    function winPuzzle(uint256 _rewardAmount) external returns (uint256){
        rewardToken.transfer(msg.sender, _rewardAmount); 
        escrowBalance -= _rewardAmount; 
        return rewardToken.balanceOf(msg.sender);
    }

}