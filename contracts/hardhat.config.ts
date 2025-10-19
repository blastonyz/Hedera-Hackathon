import type { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
//import { configVariable } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 600,
      },
    viaIR: true
    },
  },
  networks: {
    testnet: {
      type: "http",
      url:process.env.HEDERA_RPC_URL?process.env.HEDERA_RPC_URL:'',// configVariable("HEDERA_RPC_URL"),
      accounts: process.env.HEDERA_PRIVATE_KEY ? [process.env.HEDERA_PRIVATE_KEY] : [], //[configVariable("HEDERA_PRIVATE_KEY")]
    }
  }
};


export default config;

//evm address: 0x00000000000000000000000000000000005d3811