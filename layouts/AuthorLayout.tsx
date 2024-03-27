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
      className="text-black p-4 rounded-lg mt-[50px]"
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <span className="text-gray-600">
        Hi there👋 欢迎来到我的空间👀,在下方👇输入命令交互🔥,更多有意思命令即将开放🥳
      </span>
      <div className="mb-4 mt-[50px]">
        {output.map((line, index) => {
          if (line.type === 'command') {
            return (
              <div key={index} className="whitespace-pre-wrap flex items-start">
                <span className="text-green-500 text-lg mr-2">❯</span>
                <span className="command-text text-gray-600">{line.text}</span>
              </div>
            )
          } else {
            return (
              <div key={index} className="whitespace-pre-wrap pl-8">
                {line.text}
              </div>
            )
          }
        })}
        <div className="flex items-center">
          <span className="text-green-500 text-lg mr-2">❯</span>
          <form onSubmit={handleSubmit} className="flex-grow">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent text-gray-600"
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
            <div className="flex-grow text-gray-400">
              输入
              <span className="text-blue-500 font-bold"> help </span>查看更多命令
            </div>
          </div>
        )}

        <div ref={endOfOutputRef} />
      </div>
    </div>
  )
}

const AuthorLayout = ({ content }) => {
  const executeCommand = (command) => {
    switch (command.trim().toLowerCase()) {
      case 'about':
        return (
          <div className="py-8">
            <div className="container mx-auto mt-[10px] rounded-lg max-w-2xl">
              <p className="text-xl text-gray-300">
                我是
                <span className="bg-gradient-to-r from-red-600 to-black text-white px-2 py-1 rounded-md ml-1">
                  huccct
                </span>
                , 潜心研究前端黑魔法, 高中时期即开始探索
                <span className="text-red-500 font-semibold">JS</span>
                的奥秘, 至今仍在追寻
                <span className="text-red-500 font-semibold">JS</span>
                的无尽可能。
                <span className="text-red-500 font-semibold">JS</span>
                点亮了我的
                <span className="text-green-500 font-semibold">Coding</span>
                之路, 希望在这个
                <span className="text-blue-500 font-semibold">AI</span>
                时代,我能留下一些印记,在历史长河中闪烁微光。
              </p>
              <p className="text-xl mt-4 text-gray-300">
                我醉心于学习
                <span className="text-purple-500 font-semibold">新技术</span>, 撰写
                <span className="text-indigo-500 font-semibold">博客</span>,
                分享我的见解,希望能与志同道合者共勉。
              </p>
              <div className="flex items-center text-xl mt-4 text-gray-300">
                <span className="mr-2">常用技术栈✨:</span>
                <div className="flex items-center gap-2">
                  <img
                    className="w-7 h-7"
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/javascript.9kfy2qv56e.svg"
                    alt="JavaScript"
                  />
                  <img
                    className="w-7 h-7"
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/typescript.5tqshi69yv.svg"
                    alt="TypeScript"
                  />
                  <img
                    className="w-7 h-7"
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/vue.1755gt7qbc.svg"
                    alt="Vue"
                  />
                  <img
                    className="w-7 h-7"
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/react.67x88dektz.svg"
                    alt="React"
                  />
                  <img
                    className="w-7 h-7"
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/vite.58h4v7bto7.svg"
                    alt="Vite"
                  />
                  <img
                    className="w-7 h-7"
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/nodejs.839t0zr0fr.svg"
                    alt="Node.js"
                  />
                  <img
                    className="w-7 h-7"
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/nextjs.8hg8ruzbau.svg"
                    alt="Next.js"
                  />
                </div>
              </div>
              <div>
                <p className="text-xl mt-4 text-gray-300">你可以在这些地方找到我的踪迹:</p>
                <ul className="list-none text-gray-400 text-xl mt-2">
                  <li className="flex items-center mb-2">
                    <img
                      className="w-6 h-6 mr-2"
                      src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/github.es9z67r0u.svg"
                      alt="GitHub"
                    />
                    <a
                      href="https://github.com/huccct"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <span className="text-black font-semibold">GitHub</span>
                    </a>
                  </li>
                  <li className="flex items-center mb-2">
                    <img
                      className="w-6 h-6 mr-2"
                      src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/juejin.2a4ursk6mn.svg"
                      alt="Juejin"
                    />
                    <a
                      href="https://juejin.cn/user/4108202253747021"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <span className="text-blue-400 font-semibold">Juejin</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'clear':
        return []
      case 'projects':
        return <div>这里是我的一些项目...</div>
      case 'ls':
        return (
          <div className="font-mono text-xs p-4 rounded-lg">
            <div className="grid grid-cols-5 gap-4">
              <div className="py-2 px-4 rounded">about</div>
              <div className="py-2 px-4 rounded">projects</div>
              <div className="py-2 px-4 rounded">hello</div>
              <div className="py-2 px-4 rounded">contact</div>
              <div className="py-2 px-4 rounded">blog</div>
            </div>
          </div>
        )
      case 'contact':
        return (
          <>
            <div className="py-2 px-4 rounded">ucccth@gmail.com</div>
          </>
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
            <p className="text-lg font-semibold">
              You can enter the following commands to interact:
            </p>
            <div className="bg-gray-100 rounded-lg p-4">
              <pre className="text-sm font-mono">
                <span className="text-green-600">help</span>
                <span className="text-gray-600 ml-4">list all commands</span>
              </pre>
              <pre className="text-sm font-mono">
                <span className="text-green-600">clear</span>
                <span className="text-gray-600 ml-4">clear all outputs</span>
              </pre>
              <pre className="text-sm font-mono">
                <span className="text-green-600">about</span>
                <span className="text-gray-600 ml-4">some information about me</span>
              </pre>
              <pre className="text-sm font-mono">
                <span className="text-green-600">ls</span>
                <span className="text-gray-600 ml-4">
                  Listing the contents of the current directory
                </span>
              </pre>
              <pre className="text-sm font-mono">
                <span className="text-green-600">hello</span>
                <span className="text-gray-600 ml-4">hello world</span>
              </pre>
              <pre className="text-sm font-mono">
                <span className="text-green-600">contact</span>
                <span className="text-gray-600 ml-4">contact me</span>
              </pre>
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        About
      </h1>
      <CommandLineInterface executeCommand={executeCommand} />
    </div>
  )
}

export default AuthorLayout
