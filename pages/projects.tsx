import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import Image from 'next/image'
import { WindowIcon, CubeIcon, CommandLineIcon, CodeBracketIcon, WrenchIcon } from '@heroicons/react/24/outline'

const iconMap = {
  app: WindowIcon,
  lib: CubeIcon,
  cli: CommandLineIcon,
  tool: WrenchIcon,
  default: CodeBracketIcon,
} as const

type ProjectType = keyof typeof iconMap | 'default'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase of my works and side projects (creator or contributor)
          </p>
        </div>

        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-100/30 via-primary-300/30 to-primary-500/30 dark:from-primary-900/20 dark:via-primary-700/20 dark:to-primary-600/20 -z-10 blur-3xl rounded-3xl"></div>

            {projectsData.map((project) => {
              // const Icon = iconMap[project.type as ProjectType] || iconMap.default
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
              className="group inline-flex items-center gap-2 px-8 py-3 text-sm font-medium transition-all duration-300 rounded-lg 
                bg-gray-100 text-gray-600 hover:bg-primary-500 hover:text-white
                dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-primary-500 dark:hover:text-white"
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
