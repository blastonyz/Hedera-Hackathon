import { Project } from "@/types/types";
import Link from "next/link"
import { MapPin, DollarSign, TrendingUp, Leaf, ArrowRight } from "lucide-react"
import ProjectActions from "../actions/ProjectActions";
import './card.css'

type Props = {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="project-card group relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-lime-500/30 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[550px] sm:min-h-[600px] w-full hover:border-lime-500/60">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      <div className="relative p-4 sm:p-5 lg:p-6 z-10">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-lime-400 transition-colors duration-300 line-clamp-2">
              {project.name}
            </h3>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-lime-500/40 bg-lime-500/10 backdrop-blur-sm hover:bg-lime-500/20 transition-all duration-300">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
              <h4 className="text-xs sm:text-sm font-medium text-lime-400">Standard: {project.registry}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 z-10">
        {/* Methodologies */}
        <div className="space-y-2 sm:space-y-3">
          {project.methodologies?.map((methodology, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
            >
              <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-violet-500/80 to-violet-600/80 text-white shadow-lg whitespace-nowrap">
                {methodology.category}
              </div>
              <span className="text-xs sm:text-sm text-lime-400 font-semibold flex-1 line-clamp-1">{methodology.name}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-violet-500/30 bg-gradient-to-r bg-gradient-to-br from-violet-500/10 to-transparent backdrop-blur-sm hover:border-lime-500/50 transition-all duration-300">
          <div className="p-1.5 sm:p-2 rounded-lg bg-lime-500/20 flex-shrink-0">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />
          </div>
          <span className="text-white font-bold text-xs sm:text-sm lg:text-base">
            {project.price === "0" ? "Price not available" : `$${parseFloat(project.price).toFixed(2)} per credit`}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-transparent backdrop-blur-sm hover:border-violet-500/50 transition-all duration-300 group/stat">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 rounded-lg bg-violet-500/20 group-hover/stat:bg-violet-500/30 transition-colors">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-lime-400 uppercase tracking-wide">Supply</span>
            </div>
            <p className="text-white font-bold text-base sm:text-lg">{project.stats?.totalSupply.toFixed(2) || "N/A"}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-transparent backdrop-blur-sm hover:border-violet-500/50 transition-all duration-300 group/stat">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 rounded-lg bg-violet-500/20 group-hover/stat:bg-violet-500/30 transition-colors">
                <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-lime-400" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-[#9BE10D] uppercase tracking-wide">Retired</span>
            </div>
            <p className="text-white font-bold text-base sm:text-lg">{project.stats?.totalRetired.toFixed(2) || "N/A"}</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pt-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[#9BE10D] border border-[#9BE10D]/50 bg-[#9BE10D]/10 backdrop-blur-sm hover:bg-[#9BE10D] hover:text-gray-900 hover:border-[#9BE10D] transition-all duration-300 font-semibold text-xs sm:text-sm shadow-lg hover:shadow-[#9BE10D]/50 hover:scale-105"
          >
            Visit Site
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>

          <Link
            href={`/project/${project._id}`}
            className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[#9BE10D] border border-[#9BE10D]/50 bg-[#9BE10D]/10 backdrop-blur-sm hover:bg-[#9BE10D] hover:text-gray-900 hover:border-[#9BE10D] transition-all duration-300 font-semibold text-xs sm:text-sm shadow-lg hover:shadow-[#9BE10D]/50 hover:scale-105"
          >
            Details
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <ProjectActions project={project} />
      </div>
    </div>
  )
}

export default ProjectCard