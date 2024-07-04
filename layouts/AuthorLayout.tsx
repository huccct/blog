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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="text-black p-4 rounded-lg mt-12 overflow-hidden"
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <span className="text-gray-600 text-sm whitespace-normal break-words">
        Hi there👋 Welcome to my space👀. Enter commands below👇 to interact🔥. More interesting
        commands coming soon🥳
      </span>
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
          <div className="py-24 px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-8 max-w-4xl mx-auto">
              <p className="animate-fade-in-up animate-delay-100 dark:text-white opacity-0">I'm</p>
              <p className="animate-fade-in-up animate-delay-200 opacity-0 dark:text-white ">
                a <span className="text-green-600">software developer</span>
              </p>
              <p className="animate-fade-in-up animate-delay-300 opacity-0 dark:text-white ">
                a <span className="text-green-600">passionate learner</span>
              </p>
              <p className="animate-fade-in-up animate-delay-400 opacity-0 dark:text-white ">
                and a <span className="text-green-600">tech enthusiast</span>
              </p>
            </div>
          </div>
        )
      case 'clear':
        return []
      case 'contact':
        return (
          <div className="text-gray-500">
            <p>
              📮 Email:
              <span className="text-blue-500">
                <span className="text-blue-500 font-semibold">ucccth@gmail.com</span>
              </span>
            </p>
          </div>
        )

      case 'ls':
        return (
          <div className="font-mono text-xs p-4 rounded-lg">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                className="text-2xl py-2 px-4 rounded text-gray-500 hover:cursor-pointer"
                onClick={navigateBlog}
              >
                blog
              </div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                className="text-2xl py-2 px-4 rounded text-gray-500 hover:cursor-pointer"
                onClick={navigateProjects}
              >
                projects
              </div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                className="text-2xl py-2 px-4 rounded text-gray-500 hover:cursor-pointer"
                onClick={navigateTags}
              >
                tags
              </div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                className="text-2xl py-2 px-4 rounded text-gray-500 hover:cursor-pointer"
                onClick={navigateAbout}
              >
                about
              </div>
            </div>
          </div>
        )
      case 'hello':
        return (
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
              Hello, World!
            </h1>
            <div className="text-gray-500 italic">
              <p>
                Enter <span className="text-green-600 font-semibold">help</span> to see available
                commands.
              </p>
            </div>
          </div>
        )
      case 'help':
        return (
          <div className="space-y-4">
            <p className="text-base sm:text-lg font-semibold text-gray-500">
              You can enter the following commands to interact:
            </p>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="overflow-auto">
                <pre className="text-xs sm:text-sm font-mono">
                  <code className="text-green-600">help</code>
                  <span className="text-gray-600 ml-4">list all commands</span>
                </pre>
                <pre className="text-xs sm:text-sm font-mono">
                  <code className="text-green-600">clear</code>
                  <span className="text-gray-600 ml-4">clear all outputs</span>
                </pre>
                <pre className="text-xs sm:text-sm font-mono">
                  <code className="text-green-600">about</code>
                  <span className="text-gray-600 ml-4">some information about me</span>
                </pre>
                <pre className="text-xs sm:text-sm font-mono">
                  <code className="text-green-600">ls</code>
                  <span className="text-gray-600 ml-4">
                    Listing the contents of the current directory
                  </span>
                </pre>
                <pre className="text-xs sm:text-sm font-mono">
                  <code className="text-green-600">hello</code>
                  <span className="text-gray-600 ml-4">hello world</span>
                </pre>
                <pre className="text-xs sm:text-sm font-mono">
                  <code className="text-green-600">contact</code>
                  <span className="text-gray-600 ml-4">contact me</span>
                </pre>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-red-500">
            command not found: <span className="text-red-500">{command}</span>
          </div>
        )
    }
  }

  return (
    <>
      <PageSEO title={`About - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About
        </h1>
        <CommandLineInterface executeCommand={executeCommand} />
      </div>
    </>
  )
}

export default AuthorLayout
