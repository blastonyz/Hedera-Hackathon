'use client'
import Hero from '../home/Hero'
import ProjectList from '../projects/ProjectList'
import { useRef, useLayoutEffect } from 'react'

const Main = () => {

  const projectsRef = useRef<HTMLDivElement>(null)
 
    useLayoutEffect(() => {
    
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }, [])

  return (
    <>
      <Hero scrollToRef={projectsRef} />
      <ProjectList ref={projectsRef} />

    </>
  )
}




export default Main
