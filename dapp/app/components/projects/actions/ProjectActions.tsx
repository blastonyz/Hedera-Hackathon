'use client'
import { useWallet } from "@/app/context/ConnectionProvider";
import { Project } from "@/types/types";
import BuyNFT from "../../interactions/buy/BuyNFT";
import DeployERC721 from "../../interactions/deploy721/DeployERC721";
import RetireCredits from "../../interactions/retire/RetireCredits";
import AdminMint from "../../interactions/admin/AdminMint";



type ProjectActionsProps = {
  project: Project;
}


const ProjectActions = ({ project }: ProjectActionsProps) => {
  const { account } = useWallet()

  if (!account) {
    return (
      <div className="pt-4 mt-4 border-t border-lime-500/30">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <span className="text-lg">🔒</span>
          <p className="text-sm text-yellow-400 font-medium">Connect your wallet to continue</p>
        </div>
      </div>
    );
  }
  const isOwner = project.owner?.toLowerCase() === account.toLowerCase();

  return (
    <div className="pt-4 mt-4 border-t border-lime-500/30 space-y-3">
      {project.owner && (
        <div className="p-2 rounded-lg bg-lime-500/10 border border-lime-500/20">
          <p className="text-xs text-lime-400 font-medium">
            <span className="text-lime-500/70">Owned by:</span> {project.owner}
          </p>
        </div>
      )}

      {project.contractAddress && (
        <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
          <p className="text-xs text-violet-400 font-medium break-all">
            <span className="text-violet-500/70">Contract:</span> {project.contractAddress}
          </p>
        </div>
      )}

      {!project.isTokenized && (
        <DeployERC721 project={project} />
      )}

      {project.isTokenized && project.contractAddress && (
        <>
          {isOwner ? (
            <div className="space-y-3">
              <div className="p-2 rounded-lg bg-lime-500/20 border border-lime-500/40">
                <p className="text-sm text-lime-400 font-semibold text-center">👑 Project Owner</p>
              </div>
              <AdminMint nftAddress={project.contractAddress} cid={project.ipfsCID} />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <BuyNFT
                nftAddress={project.contractAddress}
                price={project.price}
                cid={project.ipfsCID}
              />
              <RetireCredits tokenAddress={project.contractAddress} />
            </div>
          )}


        </>
      )}
    </div>
  );
}

export default ProjectActions;