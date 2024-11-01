// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@account-abstraction/contracts/interfaces/IPaymaster.sol";

contract Paymaster is IPaymaster {
    
    function validatePaymasterUserOp(
        UserOperation calldata, 
        bytes32, 
        uint256
    )  external pure returns (bytes memory context, uint256 validationData) {
        // Paymaster {server + smart contract}
        // 20 bytes: paymaster smart contract address
        // timePeriod
        // signature
        // userOp.paymasterAndData
        context = new bytes(0);
        validationData = 0;
    }
    
    function postOp(
        PostOpMode, 
        bytes calldata, 
        uint256
    ) external pure {

    }
}

