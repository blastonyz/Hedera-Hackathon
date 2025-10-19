import { ethers } from 'ethers';
import CarbonProjectJson from '../artifacts/contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json';

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.HEDERA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.HEDERA_PRIVATE_KEY!, provider);

  const carbonFactory = new ethers.ContractFactory(
    CarbonProjectJson.abi,
    CarbonProjectJson.bytecode,
    wallet
  );

  const token = await carbonFactory.deploy();
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("✅ CarbonNFT deployed at:", address);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});