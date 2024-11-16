import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="inline-block text-sm text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors rounded px-2">
        <span className="mr-1">#</span>
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
