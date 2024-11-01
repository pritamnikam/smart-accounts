require("@nomicfoundation/hardhat-toolbox");
require("dotenv");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  // networks: {
  //   arb: {
  //     url: process.env.RPC_URL,
  //     accounts: [process.env.PRIVATE_KEY]
  //   }
  // },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      },
    },
  },
};
