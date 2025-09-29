'use client'
import { useWallet } from "@/app/context/ConnectionProvider"

const Navbar = () => {
    const {connectWallet, account} = useWallet()

     return (
    <nav className="flex justify-end p-4 bg-black">
      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-[#9BE10D] text-white rounded mr-10 hover:bg-green-700 transition "
        >
          Connect Wallet
        </button>
      ) : (
        <div className="text-[#9BE10D] font-medium border border-[#92E01D] rounded px-2 py-2 mr-10">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      )}
    </nav>
  );

}

export default Navbar