import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

const CommandLineInterface = ({ executeCommand }) => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState([])
  const inputRef = useRef(null)
  const [showHelpHint, setShowHelpHint] = useState(false)
  const endOfOutputRef = useRef(null)

  // 在组件加载后自动键入 'about' 并执行该命令
  useEffect(() => {
    inputRef.current.focus()
    const command = 'about'
    let index = 0

    const typeCharacter = () => {
      if (index < command.length) {
        setInput((prevInput) => prevInput + command[index])
        index++
        setTimeout(typeCharacter, 100)
        setShowHelpHint(true)
      } else {
        // 命令全部键入后,模拟回车执行命令
        setTimeout(() => submitCommand(command), 500)
      }
    }

    setTimeout(typeCharacter, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (endOfOutputRef.current) {
      endOfOutputRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [output])

  const handleSubmit = (event) => {
    event.preventDefault()
    submitCommand(input)
  }

  const submitCommand = (command) => {
    if (command.trim().toLowerCase() === 'clear') {
      setOutput([])
    } else {
      const result = executeCommand(command)
      setOutput((prevOutput) => [
        ...prevOutput,
        { type: 'command', text: command },
        { type: 'result', text: result },
      ])
    }
    setInput('')
    if (command.trim().toLowerCase() !== 'about') {
      setShowHelpHint(false) // 在非 'about' 命令后不显示提示
    }
  }

  return (
    <div className="backdrop-blur-sm bg-white/10 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900/50">
      <div className="flex items-center mb-4 space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>

      <div className="text-gray-600 dark:text-gray-400 font-mono text-sm space-y-1 mb-6">
        <div className="typing-effect">Welcome to Orion's Terminal 1.0.0</div>
        <div className="typing-effect-delay-1">Type 'help' to see available commands</div>
      </div>

      <div className="mb-4 mt-12">
        {output.map((line, index) => {
          if (line.type === 'command') {
            return (
              <div key={index} className="flex whitespace-normal break-words items-center">
                <span className="text-green-500 text-lg mr-2">❯</span>
                <span className="text-gray-600 text-sm">{line.text}</span>
              </div>
            )
          } else {
            return (
              <div key={index} className="whitespace-normal break-words pl-6 text-sm">
                {line.text}
              </div>
            )
          }
        })}
        <div className="flex items-center">
          <span className="text-green-500 text-lg mr-2">❯</span>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent text-gray-600 text-sm focus:outline-none"
              style={{
                border: 'none',
                outline: 'none',
                borderBottom: 'none',
                boxShadow: 'none',
                height: '24px',
                padding: '0',
              }}
            />
          </form>
        </div>
        {showHelpHint && (
          <div className="flex items-center mt-2">
            <div className="flex-grow text-gray-400 text-xs break-words">
              Type <span className="text-blue-500 font-bold">help</span> to see more commands{' '}
            </div>
          </div>
        )}

        <div ref={endOfOutputRef} />
      </div>
    </div>
  )
}

const AuthorLayout = () => {
  const router = useRouter()
  const about =
    'A software engineer who loves building elegant solutions and exploring new technologies. Currently focused on web development and always learning something new 🚀'
  const navigateBlog = () => {
    router.push('/blog') // 使用 router.push 方法跳转到主页
  }
  const navigateProjects = () => {
    router.push('/projects') // 使用 router.push 方法跳转到项目页
  }

  const navigateTags = () => {
    router.push('/tags') // 使用 router.push 方法跳转到标签页
  }

  const navigateAbout = () => {
    router.push('/about') // 使用 router.push 方法跳转到联系页
  }

  const executeCommand = (command) => {
    switch (command.trim().toLowerCase()) {
      case 'about':
        return (
          <div className="space-y-6">
            <p className="text-lg leading-relaxed border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/50 dark:bg-blue-900/20">
              {about}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Tech Stack</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  AI,TypeScript, React, Next.js, Node.js...
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Interests</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Web Development, UI Design, Open Source, Art...
                </p>
              </div>
            </div>
          </div>
        )
      case 'clear':
        return []
      case 'contact':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  type: 'Email',
                  value: 'ucccth@gmail.com',
                  icon: '📮',
                  link: 'mailto:ucccth@gmail.com',
                },
                { type: 'GitHub', value: 'huccct', icon: '💻', link: 'https://github.com/huccct' },
                {
                  type: 'LinkedIn',
                  value: 'Tunan Chen',
                  icon: '💼',
                  link: 'https://www.linkedin.com/in/tunan-orion-chen-720627283',
                },
                { type: 'X', value: '@ucccth', icon: '🐦', link: 'https://twitter.com/ucccth' },
              ].map(({ type, value, icon, link }) => (
                <a
                  key={type}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 
                           border border-gray-200/50 dark:border-gray-700/50 
                           hover:bg-gray-100 dark:hover:bg-gray-700/50 
                           transform transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {icon}
                    </span>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{type}</div>
                      <div className="text-gray-900 dark:text-gray-100 font-medium">{value}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )

      case 'ls':
        return (
          <div className="font-mono p-4 rounded-lg space-y-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Directory contents:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: 'blog', icon: '📝', onClick: navigateBlog },
                { name: 'projects', icon: '🚀', onClick: navigateProjects },
                { name: 'tags', icon: '🏷️', onClick: navigateTags },
                { name: 'about', icon: '👤', onClick: navigateAbout },
              ].map(({ name, icon, onClick }) => (
                <div
                  key={name}
                  onClick={onClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onClick()}
                  className="group flex items-center gap-2 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 
                           border border-gray-200/50 dark:border-gray-700/50 
                           hover:bg-gray-100 dark:hover:bg-gray-700/50 
                           hover:scale-105 transform transition-all duration-200 cursor-pointer"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'hello':
        return (
          <div className="space-y-4">
            <div className="text-4xl font-bold space-y-2">
              {['Hello!', 'こんにちは!', '你好!', 'Bonjour!'].map((greeting, index) => (
                <div
                  key={greeting}
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.5}s`,
                    opacity: 0,
                    animation: `fadeInUp 0.5s ease-out ${index * 0.5}s forwards`,
                  }}
                >
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    {greeting}
                  </span>
                </div>
              ))}
            </div>

            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
        )
      case 'help':
        return (
          <div className="space-y-6">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Available commands:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { cmd: 'help', desc: 'List all commands', icon: '❓' },
                { cmd: 'clear', desc: 'Clear terminal', icon: '🧹' },
                { cmd: 'about', desc: 'About me', icon: '👨‍💻' },
                { cmd: 'ls', desc: 'List directory contents', icon: '📁' },
                { cmd: 'hello', desc: 'Say hello', icon: '👋' },
                { cmd: 'contact', desc: 'Contact information', icon: '📧' },
              ].map(({ cmd, desc, icon }) => (
                <div
                  key={cmd}
                  className="group p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm 
                                border border-gray-200 dark:border-gray-700 
                                transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <code className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
                        {cmd}
                      </code>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
            <span className="text-red-600 dark:text-red-400 font-mono">Command not found: </span>
            <code className="text-red-700 dark:text-red-300 font-bold">{command}</code>
          </div>
        )
    }
  }

  return (
    <>
      <PageSEO title={`About - ${siteMetadata.author}`} description={siteMetadata.description} />

      {/* 动态背景 */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* 左上角装饰 */}
        <div className="absolute -top-4 -left-4 w-32 h-32 animate-grow-slow">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full fill-emerald-100/20 dark:fill-emerald-900/20"
          >
            <path d="M0,50 Q25,25 50,50 T100,50 Q75,75 50,50 T0,50" />
            <path d="M50,0 Q75,25 50,50 T50,100 Q25,75 50,50 T50,0" />
          </svg>
        </div>

        {/* 右下角装饰 */}
        <div className="absolute -bottom-4 -right-4 w-40 h-40 animate-grow-slow-delayed">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full fill-emerald-100/20 dark:fill-emerald-900/20"
          >
            <path d="M0,50 Q25,25 50,50 T100,50 Q75,75 50,50 T0,50" />
            <path d="M50,0 Q75,25 50,50 T50,100 Q25,75 50,50 T50,0" />
          </svg>
        </div>

        {/* 鼠标跟随光晕 */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(16, 185, 129, 0.1), transparent 80%)',
            opacity: 1,
          }}
        />
      </div>

      {/* 修改 CommandLineInterface 组件的容器样式 */}
      <div className="container mx-auto px-4 py-16 relative">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 hover:scale-105 transition-transform cursor-pointer">
          About
        </h1>
        <div className="mt-8 transform-gpu">
          <CommandLineInterface executeCommand={executeCommand} />
        </div>
      </div>

      {/* 鼠标跟随效果脚本 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('mousemove', (e) => {
              document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
              document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
            });
          `,
        }}
      />
    </>
  )
}

export default AuthorLayout
