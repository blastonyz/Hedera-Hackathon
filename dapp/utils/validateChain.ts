import { Contract, JsonRpcSigner } from "ethers";

export async function validateTokenConnection(
  contract: Contract,
  signer: JsonRpcSigner,
  account: string,
  expectedChainId: bigint = BigInt(296)
): Promise<boolean> {
  try {
    console.log("🔍 Contract target address:", contract.target);

    const provider = signer.provider;
    const network = await provider.getNetwork();

    if (network.chainId !== expectedChainId) {
      console.error(`❌ Wrong network: expected Hedera Testnet (${expectedChainId}), got ${network.name} (${network.chainId})`);
      return false;
    }

    if (!contract) {
      console.error("❌ Contract not initialized or missing address");
      return false;
    }

    if (!account || typeof account !== "string" || !account.startsWith("0x") || account.length !== 42) {
      console.error("❌ Invalid account address:", account);
      return false;
    }

    if (!contract.interface.getFunction("balanceOf")) {
  console.error("Contract does not expose balanceOf");
}

    const balance = await contract.balanceOf(account);
    console.log(`🧮 Token balance for ${account}:`, balance.toString());
    
    return true;
  } catch (err) {
    console.error("❌ Token connection validation failed:", err);
    return false;
  }
}
