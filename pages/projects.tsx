import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import Image from 'next/image'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

const RandomFloatingDots = () => {
  // Generate dots immediately with wave parameters
  const generateInitialDots = () => {
    const dotArray = []
    const spacing = 40
    const cols = Math.ceil((typeof window !== 'undefined' ? window.innerWidth : 1200) / spacing) + 2
    const rows = Math.ceil((typeof window !== 'undefined' ? window.innerHeight : 800) / spacing) + 2

    // Wave parameters
    const waveAmplitude = 20
    const waveFrequency = 0.02
    const waveSpeed = 2

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Base duration with some variation
        const duration = 8 + Math.random() * 4
        const opacity = 0.2 + Math.random() * 0.3
        const size = 0.8 + Math.random() * 0.4
        
        // Wave-based animation parameters
        const baseX = i * spacing
        const baseY = j * spacing
        
        // Create phase offset for wave effect
        const phaseOffsetX = i * waveFrequency
        const phaseOffsetY = j * waveFrequency
        const timeOffset = (i + j) * 0.1
        
        const wave1X = Math.sin(phaseOffsetX + timeOffset * waveSpeed) * waveAmplitude
        const wave1Y = Math.cos(phaseOffsetY + timeOffset * waveSpeed) * waveAmplitude * 0.7
        
        const wave2X = Math.sin(phaseOffsetX + timeOffset * waveSpeed + Math.PI / 2) * waveAmplitude * 1.2
        const wave2Y = Math.cos(phaseOffsetY + timeOffset * waveSpeed + Math.PI / 2) * waveAmplitude * 0.8
        
        const wave3X = Math.sin(phaseOffsetX + timeOffset * waveSpeed + Math.PI) * waveAmplitude * 0.9
        const wave3Y = Math.cos(phaseOffsetY + timeOffset * waveSpeed + Math.PI) * waveAmplitude * 1.1
        
        const wave4X = Math.sin(phaseOffsetX + timeOffset * waveSpeed + Math.PI * 1.5) * waveAmplitude * 1.1
        const wave4Y = Math.cos(phaseOffsetY + timeOffset * waveSpeed + Math.PI * 1.5) * waveAmplitude * 0.6
        
        // Scale variations for breathing effect
        const scale1 = size * (0.95 + Math.sin(timeOffset) * 0.1)
        const scale2 = size * (1.05 + Math.cos(timeOffset + Math.PI / 3) * 0.15)
        const scale3 = size * (0.9 + Math.sin(timeOffset + Math.PI / 2) * 0.2)
        const scale4 = size * (1.0 + Math.cos(timeOffset + Math.PI) * 0.1)
        
        // Opacity variations
        const opacity1 = Math.max(0.1, opacity + Math.sin(timeOffset) * 0.2)
        const opacity2 = Math.max(0.05, opacity + Math.cos(timeOffset + Math.PI / 4) * 0.25)
        const opacity3 = Math.max(0.1, opacity + Math.sin(timeOffset + Math.PI / 2) * 0.15)
        const opacity4 = Math.max(0.1, opacity + Math.cos(timeOffset + Math.PI * 0.75) * 0.2)

        dotArray.push({
          id: `${i}-${j}`,
          x: baseX + (Math.random() - 0.5) * 5,
          y: baseY + (Math.random() - 0.5) * 5,
          delay: 0,
          duration,
          opacity,
          size,
          // Store pre-calculated wave animation values
          animation: {
            wave1X, wave1Y, wave2X, wave2Y, wave3X, wave3Y, wave4X, wave4Y,
            scale1, scale2, scale3, scale4,
            opacity1, opacity2, opacity3, opacity4
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

      // Wave parameters
      const waveAmplitude = 20
      const waveFrequency = 0.02
      const waveSpeed = 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const duration = 8 + Math.random() * 4
          const opacity = 0.2 + Math.random() * 0.3
          const size = 0.8 + Math.random() * 0.4
          
          const baseX = i * spacing
          const baseY = j * spacing
          
          const phaseOffsetX = i * waveFrequency
          const phaseOffsetY = j * waveFrequency
          const timeOffset = (i + j) * 0.1
          
          // Wave calculations
          const wave1X = Math.sin(phaseOffsetX + timeOffset * waveSpeed) * waveAmplitude
          const wave1Y = Math.cos(phaseOffsetY + timeOffset * waveSpeed) * waveAmplitude * 0.7
          
          const wave2X = Math.sin(phaseOffsetX + timeOffset * waveSpeed + Math.PI / 2) * waveAmplitude * 1.2
          const wave2Y = Math.cos(phaseOffsetY + timeOffset * waveSpeed + Math.PI / 2) * waveAmplitude * 0.8
          
          const wave3X = Math.sin(phaseOffsetX + timeOffset * waveSpeed + Math.PI) * waveAmplitude * 0.9
          const wave3Y = Math.cos(phaseOffsetY + timeOffset * waveSpeed + Math.PI) * waveAmplitude * 1.1
          
          const wave4X = Math.sin(phaseOffsetX + timeOffset * waveSpeed + Math.PI * 1.5) * waveAmplitude * 1.1
          const wave4Y = Math.cos(phaseOffsetY + timeOffset * waveSpeed + Math.PI * 1.5) * waveAmplitude * 0.6
          
          const scale1 = size * (0.95 + Math.sin(timeOffset) * 0.1)
          const scale2 = size * (1.05 + Math.cos(timeOffset + Math.PI / 3) * 0.15)
          const scale3 = size * (0.9 + Math.sin(timeOffset + Math.PI / 2) * 0.2)
          const scale4 = size * (1.0 + Math.cos(timeOffset + Math.PI) * 0.1)
          
          const opacity1 = Math.max(0.1, opacity + Math.sin(timeOffset) * 0.2)
          const opacity2 = Math.max(0.05, opacity + Math.cos(timeOffset + Math.PI / 4) * 0.25)
          const opacity3 = Math.max(0.1, opacity + Math.sin(timeOffset + Math.PI / 2) * 0.15)
          const opacity4 = Math.max(0.1, opacity + Math.cos(timeOffset + Math.PI * 0.75) * 0.2)

          dotArray.push({
            id: `${i}-${j}`,
            x: baseX + (Math.random() - 0.5) * 5,
            y: baseY + (Math.random() - 0.5) * 5,
            delay: 0,
            duration,
            opacity,
            size,
            animation: {
              wave1X, wave1Y, wave2X, wave2Y, wave3X, wave3Y, wave4X, wave4Y,
              scale1, scale2, scale3, scale4,
              opacity1, opacity2, opacity3, opacity4
            }
          })
        }
      }
      setDots(dotArray)
    }

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
            animation: `waveFloat-${dot.id} ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`
          }}
        />
      ))}
      
      <style>{`
        ${dots.map(dot => `
          @keyframes waveFloat-${dot.id} {
            0% { 
              transform: translate(0, 0) scale(${dot.size});
              opacity: ${dot.opacity};
            }
            25% { 
              transform: translate(${dot.animation.wave1X}px, ${dot.animation.wave1Y}px) scale(${dot.animation.scale1});
              opacity: ${dot.animation.opacity1};
            }
            50% { 
              transform: translate(${dot.animation.wave2X}px, ${dot.animation.wave2Y}px) scale(${dot.animation.scale2});
              opacity: ${dot.animation.opacity2};
            }
            75% { 
              transform: translate(${dot.animation.wave3X}px, ${dot.animation.wave3Y}px) scale(${dot.animation.scale3});
              opacity: ${dot.animation.opacity3};
            }
            100% { 
              transform: translate(${dot.animation.wave4X}px, ${dot.animation.wave4Y}px) scale(${dot.animation.scale4});
              opacity: ${dot.animation.opacity4};
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
      
      <RandomFloatingDots />
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700 relative z-10">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5 text-center">
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