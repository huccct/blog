/* eslint-disable react/no-unknown-property */
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { GetServerSideProps } from 'next'
import { useTranslation } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const allowedHosts = new Set(['resume.orionchen.me'])

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const host = (req?.headers?.host || '').split(':')[0].toLowerCase()
  const isLocalhost = host === 'localhost' || host === '127.0.0.1'

  if (!isLocalhost && !allowedHosts.has(host)) {
    return { notFound: true }
  }

  return { props: {} }
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
    {children}
  </h2>
)

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="py-2">{children}</div>
)

const EntryHeader = ({ title, sub, date }: { title: string; sub?: string; date?: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
    <div>
      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      {sub && <p className="text-sm text-gray-500 dark:text-gray-400">{sub}</p>}
    </div>
    {date && <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0">{date}</span>}
  </div>
)

export default function Resume() {
  const { t } = useTranslation()

  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />

      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        {/* Language switcher - top right */}
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        {/* Header - Name & Contact */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Orion (Tunan) Chen
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('resume.about.content').replace(/<[^>]*>/g, '')}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
            <a href={`mailto:${siteMetadata.email}`} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              {siteMetadata.email}
            </a>
            <a href={siteMetadata.github} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              GitHub
            </a>
            <a href={siteMetadata.linkedin} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              LinkedIn
            </a>
            <a href={siteMetadata.twitter} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              X / Twitter
            </a>
          </div>
        </header>

        <div className="space-y-10">
          {/* Experience */}
          <section>
            <SectionTitle>{t('resume.experience.title')}</SectionTitle>
            <div className="space-y-5">
              <Card>
                <EntryHeader title={t('resume.experience.cofounder')} sub={t('resume.experience.cofounderCompany')} date={t('resume.experience.cofounderDate')} />
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('resume.experience.cofounderDesc')}</p>
              </Card>
              <Card>
                <EntryHeader title={t('resume.experience.fullstack')} sub={t('resume.experience.fullstackCompany')} date={t('resume.experience.fullstackDate')} />
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('resume.experience.fullstackDesc')}</p>
              </Card>
              <Card>
                <EntryHeader title={t('resume.experience.digitmaster')} sub={t('resume.experience.digitmasterCompany')} date={t('resume.experience.digitmasterDate')} />
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('resume.experience.digitmasterDesc')}</p>
              </Card>
              <Card>
                <EntryHeader title={t('resume.experience.telepace')} sub={t('resume.experience.telepaceCompany')} date={t('resume.experience.telepaceDate')} />
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('resume.experience.telepaceDesc')}</p>
              </Card>
              <Card>
                <EntryHeader title={t('resume.experience.kanjiangainian')} sub={t('resume.experience.kanjiangainianCompany')} date={t('resume.experience.kanjiangainianDate')} />
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('resume.experience.kanjiangainianDesc')}</p>
              </Card>
              <Card>
                <EntryHeader title={t('resume.experience.yida')} sub={t('resume.experience.yidaCompany')} date={t('resume.experience.yidaDate')} />
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('resume.experience.yidaDesc')}</p>
              </Card>
            </div>
          </section>

          {/* Education */}
          <section>
            <SectionTitle>{t('resume.education.title')}</SectionTitle>
            <div className="space-y-5">
              <Card>
                <EntryHeader title={t('resume.education.msc')} sub={t('resume.education.mscSchool')} />
              </Card>
              <Card>
                <EntryHeader title={t('resume.education.be')} sub={t('resume.education.beSchool')} />
              </Card>
            </div>
          </section>

          {/* Skills */}
          <section>
            <SectionTitle>{t('resume.skills.title')}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('resume.skills.frontend')}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['JavaScript', 'TypeScript', 'React', 'Vue', 'Next.js', 'Tailwind CSS', 'UnoCss'].map((s) => (
                    <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('resume.skills.backend')}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Node.js', 'Spring Boot', 'MongoDB', 'Nginx', 'Docker', 'MySql', 'Nest.js'].map((s) => (
                    <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('resume.skills.devops')}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Git'].map((s) => (
                    <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('resume.skills.languages')}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'Java', 'C/C++'].map((s) => (
                    <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section>
            <SectionTitle>{t('resume.languagesSection.title')}</SectionTitle>
            <div className="flex gap-8 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">{t('resume.languagesSection.chinese')}</span>
                <span className="text-gray-500 dark:text-gray-400"> — {t('resume.languagesSection.chineseLevel')}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">{t('resume.languagesSection.english')}</span>
                <span className="text-gray-500 dark:text-gray-400"> — {t('resume.languagesSection.englishLevel')}</span>
              </div>
            </div>
          </section>

          {/* Awards */}
          <section>
            <SectionTitle>{t('resume.awards.title')}</SectionTitle>
            <div className="space-y-5">
              <Card>
                <EntryHeader title={t('resume.awards.outstanding')} sub={t('resume.awards.outstandingOrg')} />
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('resume.awards.outstandingDesc')}</p>
              </Card>
              <Card>
                <EntryHeader title={t('resume.awards.scholarship')} sub={t('resume.awards.scholarshipOrg')} />
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('resume.awards.scholarshipDesc')}</p>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
