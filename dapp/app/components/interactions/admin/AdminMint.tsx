'use client'
import { Contract } from "ethers";
import { useWallet } from "@/app/context/ConnectionProvider";
import { useState } from "react";
import CarbonProjectNFT from "@contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json"

type AdminMintProps = {
    nftAddress: string;
    cid: string;
}

const AdminMint = ({ nftAddress, cid }: AdminMintProps) => {
    const { mainSigner, account } = useWallet()
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    const carbonToken = new Contract(nftAddress, CarbonProjectNFT.abi, mainSigner)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    }

    const mint = async () => {
        console.log('minting');
        if (!mainSigner || !account || !carbonToken) {
            return setError("🔒 Connect your wallet to continue");
        }

        try {
            const tx = await carbonToken.adminMint(account, cid, quantity);
            const receipt = await tx.wait();
            console.log("✅ Mint successful:", receipt);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Mint failed");
        }
    }

    return (
        <div className="flex flex-row  justify-between space-y-2">
            <button
                onClick={mint}
                disabled={!account}
                className={`h-10 px-4 rounded font-semibold w-35 transition ${!account
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
            >
                Mint
            </button>
            <input type="number" value={quantity} onChange={handleChange} 
            className="border border-green-600 rounded w-16 text-green-600 text-center py-2 h-10"/>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>);
}

export default AdminMint;