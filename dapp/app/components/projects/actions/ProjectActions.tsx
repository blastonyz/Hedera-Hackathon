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
    return <p>🔒 Connect your wallet to continue</p>;
  }
  const isOwner = project.owner?.toLowerCase() === account.toLowerCase();

  return (
    <div className="pt-4 border-t border-[#9BE10D] space-y-3">
      {project.owner && (
        <p className="text-xs text-green-500">Owned by: {project.owner}</p>
      )}

      {project.contractAddress && (
        <p className="text-xs text-green-500">Contract: {project.contractAddress}</p>
      )}

      {!project.isTokenized && (
        <DeployERC721 project={project} />
      )}

      {project.isTokenized && project.contractAddress && (
        <>
          {isOwner ? (
            <>
            <p className="text-green-600">owner</p>
              {
                <AdminMint nftAddress={project.contractAddress} cid={project.ipfsCID} />
              }
              
            </>
          )
            :
            <div className="flex flex-col gap-2 justify-center">
                    <BuyNFT
                nftAddress={project.contractAddress}
                price={project.price}
                cid={project.ipfsCID}
              />

              <RetireCredits tokenAddress={project.contractAddress} />
           
            </div>
        
          }


        </>
      )}
    </div>
  );
}

export default ProjectActions;