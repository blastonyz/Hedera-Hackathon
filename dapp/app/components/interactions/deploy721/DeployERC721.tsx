'use client'
import { useState } from 'react'
import { useWallet } from '@/app/context/ConnectionProvider'
import { Project } from '@/types/types';
import { buildMetadata, buildDeployParamsFromProject, deployProject } from './DeployFunctions';
import { addrGHToken, addrCarbonRetire, addrCarbonFactory } from '@/contracts/adresses';
import { Contract } from 'ethers';
import CarbonFactory from '@contracts/CarbonFactory.sol/CarbonFactory.json'
import Button from '../../ui/Button';
import FloatingPopupPortal from '../../ui/FloatingPopUpPortal';

type Props = {
    project: Project;
};

const DeployERC721 = ({ project }: Props) => {
    const { mainProvider, account, mainSigner } = useWallet()
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | {
        address: string;
        projectId: number;
        owner: string;
        txHash: string;
    }>(null);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" | "warning" } | null>(null);

    const factoryContract = new Contract(addrCarbonFactory, CarbonFactory.abi, mainSigner)

    const handleDeploy = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
            setToast({ message, type });
            setTimeout(() => setToast(null), 5000);
        };

        if (!account) {
            setError("Wallet not connected");
            return;
        }

        const metadata = buildMetadata(project);
        console.log("Metadata to upload:", metadata);

        const res = await fetch("/api/files", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(metadata),
        });
        const uploadResponse = await res.json();
        console.log("IPFS upload response:", uploadResponse);
        const { cid } = uploadResponse;

        if (!cid) throw new Error("No CID returned");

        if (!mainSigner || !addrCarbonFactory) {
            setError("Signer or contract address not available");
            return;
        }
        const deployParams = buildDeployParamsFromProject(
            project,
            account,
            addrGHToken,
            addrCarbonRetire,
            factoryContract
        );

        try {
            const network = await mainProvider!.getNetwork();
            console.log("🌐 Active network:", network.name, "Chain ID:", network.chainId);

            const res = await deployProject(deployParams);
            console.log("Deploy result:", res);
            setResult(res);
            showToast("✅ Token deployed successfully", "success");

            if (res.txHash && res.address) {
                console.log('contract address', res.address);
                console.log('prev fetch cid: ', cid);
                const updateRes = await fetch(`/api/project/${project._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        isTokenized: true,
                        owner: account,
                        contractAddress: res.address,
                        ipfsCID: cid
                    }),
                });
                const updateData = await updateRes.json();
                console.log("Update project result:", updateData);
            }
        } catch (err: unknown) {
            let errorMessage = 'Unknown Error';
            if (
                typeof err === 'object' &&
                err !== null &&
                'message' in err &&
                typeof (err as { message?: unknown }).message === 'string'
            ) {
                errorMessage = (err as { message: string }).message;
            }
            setError(errorMessage || "Error deploying contract");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex p-4 border border-[#9BE10D] rounded-lg items-center justify-center">

            <Button
                onClick={handleDeploy}
                text='Tokenize'
                account={account}
                loading={loading}
                mainSigner={mainSigner}
            />

            {result && (
                <FloatingPopupPortal
                    message="Token deployed!"
                    details={{
                        Address: result.address,
                        ProjectID: String(result.projectId),
                        Owner: result.owner,
                        TxHash: result.txHash,
                    }}

                    onClose={() => setResult(null)}
                />
            )}
            {error && (
                <FloatingPopupPortal
                    message={error}
                    details={undefined}
                    onClose={() => setError(null)}
                />
            )}

            {toast && (
                <FloatingPopupPortal
                    message={toast.message}
                    details={undefined}
                    onClose={() => setToast(null)}
                />
            )}

        </div>
    );

}

export default DeployERC721