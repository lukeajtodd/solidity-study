// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
  string public message;

  constructor() {
    this.message = "Hello!";
  }

  function imSpanish() public {
    this.message = "Hola!"
  }
}