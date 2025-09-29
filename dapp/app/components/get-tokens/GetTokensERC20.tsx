'use client'
import { useWallet } from "@/app/context/ConnectionProvider"
import { addrGHToken } from "@/contracts/adresses"
import Button from "../ui/Button"
import { on } from "events"

const GetTokensERC20 = () => {
    const { account } = useWallet()
    const amount = BigInt(25000 * 10 ** 18); // 25,000 tokens with 18 decimals

    if (!account) {
        return <div className="alert">🔒 Connect your wallet to continue</div>;
    }

    const mintTokens = async () => {
        const res = await fetch("/api/tokens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: account, amount: amount.toString() }),
        });
        const data = await res.json();
        console.log("Mint result:", data);
        if (res.ok) {
            await addTokenToMetaMask();
        }
    };

    const addTokenToMetaMask = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: addrGHToken,
                        symbol: "GHC",
                        decimals: 18
                    },
                },
            });
        } catch (error) {
            console.error("Error adding token:", error);
        }
    };


    return (
        <>
        {    /*<button
            onClick={mintTokens}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
        >
            Get 25,000 GHT Tokens
        </button>*/}

        <Button
        onClick={mintTokens}  
        text={'Get 25k GHC Tokens'}
        account={account}  
        />
        </>
    
    );
}

export default GetTokensERC20