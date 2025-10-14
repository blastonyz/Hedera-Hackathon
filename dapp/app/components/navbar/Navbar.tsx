'use client'
import { useWallet } from "@/app/context/ConnectionProvider"

const Navbar = () => {
    const {connectWallet, account} = useWallet()

     return (
    <nav className="flex flex-row justify-between p-4 bg-black">
      <div className="flex flex-row">
         <img src="logo.png" alt="greenhouse logo" width={135} height={50} className="ml-10"/>
         <a href="https://drive.google.com/file/d/1HqkKTVukGxRcYJt5YJQoGHyDrRAwCQVXt_vx2shYMVE/view"
         target="_blank"
         className="px-4 py-4 text-[#9BE10D] italic"
         >
          Pitch
         </a>
        <a href="" className="px-4 py-4 text-[#9BE10D] italic">
          Certification
        </a>
      </div>
     

      <div>
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
      </div>
     
    </nav>
  );

}

export default Navbar