import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="inline-block text-sm text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-800/40 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 rounded px-2 py-0.5 border border-transparent hover:border-primary-200 dark:hover:border-primary-700">
        <span className="mr-1">#</span>
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
