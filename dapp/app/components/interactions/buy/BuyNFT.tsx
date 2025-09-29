'use client'
import { useWallet } from "@/app/context/ConnectionProvider";
import { Contract } from "ethers";
import CarbonProjectNFT from "@contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json"
import { useState } from "react";
import { buyBatchFunction } from "./BuyFunctions";
import { validateTokenConnection } from "@/utils/validateChain";
import Button from "../../ui/Button";

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
            console.log("🧠 Account value:", account);
            console.log("🧠 Signer address:", await mainSigner.getAddress());

            const isValidChain = await validateTokenConnection(paymentToken, mainSigner, account)
            if (!isValidChain) {
                return setError("⚠️ Change network to Hedera Testnet to continue");

            }
            const receipt = await buyBatchFunction({ carbonToken, paymentToken, account, price, cid, quantity, nftAddress });
            console.log("✅ Buy successful:", receipt);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Buy failed");
        }
    }

    return (
        <div className="flex flex-row  justify-between gap-4">
            {/* <button
                onClick={buy}
                disabled={!account}
                className={`h-10 px-4 rounded font-semibold w-35 transition ${!account
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                    }`}

            >
                BuyNft
            </button>*/}

            <Button
                onClick={buy}
                text={'BuyNft'}
                account={account}
            />

            <input type="number" value={quantity} onChange={handleChange}
                className="border border-[#9BE10D] rounded w-16 text-[#9BE10D] text-center px-4 py-2 text-sm leading-tight h-auto"

            />
            {error && <p>{error}</p>}

        </div>
    );

}

export default BuyNFT