import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy("Hello, world!");
    await helloWorld.deployed();

    expect(await helloWorld.message).to.equal("Hello!");

    const spanishTx = await helloWorld.imSpanish();

    // wait until the transaction is mined
    await spanishTx.wait();

    expect(await helloWorld.message).to.equal("Hola!");
  });
});
