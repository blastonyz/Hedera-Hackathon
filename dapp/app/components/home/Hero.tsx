'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, DollarSign, Globe, Flame } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type HeroProps = {
    scrollToRef: React.RefObject<HTMLDivElement | null>
}

const Hero = ({ scrollToRef }: HeroProps) => {

    const handleScroll = () => {
        const target = scrollToRef.current;
        if (!target) {
            return
        }
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
    };

    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const buttonRef = useRef(null)
    const card1Ref = useRef<HTMLDivElement | null>(null)
    const card2Ref = useRef<HTMLDivElement | null>(null)
    const card3Ref = useRef<HTMLDivElement | null>(null)
    const card4Ref = useRef<HTMLDivElement | null>(null)

 useEffect(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (titleRef.current) {
    tl.from(titleRef.current, { y: -50, opacity: 0, duration: 1 });
  }
  if (subtitleRef.current) {
    tl.from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.6');
  }
  if (buttonRef.current) {
    tl.from(buttonRef.current, { scale: 0.8, opacity: 0, duration: 0.6 }, '-=0.4');
  }

  const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(Boolean);

  cards.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
    });
  });

  ScrollTrigger.refresh(); // 🧠 recalcula triggers

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);

    return (
        <section className="relative min-h-screen text-white flex flex-col items-center justify-center px-4 pt-20 sm:pt-24">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundColor: 'rgba(48, 2, 68, 0.3)',
                    zIndex: -1,
                    backdropFilter: 'blur(10px)'
                }}
            />
            <div className="text-center max-w-3xl px-4">
                <h2
                    ref={titleRef}
                    className="font-outline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                    style={{
                        textShadow: '0 4px 8px #050505, 0 12px 18px #9BE10D',
                        fontFamily: 'GoldenVarsityScript, sans-serif'
                    }}
                >
                    GreenHouse
                </h2>

                <h1
                    ref={subtitleRef}
                    className="mt-6 sm:mt-8 lg:mt-10 text-sm sm:text-base md:text-lg px-4"
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.97)' }}
                >
                    Simulation of Tokenization of Verified Carbon Projects
                </h1>
            </div>


            <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl w-full px-4">
               
                <div ref={card1Ref} className="bg-white/10 backdrop-blur-md border border-lime-500 rounded-xl shadow-lg p-5 sm:p-6 hover:animate-glow transition-transform space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-violet-500 p-2 rounded-full">
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h3 className="text-lime-400 text-lg sm:text-xl font-semibold">Corporate Role</h3>
                    </div>
                    <p className="text-white text-xs sm:text-sm leading-relaxed">
                        Claim GH Coins and purchase tokenized project credits to mitigate the impact of your carbon footprint.
                        You will take on the role of a company that emitted more carbon than allowed, and you will use credits to mitigate its emissions.
                    </p>
                </div>

                <div ref={card2Ref} className="bg-white/10 backdrop-blur-md border border-lime-500 rounded-xl shadow-lg p-5 sm:p-6 hover:animate-glow transition-transform space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-violet-500 p-2 rounded-full">
                            <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h3 className="text-lime-400 text-lg sm:text-xl font-semibold">Project Role</h3>
                    </div>
                    <p className="text-white text-xs sm:text-sm leading-relaxed">
                        Claim projects, tokenize them in 1 click, and sell their available credits.
                        You will assume the role of a project capable of issuing carbon credits, verified by different standards.
                    </p>
                </div>

                <div ref={card3Ref} className="bg-white/10 backdrop-blur-md border border-lime-500 rounded-xl shadow-lg p-5 sm:p-6 hover:animate-glow transition-transform space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-violet-500 p-2 rounded-full">
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h3 className="text-lime-400 text-lg sm:text-xl font-semibold">1 Token = 1 Ton CO₂</h3>
                    </div>
                    <p className="text-white text-xs sm:text-sm leading-relaxed">
                        Each token represents one metric ton of CO₂. The total supply is determined by independent verifiers based on the absorption capacity of each project.
                    </p>
                </div>

                <div ref={card4Ref} className="bg-white/10 backdrop-blur-md border border-lime-500 rounded-xl shadow-lg p-5 sm:p-6 hover:animate-glow transition-transform space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-violet-500 p-2 rounded-full">
                            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h3 className="text-lime-400 text-lg sm:text-xl font-semibold">Retirement & Burn</h3>
                    </div>
                    <p className="text-white text-xs sm:text-sm leading-relaxed">
                        When credits are retired, tokens are burned and an on-chain counter tracks the total tons of CO₂ removed across all listed projects. A retirement certificate NFT is minted to prove the action, verifiable record on-chain
                    </p>
                </div>
            </div>

            <div className="w-full flex justify-center mt-8 sm:mt-10 px-4 relative z-10">
                <button
                    ref={buttonRef}
                    onClick={handleScroll}
                    className="w-full max-w-xs h-10 sm:h-12 px-4 rounded-lg font-semibold transition-all duration-300 bg-lime-500 text-white hover:bg-green-400 hover:scale-105 shadow-lg hover:shadow-lime-500/50 text-sm sm:text-base opacity-100"
                    style={{ opacity: 1 }}
                >
                    Explore
                </button>
            </div>
        </section>
    )
}

export default Hero