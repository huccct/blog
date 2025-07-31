import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { useState, useMemo } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import type { Blog } from 'contentlayer/generated'
import Pagination from '@/components/Pagination'

export const POSTS_PER_PAGE = 5

export const getStaticProps = async () => {
  const posts = sortedBlogPost(allBlogs)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  // Get all unique tags with counts
  const allTags = {}
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      allTags[tag] = (allTags[tag] || 0) + 1
    })
  })

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      posts: allCoreContent(posts),
      pagination,
      allTags,
    },
  }
}

export default function Blog({
  posts,

  allTags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  // Filter posts based on search and selected tags
  const filteredPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      const searchContent = post.title + post.summary + post.tags.join(' ')
      const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
      
      // Require ALL selected tags to be present in the post
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })

    return filtered
  }, [posts, searchValue, selectedTags])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const displayPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Sort tags by count
  const sortedTags = Object.entries(allTags)
    .sort(([,a], [,b]) => (b as number) - (a as number))

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Thoughts, stories and ideas about technology and life
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <input
                aria-label="Search articles"
                type="text"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search articles..."
                className="w-full rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-100 transition-colors"
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400"
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

            {/* Tags Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter by tags
                </h3>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sortedTags.map(([tag, count]) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                        : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                    }`}
                  >
                    #{tag} ({count})
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
              {selectedTags.length > 0 && ` for selected tags`}
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {!filteredPosts.length && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">No posts found.</p>
                {(searchValue || selectedTags.length > 0) && (
                  <button
                    onClick={() => {
                      setSearchValue('')
                      setSelectedTags([])
                    }}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
            
            {displayPosts.map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <Link key={slug} href={`/blog/${slug}`} className="block group">
                  <article className="rounded-xl p-6 border border-transparent transition-all hover:border-gray-200 dark:hover:border-gray-700 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm">
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(date)}
                      </time>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <div className="flex items-center flex-wrap gap-1">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
