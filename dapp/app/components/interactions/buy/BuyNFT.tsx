'use client'
import { useWallet } from "@/app/context/ConnectionProvider";
import { Contract } from "ethers";
import CarbonProjectNFT from "@contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json"
import { useState } from "react";
import { buyBatchFunction } from "./BuyFunctions";
import { validateTokenConnection } from "@/utils/validateChain";
import { toUtf8String } from "ethers";
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
    const [loading, setLoading] = useState<boolean>(false)


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
        setLoading(true);
        if (!mainSigner || !account || !paymentToken || !carbonToken) {
            setLoading(false);
            return setError("🔒 Connect your wallet to continue");
        }

        try {
            console.log("🧠 Account value:", account);
            console.log("🧠 Signer address:", await mainSigner.getAddress());

            const isValidChain = await validateTokenConnection(paymentToken, mainSigner, account)
            if (!isValidChain) {
                setLoading(false);
                return setError("⚠️ Change network to Hedera Testnet to continue");
            }
            const receipt = await buyBatchFunction({ carbonToken, paymentToken, account, price, cid, quantity, nftAddress });
            console.log("✅ Buy successful:", receipt);

        } catch (err: any) {

            if (err?.code === 4001) {
                setError("🚫 Transacción cancelada por el usuario");
                return;
            }
            
            if (err?.data && typeof err.data === "string") {
                const reason = toUtf8String(err.data); 
                console.log("Revert reason:", reason);
            }
            setError(err.message || "Buy failed");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-row  justify-between gap-4">


            <Button
                onClick={buy}
                text={'Buy Credits'}
                account={account}
                loading={loading}
                mainSigner={mainSigner}
            />

            <input type="number" value={quantity} onChange={handleChange}
                className="border border-lime-500 rounded w-16 text-lime-500 text-center px-4 py-2 text-sm leading-tight h-auto"

            />
            {error && <p>{error}</p>}

        </div>
    );

}

export default BuyNFT