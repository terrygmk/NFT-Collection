// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config({path: "./.env"});
const { METADATA_URL, WHITELIST_CONTRACT_ADDRESS } = require('../constants');

async function verify(contractAddress, args) {
  console.log("Verifying contract on Etherscan...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified on Etherscan");
    } else {
      console.log(e.message);
    }
  }
  console.log('Done!');
}

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  
  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

    const contractIns = await hre.ethers.getContractFactory("CryptoDevs")
    const deployContract = await contractIns.deploy( METADATA_URL, WHITELIST_CONTRACT_ADDRESS );
    await deployContract.deployed();
    console.log("Contract deployed to:", deployContract.address);
    // verify(deployContract.address,[ METADATA_URL, WHITELIST_CONTRACT_ADDRESS])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// verify("0xA3f42497b66cfeaBa13777ad4c4d560fe606888a",[ METADATA_URL, WHITELIST_CONTRACT_ADDRESS])