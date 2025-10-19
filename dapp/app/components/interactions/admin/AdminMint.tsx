'use client'
import { Contract } from "ethers";
import { useWallet } from "@/app/context/ConnectionProvider";
import { useState } from "react";
import CarbonProjectNFT from "@contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json"
import Button from "../../ui/Button";

type AdminMintProps = {
    nftAddress: string;
    cid: string;
}

const AdminMint = ({ nftAddress, cid }: AdminMintProps) => {
    const { mainSigner, account } = useWallet()
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const carbonToken = new Contract(nftAddress, CarbonProjectNFT.abi, mainSigner)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    }

    const mint = async () => {
        setLoading(true)
        if (!mainSigner || !account || !carbonToken) {
            return setError("🔒 Connect your wallet to continue");
        }

        try {
            const tx = await carbonToken.adminMint(account, cid, quantity);
            const receipt = await tx.wait();
            console.log("✅ Mint successful:", receipt);

        } catch (err: unknown) {

            let errorMessage = "Mint failed";

            if (
                typeof err === "object" &&
                err !== null &&
                "message" in err &&
                typeof (err as { message?: unknown }).message === 'string'
            ) {
                errorMessage = (err as { message: string }).message;
            }

            setError(errorMessage);
            setLoading(false);

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-row  justify-between space-y-2">

            <Button
                onClick={mint}
                text={'Mint'}
                account={account}
                loading={loading}
                mainSigner={mainSigner}
            />
            <input type="number" value={quantity} onChange={handleChange}
                className="border border-[#9BE10D] rounded w-16 text-[#9BE10D] text-center py-2 h-10" />
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>);
}

export default AdminMint;