'use client';
import ProjectDetail from "@/app/components/project/ProjectDetailsCard";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from "react";
import { useProjects } from "@/app/context/ProjectsProvider";
import { Project } from "@/types/types";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
}

gsap.registerPlugin(ScrollTrigger)

const ProjectDetailContainer = ({ id }: Props) => {
  const { selectProject } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  const handleBack = () => {
    router.back()
    setTimeout(() => {
      ScrollTrigger.refresh()
      window.location.reload()
    }, 300) 
  }

  useEffect(() => {
    const result = selectProject(id);
    setProject(result);
    setLoading(false);
  }, [id, selectProject]);

  if (loading) return <p className="text-center py-8">🔄 Loading project...</p>;
  if (!project) return <p className="text-center py-8 text-red-600">❌ Project not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-12">
    
      <ProjectDetail project={project} />

       <button
      onClick={handleBack}
      className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-green-400 transition"
    >
      ← Back
    </button>

    </div>
  );
};

export default ProjectDetailContainer;

