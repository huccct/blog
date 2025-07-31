import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import Image from 'next/image'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

const RandomFloatingDots = () => {
  // Generate dots immediately instead of using empty array
  const generateInitialDots = () => {
    const dotArray = []
    const spacing = 40
    const cols = Math.ceil((typeof window !== 'undefined' ? window.innerWidth : 1200) / spacing) + 2
    const rows = Math.ceil((typeof window !== 'undefined' ? window.innerHeight : 800) / spacing) + 2

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Pre-calculate all random values to prevent re-renders
        const duration = 15 + Math.random() * 20
        const opacity = 0.2 + Math.random() * 0.3
        const size = 0.8 + Math.random() * 0.4
        
        // Pre-calculate animation keyframe values
        const move1X = (Math.random() - 0.5) * 8
        const move1Y = (Math.random() - 0.5) * 8
        const move2X = (Math.random() - 0.5) * 6
        const move2Y = (Math.random() - 0.5) * 6
        const move3X = (Math.random() - 0.5) * 10
        const move3Y = (Math.random() - 0.5) * 10
        
        const scale1 = size * (0.9 + Math.random() * 0.2)
        const scale2 = size * (0.8 + Math.random() * 0.4)
        const scale3 = size * (0.95 + Math.random() * 0.1)
        
        const opacity1 = Math.max(0.1, opacity + (Math.random() - 0.5) * 0.2)
        const opacity2 = Math.max(0.05, opacity - Math.random() * 0.15)
        const opacity3 = Math.max(0.1, opacity + (Math.random() - 0.5) * 0.1)

        dotArray.push({
          id: `${i}-${j}`,
          x: i * spacing + (Math.random() - 0.5) * 10,
          y: j * spacing + (Math.random() - 0.5) * 10,
          delay: 0, // Remove delay so dots appear immediately
          duration,
          opacity,
          size,
          // Store pre-calculated animation values
          animation: {
            move1X, move1Y, move2X, move2Y, move3X, move3Y,
            scale1, scale2, scale3,
            opacity1, opacity2, opacity3
          }
        })
      }
    }
    return dotArray
  }

  const [dots, setDots] = useState(generateInitialDots)

  useEffect(() => {
    const generateDots = () => {
      const dotArray = []
      const spacing = 40
      const cols = Math.ceil(window.innerWidth / spacing) + 2
      const rows = Math.ceil(window.innerHeight / spacing) + 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Pre-calculate all random values to prevent re-renders
          const duration = 15 + Math.random() * 20
          const opacity = 0.2 + Math.random() * 0.3
          const size = 0.8 + Math.random() * 0.4
          
          // Pre-calculate animation keyframe values
          const move1X = (Math.random() - 0.5) * 8
          const move1Y = (Math.random() - 0.5) * 8
          const move2X = (Math.random() - 0.5) * 6
          const move2Y = (Math.random() - 0.5) * 6
          const move3X = (Math.random() - 0.5) * 10
          const move3Y = (Math.random() - 0.5) * 10
          
          const scale1 = size * (0.9 + Math.random() * 0.2)
          const scale2 = size * (0.8 + Math.random() * 0.4)
          const scale3 = size * (0.95 + Math.random() * 0.1)
          
          const opacity1 = Math.max(0.1, opacity + (Math.random() - 0.5) * 0.2)
          const opacity2 = Math.max(0.05, opacity - Math.random() * 0.15)
          const opacity3 = Math.max(0.1, opacity + (Math.random() - 0.5) * 0.1)

          dotArray.push({
            id: `${i}-${j}`,
            x: i * spacing + (Math.random() - 0.5) * 10,
            y: j * spacing + (Math.random() - 0.5) * 10,
            delay: 0, // Remove delay so dots appear immediately
            duration,
            opacity,
            size,
            // Store pre-calculated animation values
            animation: {
              move1X, move1Y, move2X, move2Y, move3X, move3Y,
              scale1, scale2, scale3,
              opacity1, opacity2, opacity3
            }
          })
        }
      }
      setDots(dotArray)
    }

    // Only regenerate on resize, not on initial mount
    window.addEventListener('resize', generateDots)
    return () => window.removeEventListener('resize', generateDots)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            opacity: dot.opacity,
            transform: `scale(${dot.size})`,
            animation: `floatDot-${dot.id} ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`
          }}
        />
      ))}
      
      <style>{`
        ${dots.map(dot => `
          @keyframes floatDot-${dot.id} {
            0%, 100% { 
              transform: translate(0, 0) scale(${dot.size});
              opacity: ${dot.opacity};
            }
            25% { 
              transform: translate(${dot.animation.move1X}px, ${dot.animation.move1Y}px) scale(${dot.animation.scale1});
              opacity: ${dot.animation.opacity1};
            }
            50% { 
              transform: translate(${dot.animation.move2X}px, ${dot.animation.move2Y}px) scale(${dot.animation.scale2});
              opacity: ${dot.animation.opacity2};
            }
            75% { 
              transform: translate(${dot.animation.move3X}px, ${dot.animation.move3Y}px) scale(${dot.animation.scale3});
              opacity: ${dot.animation.opacity3};
            }
          }
        `).join('')}
        
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      
      {/* 浮动点背景 */}
      <RandomFloatingDots />
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700 relative z-10">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase of my works and side projects (creator or contributor)
          </p>
        </div>

        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-2">
            {projectsData.map((project) => {
              return (
                <Link 
                  key={project.title} 
                  href={project.href} 
                  className="block transform hover:scale-[1.02] transition-all duration-300"
                >
                  <article className="h-full group rounded-xl p-6 transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 dark:hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                            <Image
                              src={project.icon}
                              alt={`${project.title} icon`}
                              width={32}
                              height={32}
                              className="object-contain"
                              sizes="32px"
                            />
                          </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors duration-300">
                          {project.title}
                        </h2>
                      </div>
                      <p className="flex-grow mt-2 text-gray-600 dark:text-gray-400 line-clamp-3">
                        {project.brief}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-medium">
                        <span className="text-primary-500 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300">
                          Learn more{' '}
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={`https://github.com/huccct`}
              className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg 
                bg-white text-gray-700 hover:bg-gray-50
                dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700
                border border-gray-300 dark:border-gray-600"
            >
              <CodeBracketIcon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
              More Projects on GitHub
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}