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
  const terminalBodyRef = useRef(null)

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
        setTimeout(() => submitCommand(command), 500)
      }
    }

    setTimeout(typeCharacter, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (endOfOutputRef.current && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
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
      setShowHelpHint(false) 
    }
  }

  return (
    <div className="backdrop-blur-sm bg-white/10 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-900/50 w-full max-w-4xl mx-auto h-[480px] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-500 dark:text-gray-400 font-mono text-sm">
          Orion's Terminal
        </div>
      </div>

      <div className="p-4 border-b border-gray-200/50 dark:border-gray-800/50 flex-shrink-0">
        <div className="text-gray-600 dark:text-gray-400 font-mono text-sm space-y-1">
          <div className="typing-effect">Welcome to Orion's Terminal 1.0.0</div>
          <div className="typing-effect-delay-1">Type 'help' to see available commands</div>
        </div>
      </div>

      <div 
        ref={terminalBodyRef}
        className="flex-1 p-4 overflow-y-auto scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
        }}
      >
        <div className="space-y-2">
          {output.map((line, index) => {
            if (line.type === 'command') {
              return (
                <div key={index} className="flex items-center whitespace-normal break-words">
                  <span className="text-green-500 text-lg mr-2 flex-shrink-0 leading-none">❯</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm leading-none">{line.text}</span>
                </div>
              )
            } else {
              return (
                <div key={index} className="whitespace-normal break-words pl-6 text-sm mb-4">
                  {line.text}
                </div>
              )
            }
          })}
        </div>

        <div className="flex items-center mt-4">
          <span className="text-green-500 text-lg mr-2 flex-shrink-0 leading-none">❯</span>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent text-gray-600 dark:text-gray-400 text-sm focus:outline-none leading-none"
              style={{
                border: 'none',
                outline: 'none',
                borderBottom: 'none',
                boxShadow: 'none',
                height: '18px',
                padding: '0',
                lineHeight: '18px',
              }}
              placeholder="Type a command..."
            />
          </form>
        </div>

        {showHelpHint && (
          <div className="mt-2 pl-6">
            <div className="text-gray-400 dark:text-gray-500 text-xs">
              Type <span className="text-primary-500 font-bold">help</span> to see more commands
            </div>
          </div>
        )}

        <div ref={endOfOutputRef} />
      </div>
        
      <style>{`
        .terminal-body::-webkit-scrollbar {
          width: 6px;
        }
        .terminal-body::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        .terminal-body::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .terminal-body::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  )
}

const AuthorLayout = () => {
  const router = useRouter()
  const about =
    'A software engineer who loves building elegant solutions and exploring new technologies. Currently focused on web development and always learning something new 🚀'
  
  const navigateBlog = () => router.push('/blog')  
  const navigateProjects = () => router.push('/projects') 
  const navigateResume = () => router.push('/resume') 

  const executeCommand = (command) => {
    switch (command.trim().toLowerCase()) {
      case 'about':
        return (
          <div className="space-y-6">
            <p className="text-lg leading-relaxed border-l-4 border-primary-500 pl-6 py-2 bg-primary-50/50 dark:bg-primary-900/20">
              {about}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Tech Stack</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  TypeScript, React, Next.js, Node.js...
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Interests</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  AI, Web3, Web Development, UI Design, Open Source, Art...
                </p>
              </div>
            </div>
          </div>
        )
      case 'clear':
        return []

      case 'ls':
        return (
          <div className="font-mono p-4 rounded-lg space-y-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Directory contents:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: 'blog', icon: '📝', onClick: navigateBlog },
                { name: 'projects', icon: '🚀', onClick: navigateProjects },
                { name: 'Résumé', icon: '👤', onClick: navigateResume },
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
              {['Hello!', 'こんにちは!', '你好!', 'Bonjour!', 'Hola!', 'Ciao!', 'Guten Tag!', 'Olá!', 'Привет!', '안녕하세요!', 'Merhaba!', 'Namaste!', 'Salam!', 'Shalom!', 'Cześć!', 'Hej!', 'Hallo!', 'Ahoj!', 'Salut!', 'Hei!'].map((greeting, index) => (
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

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(1000)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-black dark:bg-white"
              style={{
                width: Math.random() * 2.5 + 'px',
                height: Math.random() * 2.5 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5,
                animation: `twinkle ${Math.random() * 4 + 2}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-[size:20px_20px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative">
        <CommandLineInterface executeCommand={executeCommand} />
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default AuthorLayout