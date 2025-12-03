import { Project } from "@/types/types";
import Image from "next/image";
import { MapPin, DollarSign, Leaf, TrendingUp, ExternalLink, ArrowRight } from "lucide-react";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetailsCard = ({ project }: ProjectDetailProps) => {
  const {
    key,
    name,
    country,
    price,
    methodologies,
    sustainableDevelopmentGoals,
    short_description,
    url,
    satelliteImage,
    stats,
  } = project;

  return (
    <div className="bg-gray-300/10 backdrop-blur-md rounded-xl shadow-lg border border-lime-500 p-4 sm:p-6 max-w-4xl mx-auto my-6 sm:my-10 text-white font-sans space-y-4 sm:space-y-6 card-hover-glow">

      <h2 className="text-2xl sm:text-3xl font-bold text-white">{name}</h2>

      {satelliteImage?.url && (
       <div className="flex justify-center">
    <Image
      src={satelliteImage.url}
      alt={satelliteImage.caption || "Satellite image"}
      width={720}
      height={400}
      className="rounded-lg shadow-md border border-gray-500"
    />
  </div>

      )}

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="flex items-center space-x-2 p-3 border border-[rgb(200,200,200,0.6)] rounded-lg">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 flex-shrink-0" />
          <span className="flex flex-row text-lime-500 font-medium text-sm sm:text-base">
            Country: <p className="text-white ml-2 sm:ml-3"> {country}</p>
          </span>
        </div>

        <div className="flex items-center space-x-2 p-3 border border-[rgb(200,200,200,0.6)] rounded-lg">
          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-lime-500 flex-shrink-0" />
          <span className="text-white font-bold text-sm sm:text-base">
            {price === "0" ? "Price not available" : `$${parseFloat(price).toFixed(2)} / tonne`}
          </span>
        </div>

        <div className="flex items-center space-x-2 p-3 border border-[rgb(200,200,200,0.6)] rounded-lg col-span-1 sm:col-span-2">
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-lime-500 font-medium break-all">Project Key: {key}</span>
        </div>
      </div>

      {/* Methodologies */}
      {methodologies.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-lime-400">Methodologies</h3>
          {methodologies.map((method) => (
            <div key={method.id} className="flex items-center space-x-2 sm:space-x-3">
              <div className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-violet-500 text-white whitespace-nowrap">
                {method.category}
              </div>
              <span className="text-xs sm:text-sm text-white font-bold line-clamp-2">{method.name}</span>
            </div>
          ))}
        </div>
      )}

      {sustainableDevelopmentGoals.length > 0 && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-lime-400 mb-3 sm:mb-4">Sustainable Development Goals</h3>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {sustainableDevelopmentGoals.map((sdg, index) => (
              <div
                key={index}
                className="bg-violet-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium shadow-md hover:scale-[1.03] transition"
              >
                {sdg}
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="p-3 border border-[rgb(200,200,200,0.6)] rounded-lg">
          <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
            <span className="text-xs sm:text-sm font-medium text-lime-500">Supply</span>
          </div>
          <p className="text-white font-semibold text-sm sm:text-base">{stats?.totalSupply.toFixed(2) || "N/A"}</p>
        </div>

        <div className="p-3 border border-[rgb(200,200,200,0.6)] rounded-lg">
          <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2">
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
            <span className="text-xs sm:text-sm font-medium text-[#9BE10D]">Retired</span>
          </div>
          <p className="text-white font-semibold text-sm sm:text-base">{stats?.totalRetired.toFixed(2) || "N/A"}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-lime-400 mb-2">Description</h3>
        <p className="text-white text-sm sm:text-base leading-relaxed">{short_description}</p>
      </div>

      {/* External Link */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[#9BE10D] border border-[#9BE10D] hover:bg-[#9BE10D] hover:text-gray-900 transition-all duration-300 font-medium text-xs sm:text-sm shadow-lg hover:shadow-[#9BE10D]/50 hover:scale-105"
        >
          View on Verra Registry
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;