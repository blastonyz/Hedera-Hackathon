# 🌱 GreenHouse Dapp Frontend

This is the frontend interface for **GreenHouse**, a modular carbon credit tokenization platform. It allows users to interact with smart contracts, explore verified carbon projects, purchase and retire credits, and deploy nft colections with metadata of this projects

---

## 🚀 Features

- 🔗 Connect wallet via MetaMask
- 🧠 Sync off-chain project data from MongoDB
- 📦 Upload project metadata to IPFS via Pinata
- 🎨 GSAP-powered perceptual animations
- 🌌 Shader-based background with Three.js
- 🧾 Dynamic NFT previews and retirement certificates

---

## 🧩 Tech Stack

### 🖥️ Framework

- **Next.js 15.5.4** with Turbopack
- **React 19.1.0**
- **TypeScript 5**
- **TailwindCSS 4**

### 🔌 Web3 & Wallet

- **Ethers.js 6.15.0** for smart contract interaction
- **@metamask/providers** for wallet connection
- **Custom React Context** for wallet state management

### 🧠 Off-chain Data

- **MongoDB** via **Mongoose 8.18.2**
- **mongoose-paginate-v2** for efficient project listing
- Projects are stored and synced off-chain for performance and flexibility

### 📦 IPFS Integration

- **Pinata SDK 2.5.0** used to upload project metadata and images to IPFS
- Metadata is generated dynamically and pinned during deployment

### 🎨 Visual & UX

- **GSAP 3.13.0** for perceptual animations (entrance, scroll, feedback)
- **Three.js 0.180.0** + **React Three Fiber** for shader-based backgrounds
- **@react-three/drei** for camera, lighting, and helpers
- **Lucide-react** for icons

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
