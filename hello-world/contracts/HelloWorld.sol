// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
  string message;

  constructor() {
    message = "Hello!";
  }

  function getMessage() public view returns (string memory) {
    return message;
  }

  function imSpanish() public {
    message = "Hola!"; 
  }
}