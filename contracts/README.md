# 🌱 GreenHouse: Modular Carbon Credit Tokenization

GreenHouse is a simulation platform for tokenizing verified carbon offset projects. It combines modular smart contracts with a perceptually polished dapp that allows users to purchase, retire, and certify carbon credits as dynamic NFTs.

---

## 🧱 Smart Contract Architecture

### 🔹 `GHCoin` (ERC-20)
- Fungible token used as internal currency.
- Enables users to purchase carbon credit NFTs.

### 🔹 `CarbonCreditNFT` (ERC-721)
- Represents individual carbon credits.
- Each token is linked to a verified carbon project.
- Can be retired (burned) to offset emissions.
- implements admin & minter roles with AccessControl
- ERC-721 uri storage for gas optimization (lower than enumerable)

![Carbon Project NFT](https://red-voluntary-sole-224.mypinata.cloud/ipfs/bafkreiawez4ufmfkuijtf7rsxxbicx7sbrufdihmpnnydf3h6b7jnctupe)


### 🔹 `RetirementCertificateNFT` (ERC-721)
- Automatically minted when a credit is retired.
- Contains dynamic metadata reflecting total CO₂ retired.
- Serves as an on-chain proof of carbon offset.
- ERC-721 uri storage for gas optimization (lower than enumerable)
- attached metadata for this mvp, could be dinamic
![Carbon Project NFT](https://red-voluntary-sole-224.mypinata.cloud/ipfs/bafkreiehhqfe6zwvgzbgppcz3pk2hntodpgwvfeyylwfuwf7rzceb35ibe)


### 🔹 `CarbonProjectFactory` (EIP-1167)
- Clones instances of `CarbonCreditNFT` per project.
- Enables scalable issuance of credits without duplicating logic.
- Each clone has its own metadata and supply.

---


# Sample Hardhat 3 Beta Project (`mocha` and `ethers`)

This project showcases a Hardhat 3 Beta project using `mocha` for tests and the `ethers` library for Ethereum interactions.

To learn more about the Hardhat 3 Beta, please visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3). To share your feedback, join our [Hardhat 3 Beta](https://hardhat.org/hardhat3-beta-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new) in our GitHub issue tracker.

## Project Overview

This example project includes:

- A simple Hardhat configuration file.
- Foundry-compatible Solidity unit tests.
- TypeScript integration tests using `mocha` and ethers.js
- Examples demonstrating how to connect to different types of networks, including locally simulating OP mainnet.

## Usage

### Running Tests

To run all the tests in the project, execute the following command:

```shell
npx hardhat test
```

You can also selectively run the Solidity or `mocha` tests:

```shell
npx hardhat test solidity
npx hardhat test mocha
```

### Make a deployment to Sepolia

This project includes an example Ignition module to deploy the contract. You can deploy this module to a locally simulated chain or to Sepolia.

To run the deployment to a local chain:

```shell
npx hardhat ignition deploy ignition/modules/Counter.ts
```

To run the deployment to Sepolia, you need an account with funds to send the transaction. The provided Hardhat configuration includes a Configuration Variable called `SEPOLIA_PRIVATE_KEY`, which you can use to set the private key of the account you want to use.

You can set the `SEPOLIA_PRIVATE_KEY` variable using the `hardhat-keystore` plugin or by setting it as an environment variable.

To set the `SEPOLIA_PRIVATE_KEY` config variable using `hardhat-keystore`:

```shell
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

After setting the variable, you can run the deployment with the Sepolia network:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```
