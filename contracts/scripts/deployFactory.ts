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
    '0x104617BC80EAC570E2a718BcdAB9c32A13c13b53',//retire impl
    '0xd25546Cd8743C13A3181E981Bb0895c0290907Eb',//carbon project impl
    '0x104617BC80EAC570E2a718BcdAB9c32A13c13b53' //erc20 address
  );
  await factory.waitForDeployment();

  const address = await factory.getAddress();
  console.log("✅ Token deployed at:", address);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
