import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { useState, useMemo, } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import type { Blog } from 'contentlayer/generated'
import ScrollToTop from '@/components/ScrollToTop'
import ParticleBackground from '@/components/ParticleBackground'
import { useTranslation } from '@/lib/i18n'

export const POSTS_PER_PAGE = 5

export const getStaticProps = async () => {
  const posts = sortedBlogPost(allBlogs)

  // Get all unique tags with counts
  const allTags = {}
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      allTags[tag] = (allTags[tag] || 0) + 1
    })
  })

  return {
    props: {
      posts: allCoreContent(posts),
      allTags,
    },
  }
}

interface TimelineData {
  [year: string]: {
    [month: string]: Blog[]
  }
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]



export default function Blog({
  posts,
  allTags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set())
  const { t } = useTranslation()

  // Filter posts based on search and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const searchContent = post.title + post.summary + post.tags.join(' ')
      const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
  }, [posts, searchValue, selectedTags])

  // Group posts by year and month
  const timelineData = useMemo(() => {
    const grouped: TimelineData = {}
    
    filteredPosts.forEach((post) => {
      const date = new Date(post.date)
      const year = date.getFullYear().toString()
      const month = (date.getMonth() + 1).toString()
      
      if (!grouped[year]) {
        grouped[year] = {}
      }
      if (!grouped[year][month]) {
        grouped[year][month] = []
      }
      grouped[year][month].push(post as Blog)
    })
    
    return grouped
  }, [filteredPosts])

  // Sort years in descending order
  const sortedYears = Object.keys(timelineData).sort((a, b) => parseInt(b) - parseInt(a))

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Handle year expansion
  const toggleYear = (year: string) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev)
      if (newSet.has(year)) {
        newSet.delete(year)
      } else {
        newSet.add(year)
      }
      return newSet
    })
  }

  // Sort tags by count
  const sortedTags = Object.entries(allTags)
    .sort(([,a], [,b]) => (b as number) - (a as number))

  // Get total posts count
  const totalPosts = filteredPosts.length

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      
      <ParticleBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('blog.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('blog.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                aria-label={t('blog.searchPlaceholder')}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t('blog.searchPlaceholder')}
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

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('blog.filterByTags')}
                </h3>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {t('blog.clearAll')}
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

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {totalPosts === 1 ? t('blog.postsFound', { count: totalPosts }) : t('blog.postsFoundPlural', { count: totalPosts })}
                {selectedTags.length > 0 && t('blog.forSelectedTags')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setExpandedYears(new Set(sortedYears))}
                  className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('blog.expandAll')}
                </button>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <button
                  onClick={() => setExpandedYears(new Set())}
                  className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('blog.collapseAll')}
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-gray-300 dark:to-gray-600"></div>
            
            <div className="space-y-8">
              {!totalPosts && (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{t('blog.noPostsFound')}</p>
                  {(searchValue || selectedTags.length > 0) && (
                    <button
                      onClick={() => {
                        setSearchValue('')
                        setSelectedTags([])
                      }}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {t('blog.clearFilters')}
                    </button>
                  )}
                </div>
              )}

              {sortedYears.map((year) => {
                const yearData = timelineData[year]
                const yearPostCount = Object.values(yearData).flat().length
                const isExpanded = expandedYears.has(year)
                
                return (
                  <div key={year} className="relative">
                    <div className="relative flex items-center mb-6">
                      <div className="absolute left-4 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg transform -translate-x-1/2"></div>
                      <button
                        onClick={() => toggleYear(year)}
                        className="ml-12 flex items-center gap-3 group"
                      >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
                          {year}
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                          {yearPostCount} post{yearPostCount !== 1 ? 's' : ''}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="ml-12 space-y-6">
                        {Object.keys(yearData)
                          .sort((a, b) => parseInt(b) - parseInt(a))
                          .map((month) => {
                            const monthPosts = yearData[month]
                            const monthName = MONTH_NAMES[parseInt(month) - 1]
                            
                            return (
                              <div key={`${year}-${month}`} className="relative">
                                <div className="relative flex items-center mb-4">
                                  <div className="absolute left-4 w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full border-2 border-white dark:border-gray-900 transform -translate-x-1/2"></div>
                                  <h3 className="ml-12 text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    {monthName} ({monthPosts.length} post{monthPosts.length !== 1 ? 's' : ''})
                                  </h3>
                                </div>

                                <div className="ml-12 space-y-4">
                                  {monthPosts.map((post) => {
                                    const { slug, date, title, summary, tags } = post
                                    return (
                                      <Link key={slug} href={`/blog/${slug}`} className="block group">
                                        <article className="rounded-xl p-4 border border-transparent transition-all hover:border-gray-200 dark:hover:border-gray-700 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm">
                                          <div className="flex items-center flex-wrap gap-2 mb-2">
                                            <time dateTime={date} className="text-xs text-gray-500 dark:text-gray-400">
                                              {formatDate(date)}
                                            </time>
                                            <span className="text-gray-300 dark:text-gray-600">•</span>
                                            <div className="flex items-center flex-wrap gap-1">
                                              {tags.slice(0, 3).map((tag) => (
                                                <Tag key={tag} text={tag} />
                                              ))}
                                              {tags.length > 3 && (
                                                <span className="text-xs text-gray-400">+{tags.length - 3}</span>
                                              )}
                                            </div>
                                          </div>
                                          <div className="space-y-1">
                                            <h4 className="text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors line-clamp-1">
                                              {title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{summary}</p>
                                          </div>
                                        </article>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      <ScrollToTop />
    </>
  )
}