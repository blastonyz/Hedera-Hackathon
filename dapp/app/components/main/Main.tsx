'use client'
import Hero from '../home/Hero'
import ProjectList from '../projects/ProjectList'
import ProjectData from '../interactions/data/ProjectsData'
import { useRef, useLayoutEffect, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/all'

const Main = () => {
  const pathname = usePathname()
  const projectsRef = useRef<HTMLDivElement>(null)
  const lastPathRef = useRef<string | null>(null)

  // 🧠 Restaurar scroll manualmente
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }, [])

  // 🧠 Detectar cambio de ruta y refrescar ScrollTrigger
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lastPathRef.current !== pathname) {
        ScrollTrigger.refresh()
        lastPathRef.current = pathname
      }
    }, 100) // ⏱️ da tiempo a que el DOM se monte

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <>
      <Hero scrollToRef={projectsRef} />
      <ProjectList ref={projectsRef} />
      <ProjectData />
    </>
  )
}

export default Main