import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import { WindowIcon, CubeIcon, CommandLineIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const iconMap = {
  app: WindowIcon,
  lib: CubeIcon,
  cli: CommandLineIcon,
  default: CodeBracketIcon,
}

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase of my works and side projects
          </p>
        </div>

        <div className="py-12">
          <div className="grid gap-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 to-primary-500/20 dark:from-primary-900/10 dark:to-primary-700/10 -z-10 blur-3xl rounded-3xl"></div>

            {projectsData.map((project) => {
              const Icon = iconMap[project.type] || iconMap.default
              return (
                <Link key={project.title} href={project.href} className="block">
                  <article className="group rounded-xl p-5 transition-all duration-200 hover:bg-white/60 dark:hover:bg-gray-800/50 backdrop-blur-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors duration-200" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors duration-200">
                          {project.title}
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="mt-4 flex items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400 group-hover:text-primary-500 transition-colors duration-200">
                            Learn more{' '}
                            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
