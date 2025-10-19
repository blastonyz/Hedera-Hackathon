import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const contractsToCopy = ['GHToken.sol','CarbonRetireNFT.sol', 'CarbonProjectNFT.sol', 'CarbonFactory.sol'];

contractsToCopy.forEach((contractName) => {
  console.log(`🔍 Processing contract: ${contractName}`);
  
  const abiFile = `${contractName.replace('.sol', '')}.json`;

  const source = path.resolve(__dirname, `../artifacts/contracts/${contractName}/${abiFile}`);
  const target = path.resolve(__dirname, `../../dapp/contracts/${contractName}/${abiFile}`);

  if (!fs.existsSync(source)) {
    console.warn(`⚠️ ABI not found for ${contractName}: ${source}`);
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`✅ Copied ${contractName} ABI to frontend`);
});
