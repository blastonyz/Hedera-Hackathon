'use client'
import { useWallet } from "@/app/context/ConnectionProvider"
import { useState, useEffect, useCallback } from "react"

const ProjectData = () => {
    const { account, contracts } = useWallet()
    const [tokenCount, setTokenCount] = useState<number | null>(null)
    const [projectsCount, setProjectsCount] = useState<number | null>(null)
    const [userProjects, setUserProjects] = useState<number | null>(null)

    const retireContract = contracts.CarbonRetireNFT
    const factoryContract = contracts.CarbonFactory

   
const getData = useCallback(async () => {
  if (!account) {
    console.warn("No wallet/account connected");
    return;
  }
  if (!retireContract || typeof retireContract.totalMinted !== "function") {
    console.warn("retireContract no está listo o no tiene totalMinted");
    return;
  }

  try {
    const totalMinted = await retireContract.totalMinted();
    setTokenCount(Number(totalMinted));

    const totalProjects = await factoryContract!.totalProjects();
    setProjectsCount(Number(totalProjects));

    const ownerProjects = await factoryContract!.getOwnerProjects(account);
    setUserProjects(ownerProjects.length);
  } catch (err) {
    console.error("Error fetching project data", err);
  }
}, [account, retireContract, factoryContract]);

    useEffect(() => {
        getData()
    }
    , [getData])

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

            <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl px-4">
                <div className="flex flex-col justify-between bg-white/10 backdrop-blur-md border border-lime-500 rounded-xl shadow-lg py-12 px-10 hover:animate-glow transition-transform">
                    <h2 className="flex items-center gap-2 text-[48px] font-bold text-lime-500 mb-8">
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
                    <div className="flex justify-between items-center text-xl text-white">
                        <span>Metrics Tons of CO₂ Retired:</span>
                        <span className="text-right text-white text-3xl font-bold drop-shadow-[0_0_2px_violet]">
                            {tokenCount ?? 0} tn
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xl text-white">
                        <span>Total Projects Tokenized:</span>
                        <span className="text-right text-white text-3xl font-bold drop-shadow-[0_0_2px_violet]">
                            {projectsCount ?? 0}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xl text-white">
                        <span>Projects Owned:</span>
                        <span className="text-right text-white text-3xl font-bold drop-shadow-[0_0_2px_violet]">
                            {userProjects ?? 0}
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