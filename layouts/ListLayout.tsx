import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { ComponentProps, useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface Props {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute top-0 -left-4 w-3/4 h-full bg-gradient-to-br from-primary-100/20 via-primary-200/10 to-transparent dark:from-primary-900/20 dark:via-primary-800/10 blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
            <div className="relative">
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="w-full rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-100 transition-colors"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            {!filteredBlogPosts.length && (
              <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
            )}
            {displayPosts.map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <Link key={slug} href={`/blog/${slug}`} className="block group">
                  <article className="rounded-xl p-4 border border-transparent transition-all hover:border-gray-200 dark:hover:border-gray-700 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm">
                    <div className="flex items-center flex-wrap">
                      <time dateTime={date} className="shrink-0 text-gray-500 dark:text-gray-400">
                        {formatDate(date)}
                      </time>
                      <span className="mx-2 shrink-0 text-gray-300 dark:text-gray-600">•</span>
                      <div className="flex items-center flex-wrap gap-2">
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

          {pagination && pagination.totalPages > 1 && !searchValue && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
