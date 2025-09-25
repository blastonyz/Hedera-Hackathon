'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type HeroProps = {
    scrollToRef: React.RefObject<HTMLDivElement | null>
}


const Hero = ({ scrollToRef }: HeroProps) => {

    const handleScroll = () => {
        scrollToRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const buttonRef = useRef(null)
    const card1Ref = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from(titleRef.current, { y: -50, opacity: 0, duration: 1 })
            .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
            .from(buttonRef.current, { scale: 0.8, opacity: 0, duration: 0.6 }, '-=0.4')

        gsap.from([card1Ref.current], {
            scrollTrigger: {
                trigger: card1Ref.current,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
        })
    }, [])

    return (
        <section className="relative min-h-screen bg-[url('/home-lq.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center px-4 py-20">
            <div className="text-center max-w-3xl">
                <h2
                    ref={titleRef}
                    className="font-outline text-6xl md:text-8xl font-bold"
                    style={{ textShadow: '0 2px 6px rgba(34,197,94,0.8)',fontFamily: 'GoldenVarsityRegular, sans-serif' }} 
                >
                    GreenHouse
                </h2>

                <h1
                    ref={subtitleRef}
                    className="mt-4 text-lg"
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.97)'}}            >
                    Simulation of Tokenization of Verified Projects
                </h1>
            </div>


            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
                <div
                    ref={card1Ref}
                    className="bg-white/10 backdrop-blur-md border border-green-600 rounded-xl shadow-lg p-6 hover:animate-glow transition-transform"
                >
                    <p className="text-lg">
                        Claim GH Coins and purchase tokenized project credits to mitigate the impact of your carbon footprint.
                        You will take on the role of a company that emitted more carbon than allowed, and you will use credits to mitigate its emissions.
                    </p>
                </div>

                <div
                    ref={card1Ref}
                    className="bg-white/10 backdrop-blur-md border border-green-600 rounded-xl shadow-lg p-6 hover:animate-glow transition-transform"
                >
                    <p className="text-lg">
                        Claim projects, tokenize them in 1 click, and sell their available credits.You will assume the role of a project capable of issuing carbon credits, verified by different standards.

                    </p>
                </div>

            </div>

            <div className="w-full flex justify-center mt-6 pt-16">
                <div className="w-full max-w-xs">
                    <button
                        onClick={handleScroll}
                        className="w-full h-10 px-4 rounded font-semibold transition bg-green-600 text-white hover:bg-green-400"
                    >
                        Explore
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Hero