'use client'
import { useWallet } from "@/app/context/ConnectionProvider"
import { LogOut } from "lucide-react";
import Image from "next/image";


const Navbar = () => {
  const { connectWallet, disconnectWallet, account } = useWallet()

  return (
    <nav className="flex flex-row justify-between px-4 py-2 bg-gray-300/7 backdrop-blur-md z-10 fixed w-full">
      <div className="flex flex-row">
        <Image src="logo.png" alt="greenhouse logo" width={135} height={50} className="ml-10" />
        <a href="https://drive.google.com/file/d/1HqkKTVukGxRcYJt5YJQoGHyDrRAwCQVXt_vx2shYMVE/view"
          target="_blank"
          className="px-4 py-4 text-lime-500 italic"
        >
          Pitch
        </a>
        <a href="" className="px-4 py-4 text-lime-500] italic">
          Certification
        </a>
      </div>


      <div>
        {!account ? (
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-lime-500 text-white rounded mr-10 hover:bg-green-400 transition "
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex flex-row pt-2">
            <button onClick={disconnectWallet}
              className="bg-white/5 backdrop-blur-md text-lime-500 font-medium border border-lime-500 rounded px-2 py-2 mr-10"
            >
              <LogOut size={16} />
            </button>

            <div className="bg-white/5 backdrop-blur-md text-lime-500 font-medium border border-lime-500 rounded px-2 py-2 mr-10">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          </div>
        )}
      </div>

    </nav>
  );

}

export default Navbar