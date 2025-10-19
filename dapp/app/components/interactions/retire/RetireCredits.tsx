'use client'
import { Contract } from "ethers"
import { useWallet } from "@/app/context/ConnectionProvider"
import CarbonProjectNFT from '@contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json'
import { useState } from "react"
import Button from "../../ui/Button"

type Props = {
  tokenAddress: string;
}

const RetireCredits = ({ tokenAddress }: Props) => {
  const { mainSigner, account } = useWallet()
  const [tokenId, setTokenId] = useState<number>(1);
  const [loading,setLoading] = useState<boolean>(false);
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

  const retire = async () => {
    setLoading(true)
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
      setLoading(false)
      return;

    }

    
    const retireTx = await carbonToken.retire(tokenId, "bafkreiemyprv5xfwlrcwhhngkv72xbtlgoyxbewcyglq6jllkhj5ink3om");
    const retireReceipt = await retireTx.wait();
    console.log("Retire transaction receipt:", retireReceipt);
    setLoading(false)
  }

  return (
    <div className="flex flex-row justify-between gap-4">
  

    <Button
    onClick={retire}
    text={'Retire Credits'}
    account={account}
    loading={loading}
    mainSigner={mainSigner}
    />
      <input type="number" value={tokenId} onChange={handleChange} 
      className="border border-[#9BE10D] rounded w-16 text-[#9BE10D] text-center py-2 h-auto" />
    {error && <p className="text-red-500 mt-2">{error}</p>} 
    </div>
 
  )
}

export default RetireCredits;