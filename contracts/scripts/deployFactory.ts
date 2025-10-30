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
    '0xa0E089Cfb5e0CA699E77fB8362666692Dbe9c6E6',//retire impl
    '0x8A88049D153b3dA0971B8436b183316171ce288c',//carbon project impl
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
