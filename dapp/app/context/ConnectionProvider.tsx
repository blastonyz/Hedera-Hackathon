'use client'
import { useState, createContext, useContext, useEffect } from 'react'
import { BrowserProvider } from 'ethers'
import { JsonRpcSigner } from 'ethers'
import { Contract } from 'ethers'
import GHToken from '@contracts/GHToken.sol/GHToken.json'
import CarbonRetire from '@contracts/CarbonRetireNFT.sol/CarbonRetireNFT.json'
import CarbonProject from "@contracts/CarbonProjectNFT.sol/CarbonProjectNFT.json"
import CarbonFactory from "@contracts/CarbonFactory.sol/CarbonFactory.json"
import { addrGHToken } from '@contracts/adresses'
import { addrCarbonFactory } from '@/contracts/adresses'
import { addrCarbonRetire } from '@/contracts/adresses'
import { addrCarbonProject } from '@/contracts/adresses'


type WalletContextType = {
    account: WalletAddress;
    contracts: {
        GHToken?: Contract;
        CarbonProjectNFT?: Contract;
        CarbonRetireNFT?: Contract;
        CarbonFactory?: Contract;
    };
    connectWallet: () => Promise<void>;
    mainProvider: BrowserProvider | null;
    mainSigner: JsonRpcSigner | null;
    disconnectWallet: () => void
};


const WalletContext = createContext<WalletContextType | null>(null)

type Props = {
    children: React.ReactNode;
};

export const ConnectionProvider = ({ children }: Props) => {
    const [account, setAccount] = useState<WalletAddress>(null);
    const [contracts, setContracts] = useState<{
        GHToken?: Contract;
        CarbonProjectNFT?: Contract;
        CarbonRetireNFT?: Contract;
        CarbonFactory?: Contract;
    }>({});

    const [mainProvider, setMainProvider] = useState<BrowserProvider | null>(null);

    const [mainSigner, setMainSigner] = useState<JsonRpcSigner | null>(null);

    useEffect(() => {
        if (mainSigner) {
            setContracts({
                GHToken: new Contract(addrGHToken, GHToken.abi, mainSigner),
                CarbonProjectNFT: new Contract(addrCarbonProject, CarbonProject.abi, mainSigner),
                CarbonRetireNFT: new Contract(addrCarbonRetire, CarbonRetire.abi, mainSigner),
                CarbonFactory: new Contract(addrCarbonFactory, CarbonFactory.abi, mainSigner),
            });
        }
    }, [mainSigner]);


    useEffect(() => {
        const storedAddress = localStorage.getItem('walletAddress');
        if (storedAddress) {
            setAccount(storedAddress);
        }
    }, []);

    useEffect(() => {
        const initProvider = async () => {
            if (typeof window !== 'undefined' && window.ethereum && account && !mainProvider) {
                try {
                    const provider = new BrowserProvider(window.ethereum);
                    setMainProvider(provider);

                    const signer = await provider.getSigner();
                    const network = await signer.provider.getNetwork();
                    if (Number(network.chainId) !== 296) {
                        try {
                            await window.ethereum.request({
                                method: "wallet_switchEthereumChain",
                                params: [{ chainId: "0x128" }], // 296 en hexadecimal
                            });
                            console.log("🔄 Switched to Hedera Testnet");

                        } catch (err: unknown) {
                            console.log("❌ Failed to switch network:", err);
                        }
                    }

                    setMainSigner(signer);

                } catch (error: unknown) {
                    // Handle user rejection gracefully
                    if (
                        typeof error === 'object' &&
                        error !== null &&
                        'code' in error &&
                        ((error as { code: unknown }).code === 4001 || (error as { code: string }).code === 'ACTION_REJECTED')
                    ) {
                        console.warn("⚠️ Usuario rechazó la conexión de la wallet en initProvider.");
                        // Clear account if user rejects during init
                        setAccount(null);
                        localStorage.removeItem('walletAddress');
                    } else {
                        console.error("❌ Error inesperado al inicializar provider:", error);
                    }
                }
            }
        };

        initProvider();
    }, [account, mainProvider]);

    const connectWallet = async () => {
        try {
            if (typeof window !== 'undefined' && window.ethereum) {
                const provider = new BrowserProvider(window.ethereum);
                console.log('browser: ', provider);

                setMainProvider(provider);
                let signer;
                try {
                    signer = await provider.getSigner();
                } catch (err) {
                    console.warn("⚠️ user reject connection:", err);
                    return;
                }


                const address = await signer.getAddress();
                setAccount(address);
                console.log("Connected account:", address);
                localStorage.setItem('walletAddress', address);
            }

        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                (error as { code: unknown }).code === 4001
            ) {
                console.warn("⚠️ Usuario rechazó la conexión de la wallet.");
            } else {
                console.error("❌ Error inesperado al conectar la wallet:", error);
            }

        }

    }

    const disconnectWallet = () => {
        setAccount(null)
        localStorage.removeItem("walletAddress");
    }

    return (
        <WalletContext.Provider
            value={{
                account,
                contracts,
                connectWallet,
                mainProvider,
                mainSigner,
                disconnectWallet
            }}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a ConnectionProvider");
    }
    return context;
};