/* eslint-disable react/no-unknown-property */
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { GetServerSideProps } from 'next'
import { useTranslation } from '@/lib/i18n'

const allowedHosts = new Set(['resume.orionchen.me'])

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const host = (req?.headers?.host || '').split(':')[0].toLowerCase()
  const isLocalhost = host === 'localhost' || host === '127.0.0.1'

  if (!isLocalhost && !allowedHosts.has(host)) {
    return { notFound: true }
  }

  return { props: {} }
}

export default function Resume() {
  const lastUpdated = 'Jun 30, 2025'
  const { t } = useTranslation()

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
            <span className="text-sm text-gray-500">{t('resume.lastUpdated')}: {lastUpdated}</span>
          </div>

          {/* About */}
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('resume.about.title')}</h2>
            <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
              <p className="text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('resume.about.content') }} />
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('resume.education.title')}</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <div className="flex items-center gap-4">
                  <img
                    src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/st.andrews-logo.67x8bfkt75.webp"
                    alt="University of St. Andrews"
                    className="h-10 w-10 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{t('resume.education.msc')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('resume.education.mscSchool')}
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
                    <h3 className="text-lg font-medium">{t('resume.education.be')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('resume.education.beSchool')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('resume.skills.title')}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium mb-3">{t('resume.skills.frontend')}</h3>
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
                <h3 className="text-lg font-medium mb-3">{t('resume.skills.backend')}</h3>
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
                <h3 className="text-lg font-medium mb-3">{t('resume.skills.devops')}</h3>
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
                <h3 className="text-lg font-medium mb-3">{t('resume.skills.languages')}</h3>
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
            <h2 className="text-xl font-semibold mb-4">{t('resume.experience.title')}</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.experience.cofounder')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('resume.experience.cofounderCompany')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('resume.experience.cofounderDate')}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('resume.experience.cofounderDesc')}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.experience.fullstack')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('resume.experience.fullstackCompany')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('resume.experience.fullstackDate')}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('resume.experience.fullstackDesc')}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.experience.digitmaster')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('resume.experience.digitmasterCompany')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('resume.experience.digitmasterDate')}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('resume.experience.digitmasterDesc')}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.experience.telepace')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('resume.experience.telepaceCompany')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('resume.experience.telepaceDate')}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('resume.experience.telepaceDesc')}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.experience.kanjiangainian')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('resume.experience.kanjiangainianCompany')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('resume.experience.kanjiangainianDate')}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('resume.experience.kanjiangainianDesc')}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.experience.yida')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('resume.experience.yidaCompany')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('resume.experience.yidaDate')}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('resume.experience.yidaDesc')}
                </p>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('resume.languagesSection.title')}</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.languagesSection.chinese')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('resume.languagesSection.chineseLevel')}</p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.languagesSection.english')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('resume.languagesSection.englishLevel')}</p>
              </div>
            </div>
          </section>

          {/* Awards */}
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('resume.awards.title')}</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.awards.outstanding')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('resume.awards.outstandingOrg')}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('resume.awards.outstandingDesc')}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <h3 className="text-lg font-medium">{t('resume.awards.scholarship')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('resume.awards.scholarshipOrg')}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('resume.awards.scholarshipDesc')}
                </p>
              </div>
            </div>
          </section>


        </div>
      </div>
    </>
  )
  }
