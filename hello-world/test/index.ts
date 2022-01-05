import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloWorld", function () {
  it("Message should change when imSpanish is called", async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();
    await helloWorld.deployed();

    expect(await helloWorld.getMessage()).to.equal("Hello!");

    const spanishTx = await helloWorld.imSpanish();

    // wait until the transaction is mined
    await spanishTx.wait();

    expect(await helloWorld.getMessage()).to.equal("Hola!");
  });
});
