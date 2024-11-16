import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
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

      {/* 添加背景装饰 */}
      <div className="fixed inset-0 -z-10">
        {/* 渐变网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        {/* 主光晕 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary-100/30 via-primary-300/10 to-transparent dark:from-primary-900/20 dark:via-primary-800/5 blur-3xl"></div>
        {/* 装饰光晕 */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-200/20 dark:bg-primary-800/10 blur-3xl"></div>
      </div>

      <div className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Latest</h1>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-400">
            {siteMetadata.description}
          </p>
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
