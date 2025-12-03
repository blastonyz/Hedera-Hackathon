'use client'
import { useWallet } from "@/app/context/ConnectionProvider"
import { useState, useEffect, useCallback } from "react"

const ProjectData = () => {
    const { account, contracts, mainProvider, mainSigner } = useWallet()
    const [tokenCount, setTokenCount] = useState<number>(0)
    const [projectsCount, setProjectsCount] = useState<number>(0)
    const [userProjects, setUserProjects] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const retireContract = contracts?.CarbonRetireNFT
    const factoryContract = contracts?.CarbonFactory
    
    // Check if we have all required dependencies
    const isReady = !!account && !!mainProvider && !!mainSigner && !!retireContract && !!factoryContract

   
const getData = useCallback(async () => {
  
  if (!isReady) {
    setTokenCount(0);
    setProjectsCount(0);
    setUserProjects(0);
    setIsLoading(false);
    setError(null);
    return;
  }

  setError(null);

  // Verify account from signer matches context account
  let signerAccount: string;
  try {
    signerAccount = await mainSigner.getAddress();
    if (!signerAccount 
      || signerAccount.toLowerCase() !== account.toLowerCase() ||
      !mainSigner || !account 
      || !retireContract 
      || !factoryContract
      || !retireContract.totalMinted 
      || !factoryContract.totalProjects
    ) {
      setTokenCount(0);
      setProjectsCount(0);
      setUserProjects(0);
      setIsLoading(false);
      return;
    }
  } catch (err) {
    // Can't get account from signer - don't proceed
    setTokenCount(0);
    setProjectsCount(0);
    setUserProjects(0);
    setIsLoading(false);
    return;
  }


  // Validate contract methods exist
  if (typeof retireContract.totalMinted !== "function" || 
      typeof factoryContract.totalProjects !== "function") {
    setTokenCount(0);
    setProjectsCount(0);
    setUserProjects(0);
    setIsLoading(false);
    return;
  }

  setIsLoading(true);

  try {
    // Fetch totalMinted with error handling
    try {
      const totalMinted = await retireContract.totalMinted();
      setTokenCount(Number(totalMinted));
    } catch (err: any) {
      // Silently handle BAD_DATA errors - they're expected when contract isn't deployed
      if (err?.code === 'BAD_DATA' || err?.message?.includes('decode') || err?.message?.includes('0x')) {
        setTokenCount(0);
      } else {
        console.error("Error fetching totalMinted:", err);
        setTokenCount(0);
      }
    }

    // Fetch totalProjects with error handling
    try {
      const totalProjects = await factoryContract.totalProjects();
      setProjectsCount(Number(totalProjects));
    } catch (err: any) {
      // Silently handle BAD_DATA errors
      if (err?.code === 'BAD_DATA' || err?.message?.includes('decode') || err?.message?.includes('0x')) {
        setProjectsCount(0);
      } else {
        console.error("Error fetching totalProjects:", err);
        setProjectsCount(0);
      }
    }

    // Fetch user projects with error handling - only if account exists
    if (signerAccount && typeof factoryContract.getOwnerProjects === "function") {
      try {
        const ownerProjects = await factoryContract.getOwnerProjects(signerAccount);
        setUserProjects(ownerProjects.length);
      } catch (err: any) {
        // Silently handle BAD_DATA errors
        if (err?.code === 'BAD_DATA' || err?.message?.includes('decode') || err?.message?.includes('0x')) {
          setUserProjects(0);
        } else {
          console.error("Error fetching ownerProjects:", err);
          setUserProjects(0);
        }
      }
    } else {
      setUserProjects(0);
    }
  } catch (err: any) {
    // Only log unexpected errors
    if (err?.code !== 'BAD_DATA' && !err?.message?.includes('decode') && !err?.message?.includes('0x')) {
      console.error("Unexpected error fetching project data:", err);
      setError(err?.message || "Failed to fetch data");
    }
  } finally {
    setIsLoading(false);
  }
}, [account, retireContract, factoryContract, mainProvider, mainSigner, isReady]);

    useEffect(() => {
       
        if (isReady) {
            getData();
        } else {
            // Reset values when conditions aren't met
            setTokenCount(0);
            setProjectsCount(0);
            setUserProjects(0);
            setError(null);
            setIsLoading(false);
        }
    }, [isReady, getData])

    return (
        <div className="relative text-white flex flex-col items-center justify-center px-4 py-10">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundColor: 'rgba(48, 2, 68, 0.3)',
                    zIndex: -1,
                    backdropFilter: 'blur(10px)',
                }}
            />

            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 w-full max-w-6xl px-4">
                <div className="flex flex-col justify-between bg-white/10 backdrop-blur-md border border-lime-500 rounded-xl shadow-lg py-8 sm:py-10 lg:py-12 px-6 sm:px-8 lg:px-10 hover:animate-glow transition-transform">
                    <h2 className="flex flex-col sm:flex-row items-center justify-center sm:gap-2 text-3xl sm:text-4xl lg:text-[48px] font-bold text-lime-500 mb-6 sm:mb-8">
                        <span className="text-violet-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-16 h-16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.828 10.172a4 4 0 010 5.656l-3.536 3.536a4 4 0 01-5.656-5.656l1.414-1.414M10.172 13.828a4 4 0 010-5.656l3.536-3.536a4 4 0 015.656 5.656l-1.414 1.414"
                                />
                            </svg>
                        </span>
                        On-Chain Data
                    </h2>
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/50">
                            <p className="text-sm text-yellow-400">{error}</p>
                        </div>
                    )}
                    {isLoading && (
                        <div className="mb-4 p-3 rounded-lg bg-blue-500/20 border border-blue-500/50">
                            <p className="text-sm text-blue-400">Loading data...</p>
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 text-base sm:text-lg lg:text-xl text-white mb-4">
                        <span className="text-sm sm:text-base lg:text-xl">Metrics Tons of CO₂ Retired:</span>
                        <span className="text-right text-white text-2xl sm:text-3xl font-bold drop-shadow-[0_0_2px_violet]">
                            {isLoading ? "..." : (tokenCount ?? 0)} tn
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 text-base sm:text-lg lg:text-xl text-white mb-4">
                        <span className="text-sm sm:text-base lg:text-xl">Total Projects Tokenized:</span>
                        <span className="text-right text-white text-2xl sm:text-3xl font-bold drop-shadow-[0_0_2px_violet]">
                            {isLoading ? "..." : (projectsCount ?? 0)}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 text-base sm:text-lg lg:text-xl text-white">
                        <span className="text-sm sm:text-base lg:text-xl">Projects Owned:</span>
                        <span className="text-right text-white text-2xl sm:text-3xl font-bold drop-shadow-[0_0_2px_violet]">
                            {isLoading ? "..." : (userProjects ?? 0)}
                        </span>
                    </div>
                </div>

                {/* Cards informativas */}
                <div className="flex-1 grid grid-cols-1 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white/10 backdrop-blur-md border border-violet-400 rounded-xl shadow-lg p-6 space-y-4 text-white hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-2 text-2xl font-semibold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-violet-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 20h5v-2a3 3 0 00-3-3h-2m-4 5h-4m0 0H5v-2a3 3 0 013-3h2m4 5v-6m0 0V9a3 3 0 00-6 0v5m6 0a3 3 0 006 0v-5a3 3 0 00-6 0v5z"
                                />
                            </svg>
                            Democratizing Access
                        </div>
                        <p className="text-base text-white/80 leading-relaxed">
                            GreenHouse opens carbon markets to buyers and sustainable projects worldwide, enhancing transparency and traceability.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/10 backdrop-blur-md border border-violet-400 rounded-xl shadow-lg p-6 space-y-4 text-white hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-2 text-2xl font-semibold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-violet-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 10h4v11H3zM10 3h4v18h-4zM17 13h4v8h-4z"
                                />
                            </svg>
                            $50B by 2030
                        </div>
                        <p className="text-base text-white/80 leading-relaxed">
                            Carbon markets are projected to reach $50 billion in capitalization, enabling global participation in GHG reduction.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white/10 backdrop-blur-md border border-violet-400 rounded-xl shadow-lg p-6 space-y-4 text-white hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-2 text-2xl font-semibold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-violet-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zM6 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zM12 17c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2z"
                                />
                            </svg>
                            Powered by Web3
                        </div>
                        <p className="text-base text-white/80 leading-relaxed">
                            Blockchain and decentralized tech enable a cleaner, more democratic and sustainable future for carbon offsetting.
                        </p>
                    </div>
                </div>
            </div>

            {/* Créditos */}
            <p className="mt-10 text-sm text-white/60 italic text-center px-4">
                Many thanks to the Hedera team, from their student Blas Antonio Zamora.
            </p>
        </div>
    );
}

export default ProjectData