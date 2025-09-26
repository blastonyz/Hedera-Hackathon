'use client'
import { useState, createContext, useContext, useEffect } from "react"
import { Project } from "@/types/types"
import { ProjectsResponse } from "@/types/types"
import { ProjectsContextType } from "@/types/types"

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
    const [res, setRes] = useState<ProjectsResponse>({
        projects: [],
        total: 0,
        page: 1,
        pages: 1,
        hasNextPage: false,
        hasPrevPage: false,
    });
    const [totalProjects, setTotalProjects] = useState<number>(0);
    const [projects, setProjects] = useState<Project[]>([]);
      const [loading,setLoading] = useState(true)

    const getProjects = async (page = 1, limit = 6) => {
        try {
            const response = await fetch(`/api/projects?page=${page}&limit=${limit}`);
            if (!response.ok) throw new Error('Failed to fetch projects');

            const result: ProjectsResponse = await response.json();
            console.log('Fetched projects:', result);
            setRes(result);
            setProjects(result.projects);
            setTotalProjects(result.total);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }finally{
            setLoading(false)
        }
    };



    const filterByCountry = (country: string): Project[] => {
        return projects.filter(project => project.country === country);

    }

    const selectProject = (_id: string): Project | null => {
        const selected = projects.find(project => project._id === _id) || null;
        console.log('selected', selected);
        return selected

    }

    const filterByOwners = () => {
        return projects.filter(project => project.owner !== '')
    }


    useEffect(() => {
        getProjects();
    }, []);

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                filterByCountry,
                selectProject,
                filterByOwners,
                totalProjects,
                getProjects,
                loading,
                page: res.page,
                pages: res.pages,
                hasNextPage: res.hasNextPage,
                hasPrevPage: res.hasPrevPage,
            }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error("useProjects must be used within a ProjectsProvider");
    }
    return context;
}