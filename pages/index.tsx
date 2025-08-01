import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  return { props: { author } }
}

export default function Home({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <div className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
        <div className="py-4 text-center">
          <blockquote className="text-xl md:text-2xl font-serif italic text-gray-800 dark:text-gray-200 leading-relaxed">
            "Excellence in any department can be attained only by the labor of a lifetime; it is not to be purchased at a lesser price."
          </blockquote>
          <div className="mt-4 text-sm font-mono text-gray-600 dark:text-gray-400">
            — Samuel Johnson
          </div>
        </div>
      </div>

      <MDXLayoutRenderer layout={author.layout || DEFAULT_LAYOUT} content={author} />
    </>
  )
}
