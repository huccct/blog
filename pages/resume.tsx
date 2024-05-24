/* eslint-disable react/no-unknown-property */
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import projectsData from '@/data/projectsData'
import ResumePDF from '@/components/ResumePDF'
import { pdf } from '@react-pdf/renderer'

export default function Resume() {
  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Resume
          </h1>
        </div>
        <div className="container py-2">
          <div className="mt-4">
            <div className="mt-8">
              <h2 className="font-semibold mb-2 text-xl">About</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">
                My name is Orion Chen. I am a software engineer with a passion for web development.
                I have experience in both frontend and backend development, and I am always eager to
                learn new technologies. I am currently pursuing a master's degree in software
                engineering at the University of St. Andrews. I am looking for opportunities to work
                on exciting projects and contribute to the tech community.
                <br />
                <br />
                In my free time, I enjoy reading, hiking, and playing video games. I am also a big
                fan of open-source software and enjoy contributing to open-source projects. I am
                always looking for new challenges and opportunities to grow as a developer.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold mb-2 text-xl">Education</h2>
            <div className="flex items-center mt-4">
              <h3 className="text-lg font-medium">MSc Software Engineering</h3>
              <img
                src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/st.andrews-logo.67x8bfkt75.webp"
                alt="University of St. Andrews"
                className="h-10 w-10 ml-2"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300">University of St. Andrews, 2024-2025</p>
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
              Qingdao Institute of Technology, 2020-2024, GPA 4.03/5.00
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold">Frontend</h3>
                <ul className="list-disc list-inside">
                  <li>JavaScript (ES6+)</li>
                  <li>TypeScript</li>
                  <li>React</li>
                  <li>Vue</li>
                  <li>Next.js</li>
                  <li>Tailwind CSS</li>
                  <li>UnoCss</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Backend</h3>
                <ul className="list-disc list-inside">
                  <li>Node.js</li>
                  <li>Spring Boot</li>
                  <li>MongoDB</li>
                  <li>Nginx</li>
                  <li>Docker</li>
                  <li>MySql</li>
                  <li>Nest.js</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Devops</h3>
                <ul className="list-disc list-inside">
                  <li>Git</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Languages</h3>
                <ul className="list-disc list-inside">
                  <li>Python</li>
                  <li>Java</li>
                  <li>C/C++</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4">
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
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Languages</h2>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Chinese</h3>
                  <p className="text-gray-700 dark:text-gray-300">Native</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">English</h3>
                  <p className="text-gray-700 dark:text-gray-300">PTE: 61</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="mt-4">
              <div className="timeline">
                {projectsData.map((project, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-item-content">
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        <h3 className="text-lg font-semibold dark:text-black">{project.title}</h3>
                      </a>
                      <p className="text-gray-600 dark:text-black">{project.brief}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Awards</h2>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Outstanding Student</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Qingdao Institute of Technology, 2021
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                - Awarded as an outstanding student for academic excellence.
              </p>
              <h3 className="text-lg font-medium">Subject Competition Scholarship</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Qingdao Institute of Technology, 2023
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                - Received a scholarship for outstanding performance in the subject competition.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <a
          className="bg-black text-white font-bold py-2 px-4 rounded dark:text-black dark:bg-white"
          href="/static/pdf/resume.pdf"
          target="_blank"
        >
          PDF Version
        </a>
      </div>
      <style jsx>{`
        .timeline {
          position: relative;
          padding: 20px 0 20px 30px;
        }

        .timeline:before {
          content: '';
          position: absolute;
          top: 0;
          left: 15px;
          height: 100%;
          width: 2px;
          background-color: #e8e8e8;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }

        .timeline-item:before {
          content: '';
          position: absolute;
          top: 6px;
          left: -19px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #000;
          border: 2px solid #fff;
          z-index: 1;
        }

        .timeline-item-content {
          padding: 10px 15px;
          border-radius: 4px;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .timeline-item-content h3 {
          margin-bottom: 5px;
        }
      `}</style>
    </>
  )
}
