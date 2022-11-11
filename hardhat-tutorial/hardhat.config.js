require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-etherscan");
/** @type import('hardhat/config').HardhatUserConfig */

const { QUICKNODE_HTTP_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY],
      
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY
    }
  }
  
};
