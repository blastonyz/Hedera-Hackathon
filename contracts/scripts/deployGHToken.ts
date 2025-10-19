import { ethers } from 'ethers';
import GHTokenJson from '../artifacts/contracts/GHToken.sol/GHToken.json';

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.HEDERA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.HEDERA_PRIVATE_KEY!, provider);

  const ghTokenFactory = new ethers.ContractFactory(
    GHTokenJson.abi,
    GHTokenJson.bytecode,
    wallet
  );

  const token = await ghTokenFactory.deploy();
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("✅ Token deployed at:", address);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});