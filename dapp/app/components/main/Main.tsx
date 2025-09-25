'use client'
import Hero from '../home/Hero'
import ProjectList from '../projects/ProjectList'
import { useRef } from 'react'

const Main = () => {
  const projectsRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Hero scrollToRef={projectsRef} />
      <ProjectList ref={projectsRef} />
    </>
  )
}

export default Main
