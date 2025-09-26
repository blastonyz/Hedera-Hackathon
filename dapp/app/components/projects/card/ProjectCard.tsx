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
 <div className="bg-white rounded-lg shadow-md border border-green-100 transition-transform overflow-hidden flex flex-col justify-between min-h-[600px] card-hover-glow">

      <div className="p-6 border-b border-green-50">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">{project.name}</h3>
            <div className="flex items-center text-green-600 mt-5">
              <MapPin className="w-4 h-4 mr-2" />
              <h4 className="text-sm">Standard: {project.registry}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Methodologies */}
        <div className="space-y-3">
          {project.methodologies?.map((methodology: any, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium text-gray-700`}>
                {methodology.category}
              </div>
              <span className="text-sm text-green-700 font-medium font-bold">{methodology.name}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-l font-bold">
            {project.price === "0" ? "Price not available" : `$${project.price} per credit`}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Supply</span>
            </div>
            <p className="text-green-800 font-semibold">{project.stats?.totalSupply || "N/A"}</p>
          </div>

          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Retired</span>
            </div>
            <p className="text-green-800 font-semibold">{project.stats?.totalRetired || "N/A"}</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex space-x-4 justify-evenly">
          <a
  href={project.url}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-yellow-200 transition font-medium text-sm shadow-sm"
>
  Visit Site
</a>

<Link
  href={`/project/${project._id}`}
  className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-yellow-200 transition font-medium text-sm shadow-sm"
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