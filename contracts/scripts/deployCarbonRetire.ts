import { ethers } from 'ethers';
import RetireJson from '../artifacts/contracts/CarbonRetireNFT.sol/CarbonRetireNFT.json';

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.HEDERA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.HEDERA_PRIVATE_KEY!, provider);

  const carbonRetireFactory = new ethers.ContractFactory(
    RetireJson.abi,
    RetireJson.bytecode,
    wallet
  );

  const token = await carbonRetireFactory.deploy('https://ipfs.io/ipfs/');
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("✅ RetireNFT deployed at:", address);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});