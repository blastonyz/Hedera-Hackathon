import { Project } from "@/types/types";
import Link from "next/link"
import { MapPin, DollarSign, TrendingUp, Leaf } from "lucide-react"
import ProjectActions from "../actions/ProjectActions";
import './card.css'
type Props = {
    project:Project;
}

const ProjectCard = ({project}:Props) => {


     return (
 <div className="bg-gray-300/7 backdrop-blur-md rounded-lg shadow-md border border-lime-500 transition-transform overflow-hidden flex flex-col justify-between min-h-[600px] min-w-[330px] card-hover-glow">

      <div className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
            <div className="flex items-center mt-5 border rounded-lg border-[rgb(200,200,200,0.6)] w-max px-4 py-1">
              <MapPin className="w-4 h-4 mr-2 text-violet-400" />
              <h4 className="text-sm text-lime-500">Standard: {project.registry}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Methodologies */}
        <div className="space-y-3">
          {project.methodologies?.map((methodology: any, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium text-white`}>
                {methodology.category}
              </div>
              <span className="text-sm text-[#9BE10D] font-medium font-bold">{methodology.name}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 p-3 border border-[rgb(200,200,200,0.6)] rounded-lg">
          <DollarSign className="w-5 h-5 text-[#9BE10D]" />
          <span className="text-white font-l font-bold">
            {project.price === "0" ? "Price not available" : `${parseFloat(project.price).toFixed(2)} per credit`}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border border-[rgb(200,200,200,0.6)] rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-[#9BE10D]">Supply</span>
            </div>
            <p className="text-whitefont-semibold">{project.stats?.totalSupply.toFixed(2) || "N/A"}</p>
          </div>

          <div className="p-3 border border-[rgb(200,200,200,0.6)] rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-[#9BE10D]">Retired</span>
            </div>
            <p className="text-white font-semibold">{project.stats?.totalRetired.toFixed(2) || "N/A"}</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex space-x-4 justify-evenly">
          <a
  href={project.url}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-4 py-2 rounded-full text-[#9BE10D] border border-[#9BE10D] hover:bg-white transition font-medium text-sm shadow-sm"
>
  Visit Site
</a>

<Link
  href={`/project/${project._id}`}
  className="inline-block px-4 py-2 rounded-full text-[#9BE10D] border border-[#9BE10D] hover:bg-white transition font-medium text-sm shadow-sm"
>
  View Details
</Link>

        </div>

    
        <ProjectActions project={project}  />
      </div>
    </div>
  )
}

export default ProjectCard