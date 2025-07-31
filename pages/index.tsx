import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'

const MAX_DISPLAY = 5

export const getStaticProps = async () => {
  // TODO: move computation to get only the essential frontmatter to contentlayer.config
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />



      <div className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
        <div className="py-8 text-center">
          <blockquote className="text-xl md:text-2xl font-serif italic text-gray-800 dark:text-gray-200 leading-relaxed">
            "Excellence in any department can be attained only by the labor of a lifetime; it is not to be purchased at a lesser price."
          </blockquote>
          <div className="mt-4 text-sm font-mono text-gray-600 dark:text-gray-400">
            — Samuel Johnson
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Latest</h1>
        </div>

        <div className="space-y-4 py-4">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <Link key={slug} href={`/blog/${slug}`} className="block group">
                <article className="rounded-xl p-4 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm">
                  <div className="flex items-center flex-wrap">
                    <time dateTime={date} className="shrink-0 text-gray-500 dark:text-gray-400">
                      {formatDate(date)}
                    </time>
                    <span className="mx-2 shrink-0 text-gray-300 dark:text-gray-600">•</span>
                    <div className="flex items-baseline flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
                      {title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{summary}</p>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 rounded-full border border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm"
          >
            All Posts <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      )}
    </>
  )
}
