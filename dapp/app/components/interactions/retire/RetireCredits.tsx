'use client'
import { Contract } from "ethers"
import { useWallet } from "@/app/context/ConnectionProvider"
import CarbonProjectNFT from '@contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json'
import { useState } from "react"

type Props = {
  tokenAddress: string;
}

const RetireCredits = ({ tokenAddress }: Props) => {
  const { mainSigner, account } = useWallet()
  const [tokenId, setTokenId] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  if (!mainSigner || !account) {
    return <div className="alert">🔒 Connect your wallet to continue</div>;

  }

  const carbonToken = new Contract(tokenAddress, CarbonProjectNFT.abi, mainSigner)
 
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setTokenId(value);
        }
    }

  const getRole = async () => {
    const roleResponse = await fetch("/api/retire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenAddress: tokenAddress }),
    });

    const roleData = await roleResponse.json();
    console.log("Role assignment result:", roleData);

    if (!roleData.success) {
      console.error(roleData.error || "Failed to assign role");
      setError(roleData.error || "Failed to assign role");
      return;

    }

    
    const retireTx = await carbonToken.retire(tokenId, "bafkreiemyprv5xfwlrcwhhngkv72xbtlgoyxbewcyglq6jllkhj5ink3om");
    const retireReceipt = await retireTx.wait();
    console.log("Retire transaction receipt:", retireReceipt);
  }

  return (
    <div className="flex flex-row justify-between space-y-2">
         <button
      onClick={getRole}
      className={`h-10 px-4 rounded font-semibold w-35 transition ${!account
        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
        : 'bg-green-600 text-white hover:bg-green-700'
        }`}

    >
      Retire Credits
    </button>
      <input type="number" value={tokenId} onChange={handleChange} 
      className="border border-green-600 rounded w-16 text-green-600 text-center h-10"/>
    {error && <p className="text-red-500 mt-2">{error}</p>} 
    </div>
 
  )
}

export default RetireCredits;