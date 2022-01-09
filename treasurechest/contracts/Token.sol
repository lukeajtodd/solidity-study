//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
  Provided by ERC20:

  function name() public view returns (string)
  function symbol() public view returns (string)
  function decimals() public view returns (uint8)
  function totalSupply() public view returns (uint256)
  function balanceOf(address _owner) public view returns (uint256 balance)
  function transfer(address _to, uint256 _value) public returns (bool success)
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
  function approve(address _spender, uint256 _value) public returns (bool success)
  function allowance(address _owner, address _spender) public view returns (uint256 remaining)
 */

contract MSTToken is ERC20 {
  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    // We mint 100,000 tokens with 18 decimals
    // Similar to how 1 ETH is made up of 10 to the 18 wei
    _mint(msg.sender, 100000 * (10 ** 18));
  }
}