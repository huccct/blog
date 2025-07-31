import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import kebabCase from '@/lib/utils/kebabCase'
import { getAllTags } from '@/lib/utils/contentlayer'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'

// TODO: refactor into contentlayer once compute over all docs is enabled

export const getStaticProps: GetStaticProps<{ tags: Record<string, number> }> = async () => {
  const tags = await getAllTags(allBlogs)

  return { props: { tags } }
}

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tags</h1>
          </div>

          <div className="flex flex-wrap gap-4">
            {Object.keys(tags).length === 0 && 'No tags found.'}
            {sortedTags.map((t) => {
              return (
                <Link
                  key={t}
                  href={`/tags/${kebabCase(t)}`}
                  className="group flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <span className="text-primary-500 font-medium">#{t}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">({tags[t]})</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
