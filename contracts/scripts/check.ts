import { configVariable } from "hardhat/config";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const rpc = process.env.HEDERA_RPC_URL//configVariable("HEDERA_RPC_URL");
  const pk = process.env.HEDERA_HEX_PK//configVariable("HEDERA_PRIVATE_KEY");

  if (!rpc || !pk) {
    console.error("❌ RPC o Private Key no están disponibles. ¿Keystore desbloqueado?");
  } else {
    console.log("✅ RPC:", rpc);
    console.log("✅ Private Key:", pk);
  }
}

main();
