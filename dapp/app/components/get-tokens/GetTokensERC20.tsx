'use client'
import { useWallet } from "@/app/context/ConnectionProvider"
import { useState } from "react"
import { addrGHToken } from "@/contracts/adresses"
import ToastMessage from "../ui/ToastMessage"
import Button from "../ui/Button"


const GetTokensERC20 = () => {
    const { account, mainSigner } = useWallet()
    const amount = BigInt(25000 * 10 ** 18);
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" | "warning" } | null>(null)

    const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 4000)
    }




    if (!account) {
        return <div className="alert">🔒 Connect your wallet to continue</div>;
    }

    const mintTokens = async () => {
        setLoading(true)
        const res = await fetch("/api/tokens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: account, amount: amount.toString() }),
        });
        const data = await res.json();
        console.log("Mint result:", data);
        if (res.ok) {
            await addTokenToMetaMask();
        } try {
            const res = await fetch("/api/tokens", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ to: account, amount: amount.toString() }),
            })

            const data = await res.json()
            console.log("Mint result:", data)

            if (!res.ok) {
                throw new Error(data?.error || "Minting failed")
            }

            await addTokenToMetaMask()
            showToast("✅ 25k GHC tokens minted and added to MetaMask", "success")

        } catch (err: any) {
            console.error("❌ Mint error:", err)
            
        } finally {
            setLoading(false)
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
            <Button
                onClick={mintTokens}
                text={'Get 25k GHC Tokens'}
                account={account}
                loading={loading}
                mainSigner={mainSigner}
            />
            {toast && <ToastMessage message={toast.message} type={toast.type} />}
        </>

    );
}

export default GetTokensERC20