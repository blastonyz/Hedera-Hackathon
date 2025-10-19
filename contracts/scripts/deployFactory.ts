import { ethers } from 'ethers';
import FactoryJson from '../artifacts/contracts/CarbonFactory.sol/CarbonFactory.json';

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.HEDERA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.HEDERA_PRIVATE_KEY!, provider);

  const factoryContract = new ethers.ContractFactory(
    FactoryJson.abi,
    FactoryJson.bytecode,
    wallet
  );

  const factory = await factoryContract.deploy(
    '0x0571235134DC15a00f02916987C2c16b5fC52E2A',//deployer admin address
    '0x5566a79BCB8DbAD31f0628bA805148Aaaba3685c',//retire impl
    '0xE61FDd8e61C97f5D2C30aF639Ce3224275de8D6B',//carbon project impl
    '0xE9E032046299389922c4bf2Fa4562D09f37c83bF' //erc20 address
  );
  await factory.waitForDeployment();

  const address = await factory.getAddress();
  console.log("✅ Factory deployed at:", address);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
