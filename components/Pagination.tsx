import { useTranslation } from '@/lib/i18n'

interface Props {
  totalPages: number
  currentPage: number
  onPageChange?: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onPageChange }: Props) {
  const { t } = useTranslation()
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  const handlePrevPage = () => {
    if (prevPage && onPageChange) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (nextPage && onPageChange) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between items-center">
        {!prevPage && (
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!prevPage}
          >
            {t('pagination.previous')}
          </button>
        )}
        {prevPage && (
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {t('pagination.previous')}
          </button>
        )}
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {currentPage} {t('pagination.of')} {totalPages}
        </span>
        {!nextPage && (
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!nextPage}
          >
            {t('pagination.next')}
          </button>
        )}
        {nextPage && (
          <button
            onClick={handleNextPage}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {t('pagination.next')}
          </button>
        )}
      </nav>
    </div>
  )
}
