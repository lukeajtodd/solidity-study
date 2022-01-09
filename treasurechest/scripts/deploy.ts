// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account: ', deployer.address)

  const contracts = [
    {
      name: 'Greeter',
      value: 'Hello, Hardhat!',
    },
    {
      name: 'Token',
    },
  ]

  contracts.forEach(async (contract) => {
    const Contract = await ethers.getContractFactory(contract.name)
    let res
    if (contract.value) {
      res = await Contract.deploy(contract.value)
    } else {
      res = await Contract.deploy()
    }

    const deployedRes = await res.deployed()

    console.log(`${contract.name} deployed to: `, deployedRes.address)

    // return {
    //   address: deployedRes.address,
    //   name: contract.name
    // }
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
