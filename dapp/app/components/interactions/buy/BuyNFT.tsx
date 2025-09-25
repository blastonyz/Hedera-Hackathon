'use client'
import { useWallet } from "@/app/context/ConnectionProvider";
import { Contract } from "ethers";
import CarbonProjectNFT from "@contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json"
import { useState } from "react";
import { buyBatchFunction } from "./BuyFunctions";

type Props = {
    nftAddress: string;
    price: string;
    cid: string;
}

const BuyNFT = ({ nftAddress, price, cid }: Props) => {
    const { mainSigner, account, contracts } = useWallet()
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);


    const paymentToken = contracts.GHToken
    const carbonToken = new Contract(nftAddress, CarbonProjectNFT.abi, mainSigner)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    }

    const buy = async () => {
        console.log('buying');
        console.log("Raw price string:", price);
        if (!mainSigner || !account || !paymentToken || !carbonToken) {
            return setError("🔒 Connect your wallet to continue");
        }

        try {
            const receipt = await buyBatchFunction({ carbonToken, paymentToken, account, price, cid, quantity, nftAddress });
            console.log("✅ Buy successful:", receipt);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Buy failed");
        }
    }

    return (
        <div className="flex flex-row  justify-between space-y-2">
            <button
                onClick={buy}
                disabled={!account}
                className={`h-10 px-4 rounded font-semibold w-35 transition ${!account
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                    }`}

            >
                BuyNft
            </button>
            <input type="number" value={quantity} onChange={handleChange}
            className="border border-green-600 rounded w-16 text-green-600 text-center py-2 h-10" />
            {error && <p>{error}</p>}

        </div>
    );

}

export default BuyNFT