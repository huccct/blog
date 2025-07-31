/* eslint-disable react/no-unknown-property */
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'


export default function Resume() {
  const lastUpdated = 'Jun 30, 2025'

  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute -top-[40rem] -left-[40rem] w-[120rem] h-[120rem] rounded-full bg-primary-200/20 dark:bg-primary-900/20 blur-[128px]"></div>
        <div className="absolute -bottom-[40rem] -right-[40rem] w-[120rem] h-[120rem] rounded-full bg-primary-200/20 dark:bg-primary-900/20 blur-[128px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Resume</h1>
            <span className="text-sm text-gray-500">Last Updated: {lastUpdated}</span>
          </div>

          {/* About */}
          <section>
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
              <p className="text-gray-600 dark:text-gray-400">
                My name is <span className='dark:text-gray-400 font-bold text-gray-600'>Orion</span>(<span className='dark:text-gray-400 font-bold text-gray-600'>Tunan</span>) Chen. I am a software engineer with a passion for web
                development. I have experience in both frontend and backend development, and I am
                always eager to learn new technologies. I am currently pursuing a master's degree in
                software engineering at the University of St. Andrews. I am looking for
                opportunities to work on exciting projects and contribute to the tech community.
                <br />
                <br />
                In my free time, I enjoy reading, hiking, and playing video games. I am also a big
                fan of open-source software and enjoy contributing to open-source projects. I am
                always looking for new challenges and opportunities to grow as a developer.
              </p>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <div className="flex items-center gap-4">
                  <img
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/st.andrews-logo.67x8bfkt75.webp"
                    alt="University of St. Andrews"
                    className="h-10 w-10 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium">MSc Software Engineering</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      University of St. Andrews, 2024-2025
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <div className="flex items-center gap-4">
                  <img
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/qit-logo.lvhxkjids.webp"
                    alt="QIT"
                    className="h-10 w-10 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium">BE Software Engineering</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Qingdao Institute of Technology, 2020-2024, GPA 4.03/5.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium mb-3">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'JavaScript',
                    'TypeScript',
                    'React',
                    'Vue',
                    'Next.js',
                    'Tailwind CSS',
                    'UnoCss',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium mb-3">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Spring Boot', 'MongoDB', 'Nginx', 'Docker', 'MySql', 'Nest.js'].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium mb-3">Devops</h3>
                <div className="flex flex-wrap gap-2">
                  {['Git'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Java', 'C/C++'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">Frontend Developer</h3>
                <p className="text-gray-600 dark:text-gray-400">DigitMaster AI</p>
                <p className="text-sm text-gray-500 mt-1">Dec 2024 - May 2025</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  - Worked as a frontend developer intern, developing AI chat interface using Vue.js and Unocss.
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">Frontend Developer</h3>
                <p className="text-gray-600 dark:text-gray-400">Telepace.AI</p>
                <p className="text-sm text-gray-500 mt-1">Sep 2024 - Feb 2025</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  - Worked as a frontend developer intern, building AI-powered survey platform using Next.js and Tailwind CSS.
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">Web Full Stack Development Intern</h3>
                <p className="text-gray-600 dark:text-gray-400">看见概念（上海）智能科技有限公司</p>
                <p className="text-sm text-gray-500 mt-1">Jul 2023 - Dec 2023</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  - Worked as a web full stack development intern, contributing to various web
                  development projects.
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">Frontend Intern</h3>
                <p className="text-gray-600 dark:text-gray-400">壹沓科技（上海）有限公司</p>
                <p className="text-sm text-gray-500 mt-1">Jul 2021 - Aug 2021</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  - Worked as a frontend intern, gaining hands-on experience in the frontend
                  department.
                </p>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">Chinese</h3>
                <p className="text-gray-600 dark:text-gray-400">Native</p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">English</h3>
                <p className="text-gray-600 dark:text-gray-400">Working Proficiency</p>
              </div>
            </div>
          </section>

          {/* Awards */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Awards</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">Outstanding Student</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Qingdao Institute of Technology, 2021
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  - Awarded as an outstanding student for academic excellence.
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">Subject Competition Scholarship</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Qingdao Institute of Technology, 2023
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  - Received a scholarship for outstanding performance in the subject competition.
                </p>
              </div>
            </div>
          </section>


        </div>
      </div>
    </>
  )
  }