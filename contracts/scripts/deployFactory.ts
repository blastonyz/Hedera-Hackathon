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
    '0x6b801c046dae517ac0f3e43b66573152288a0ff0',//deployer admin address
    '0xA82320EBA1C8fAab8EbA7680B4cDf07Cb8209b34',//retire impl
    '0x34F2662f8227Eff7225015388b273EE7b6DeA3A7',//carbon project impl
    '0xF7B4A3e64e6bdc698d4f04AaE9D6fa5Bf881F89c' //erc20 address
  );
  await factory.waitForDeployment();

  const address = await factory.getAddress();
  console.log("✅ Factory deployed at:", address);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
