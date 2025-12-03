'use client'
import { useWallet } from "@/app/context/ConnectionProvider"
import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


const Navbar = () => {
  const { connectWallet, disconnectWallet, account } = useWallet()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-300/7 backdrop-blur-md z-50 fixed w-full border-b border-lime-500/20 shadow-lg">
      <div className="flex flex-row justify-between items-center px-4 py-3 lg:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center z-50">
          <Image 
            src="/logo.png" 
            alt="greenhouse logo" 
            width={135} 
            height={50} 
            className="w-20 sm:w-28 md:w-32 lg:w-[135px]" 
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-row items-center gap-1 xl:gap-2">
          <a 
            href="https://docs.google.com/presentation/d/1HqkKTVukGxRcYJt5YJQoGHyDrRAwCQVXt_vx2shYMVE/present?slide=id.p1"
            target="_blank"
            className="px-3 xl:px-4 py-2 text-lime-500 italic hover:text-lime-400 hover:bg-lime-500/10 rounded-lg transition-all duration-300 text-sm xl:text-base"
            rel="noopener noreferrer"
          >
            Pitch
          </a>

          <a
            href="https://explore.hashpack.app/nft/0.0.3872504/4062"
            className="px-3 xl:px-4 py-2 text-lime-500 italic hover:text-lime-400 hover:bg-lime-500/10 rounded-lg transition-all duration-300 text-sm xl:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            Certification
          </a>

          <a
            href="https://drive.google.com/file/d/1KJfMpLdzgrAnWMo9sVoD898jwpJHtZDj/view?t=1"
            className="px-3 xl:px-4 py-2 text-lime-500 italic hover:text-lime-400 hover:bg-lime-500/10 rounded-lg transition-all duration-300 text-sm xl:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            Demo
          </a>

          {/* Wallet Connection - Desktop */}
          {!account ? (
            <button
              onClick={connectWallet}
              className="ml-2 xl:ml-4 px-3 xl:px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-green-400 hover:scale-105 transition-all duration-300 font-medium text-sm xl:text-base shadow-lg hover:shadow-lime-500/50"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex flex-row items-center gap-2 ml-2 xl:ml-4">
              <button 
                onClick={disconnectWallet}
                className="bg-white/5 backdrop-blur-md text-lime-500 font-medium border border-lime-500 rounded-lg px-2 py-2 hover:bg-lime-500/10 hover:scale-110 transition-all duration-300"
                aria-label="Disconnect wallet"
              >
                <LogOut size={16} />
              </button>

              <div className="bg-white/5 backdrop-blur-md text-lime-500 font-medium border border-lime-500 rounded-lg px-2 xl:px-3 py-2 text-xs xl:text-sm">
                {account.slice(0, 4)}...{account.slice(-3)}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-lime-500 hover:text-lime-400 hover:bg-lime-500/10 rounded-lg transition-all duration-300 z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col bg-gray-900/98 backdrop-blur-xl border-t border-lime-500/20 shadow-2xl">
          <a 
            href="https://docs.google.com/presentation/d/1HqkKTVukGxRcYJt5YJQoGHyDrRAwCQVXt_vx2shYMVE/present?slide=id.p1"
            target="_blank"
            className="px-6 py-4 text-lime-500 italic hover:bg-lime-500/10 active:bg-lime-500/20 transition-all duration-300 border-b border-lime-500/10 flex items-center justify-between group"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Pitch</span>
            <span className="text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>

          <a
            href="https://explore.hashpack.app/nft/0.0.3872504/4062"
            className="px-6 py-4 text-lime-500 italic hover:bg-lime-500/10 active:bg-lime-500/20 transition-all duration-300 border-b border-lime-500/10 flex items-center justify-between group"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Certification</span>
            <span className="text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>

          <a
            href="https://drive.google.com/file/d/1KJfMpLdzgrAnWMo9sVoD898jwpJHtZDj/view?t=1"
            className="px-6 py-4 text-lime-500 italic hover:bg-lime-500/10 active:bg-lime-500/20 transition-all duration-300 border-b border-lime-500/10 flex items-center justify-between group"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Demo</span>
            <span className="text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>

          {/* Wallet Connection - Mobile */}
          <div className="px-6 py-5 bg-gray-800/50">
            {!account ? (
              <button
                onClick={() => {
                  connectWallet();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-lime-500 text-white rounded-lg hover:bg-green-400 active:scale-95 transition-all duration-300 font-medium shadow-lg"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="bg-white/5 backdrop-blur-md text-lime-500 font-medium border border-lime-500 rounded-lg px-4 py-3 text-sm text-center">
                  {account.slice(0, 8)}...{account.slice(-6)}
                </div>
                <button 
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md text-lime-500 font-medium border border-lime-500 rounded-lg px-4 py-3 hover:bg-lime-500/10 active:scale-95 transition-all duration-300"
                >
                  <LogOut size={18} />
                  <span>Disconnect Wallet</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

}

export default Navbar