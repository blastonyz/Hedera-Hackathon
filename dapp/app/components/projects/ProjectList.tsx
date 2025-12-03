'use client'
import GetTokensERC20 from "../get-tokens/GetTokensERC20";
import { useProjects } from "@/app/context/ProjectsProvider";
import ProjectCard from "./card/ProjectCard";
import Loader from "../loader/Loader";
import { forwardRef } from 'react';


const ProjectList = forwardRef<HTMLDivElement, unknown>(function ProjectList(_, ref) {

    const { projects, totalProjects, getProjects, loading, page, pages, hasNextPage, hasPrevPage } = useProjects()

    return (
        <section
            ref={ref}
            className="relative px-4 mx-auto w-full py-10"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundColor: 'rgba(48, 2, 68, 0.3)',
                    zIndex: -1,
                    backdropFilter: 'blur(10px)'
                }}
            />

            <div className="relative text-center z-1 px-4">
                <div className="flex items-center justify-center mb-4">
                    <div className="h-px bg-white flex-1 max-w-8 sm:max-w-16"></div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold block text-white mx-3 sm:mx-6">Carbon Credit Projects</h2>
                    <div className="h-px bg-white flex-1 max-w-8 sm:max-w-16"></div>
                </div>
                <p className="text-base sm:text-lg text-[#92E01D] mb-6 max-w-2xl mx-auto z-10">
                    Discover verified carbon offset projects making a real impact on climate change
                </p>
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-white">
                    <span className="text-xs sm:text-sm font-medium text-white">
                        {totalProjects} {projects.length === 1 ? "project" : "projects"} available
                    </span>
                </div>
            </div>
            <div className="flex justify-center items-center py-12">
                <GetTokensERC20 />
            </div>

            <div className="flex justify-center gap-2 sm:gap-4 mb-12 px-4">
                <button
                    disabled={!hasPrevPage}
                    onClick={() => getProjects(page - 1)}
                    className="px-3 sm:px-4 py-2 text-[#9BE10D] backdrop-blur-md border border-[#9BE10D] rounded-lg disabled:opacity-50 hover:bg-[#9BE10D]/10 transition-all duration-300 text-sm sm:text-base"
                >
                    {"<"} <span className="hidden sm:inline">Prev</span>
                </button>

                <span className="text-[#9BE10D] font-medium px-2 sm:px-4 py-2 text-sm sm:text-base">
                    Page {page} of {pages}
                </span>

                <button
                    disabled={!hasNextPage}
                    onClick={() => getProjects(page + 1)}
                    className="px-3 sm:px-4 py-2 text-[#9BE10D] backdrop-blur-md rounded-lg border border-[#9BE10D] disabled:opacity-50 hover:bg-[#9BE10D]/10 transition-all duration-300 text-sm sm:text-base"
                >
                    <span className="hidden sm:inline">Next</span> {">"}
                </button>
            </div>

            <div className="min-h-[200px] flex justify-center items-center">
                {loading ? (
                    <div className="flex flex-column text-[#9BE10D] animate-pulse text-lg font-medium">
                        <Loader />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full px-4 sm:px-6 lg:px-10">
                        {projects.map((project) => (
                            <ProjectCard key={project.key} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )

})

export default ProjectList