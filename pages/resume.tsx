import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import router from 'next/router'

export default function Resume() {
  const navigateProject = () => {
    router.push('/projects') // 使用 router.push 方法跳转到项目页
  }
  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Resume
            </h1>
          </div>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <div className="p-4 md:w-1/2">
              <h2 className="text-xl font-semibold">Education</h2>
              <div className="mt-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">MSc Software Engineering</h3>
                  <img
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/st.andrews-logo.67x8bfkt75.webp"
                    alt="University of St. Andrews"
                    className="h-10 w-10 ml-2"
                  />
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  University of St. Andrews, 2024-2025
                </p>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">BE Software Engineering</h3>
                  <img
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/qit-logo.lvhxkjids.webp"
                    alt="QIT"
                    className="h-10 w-10 ml-2"
                  />
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  青岛工学院, 2020-2024, GPA 4.03/5.00
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2">
              <h2 className="text-xl font-semibold">Skills</h2>
              <div className="mt-4">
                <ul className="list-disc list-inside">
                  <li>JavaScript (ES6+)</li>
                  <li>TypeScript</li>
                  <li>React</li>
                  <li>Vue</li>
                  <li>Next.js</li>
                  <li>Tailwind CSS</li>
                  <li>Vite</li>
                  <li>Unocss</li>
                  <li>Node.js</li>
                  <li>Git</li>
                </ul>
              </div>
            </div>
            <div className="p-4 md:w-1/2">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Frontend Intern</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  壹沓科技（上海）有限公司, Jul 2021 - Aug 2021
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  - Worked as a frontend intern, gaining hands-on experience in the frontend
                  department.
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Web Full Stack Development Intern</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  看见概念（上海）智能科技有限公司, Jul 2023 - Dec 2023
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  - Worked as a web full stack development intern, contributing to various web
                  development projects.
                </p>
              </div>
            </div>

            <div className="p-4 md:w-1/2">
              <h2 className="text-xl font-semibold">Projects</h2>
              <div className="mt-4">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                <p
                  className="text-gray-700 dark:text-gray-300 hover:cursor-pointer"
                  onClick={navigateProject}
                >
                  Detail (You can click here to view the project details.)
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2">
              <h2 className="text-xl font-semibold">Contact</h2>
              <div className="mt-4">
                <p className="text-gray-700 dark:text-gray-300">📮 Email: ucccth@gmail.com</p>
                <p className="text-gray-700 dark:text-gray-300">📱 WeChat: huccct</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
