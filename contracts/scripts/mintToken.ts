import { ethers } from "ethers";
import dotenv from "dotenv";
import GHTokenJson from "../artifacts/contracts/GHToken.sol/GHToken.json";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.HEDERA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.HEDERA_PRIVATE_KEY!, provider);

  const tokenAddress = "0x6cD64410f5EAde66f547ed95FE1110cD4dDABbfC"; // tu contrato
  const token = new ethers.Contract(tokenAddress, GHTokenJson.abi, wallet);

  const recipient = "0x6b801c046dae517ac0f3e43b66573152288a0ff0"; // EVM address válida
  const amount = ethers.parseUnits("1000", 18); // 1000 GHC con 18 decimales

  console.log(`🚀 Minting ${amount} tokens to ${recipient}...`);

  const tx = await token.mint(recipient, amount);
  console.log("📨 Transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("✅ Mint confirmed in block:", receipt.blockNumber);
}

main().catch((err) => {
  console.error("❌ Mint failed:", err);
  process.exitCode = 1;
});