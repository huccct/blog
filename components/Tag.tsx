import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold text-gray-600 mr-2 mb-2 hover:text-[#14b8a6] transition-colors duration-300">
        <span className="mr-1">#</span>
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
