/* eslint-disable react/no-unknown-property */
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { GetServerSideProps } from 'next'
import { useTranslation } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { useState, useCallback } from 'react'
import type { ResumeData, ResumeProject } from '@/components/ResumePDF'

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

const SKILLS = {
  frontend: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Nest.js', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'MinIO'],
  devops: ['Git', 'Docker', 'Vercel', 'Nginx'],
  languages: ['Python', 'Java', 'C/C++'],
}

export default function Resume() {
  const { t, locale } = useTranslation()
  const [downloading, setDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    setDownloading(true)
    try {
      const [{ pdf }, { default: ResumePDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/components/ResumePDF'),
      ])

      const data: ResumeData = {
        about: t('resume.about.content'),
        experienceTitle: t('resume.experience.title'),
        experience: [
          { title: t('resume.experience.cofounder'), company: t('resume.experience.cofounderCompany'), date: t('resume.experience.cofounderDate'), desc: t('resume.experience.cofounderDesc') },
          { title: t('resume.experience.fullstack'), company: t('resume.experience.fullstackCompany'), date: t('resume.experience.fullstackDate'), desc: t('resume.experience.fullstackDesc') },
          { title: t('resume.experience.digitmaster'), company: t('resume.experience.digitmasterCompany'), date: t('resume.experience.digitmasterDate'), desc: t('resume.experience.digitmasterDesc') },
          { title: t('resume.experience.telepace'), company: t('resume.experience.telepaceCompany'), date: t('resume.experience.telepaceDate'), desc: t('resume.experience.telepaceDesc') },
          { title: t('resume.experience.kanjiangainian'), company: t('resume.experience.kanjiangainianCompany'), date: t('resume.experience.kanjiangainianDate'), desc: t('resume.experience.kanjiangainianDesc') },
          { title: t('resume.experience.yida'), company: t('resume.experience.yidaCompany'), date: t('resume.experience.yidaDate'), desc: t('resume.experience.yidaDesc') },
        ],
        projectsTitle: t('resume.projects.title'),
        projects: [
          { name: t('resume.projects.esDrager'), sub: t('resume.projects.esDragerSub'), link: t('resume.projects.esDragerLink'), desc: t('resume.projects.esDragerDesc') },
          { name: t('resume.projects.vtable'), sub: t('resume.projects.vtableSub'), link: t('resume.projects.vtableLink'), desc: t('resume.projects.vtableDesc') },
          { name: t('resume.projects.prohelen'), sub: t('resume.projects.prohelenSub'), link: t('resume.projects.prohelenLink'), desc: t('resume.projects.prohelenDesc') },
        ],
        projectsMoreLink: t('resume.projects.moreLink'),
        projectsMoreLabel: t('resume.projects.more'),
        educationTitle: t('resume.education.title'),
        education: [
          { degree: t('resume.education.msc'), school: t('resume.education.mscSchool') },
          { degree: t('resume.education.be'), school: t('resume.education.beSchool') },
        ],
        skillsTitle: t('resume.skills.title'),
        skills: {
          frontend: SKILLS.frontend,
          backend: SKILLS.backend,
          devops: SKILLS.devops,
          languages: SKILLS.languages,
          frontendLabel: t('resume.skills.frontend'),
          backendLabel: t('resume.skills.backend'),
          devopsLabel: t('resume.skills.devops'),
          languagesLabel: t('resume.skills.languages'),
        },
        languagesTitle: t('resume.languagesSection.title'),
        langs: [
          { name: t('resume.languagesSection.chinese'), level: t('resume.languagesSection.chineseLevel') },
          { name: t('resume.languagesSection.english'), level: t('resume.languagesSection.englishLevel') },
        ],
        awardsTitle: t('resume.awards.title'),
        awards: [
          { title: t('resume.awards.outstanding'), org: t('resume.awards.outstandingOrg'), desc: t('resume.awards.outstandingDesc') },
          { title: t('resume.awards.scholarship'), org: t('resume.awards.scholarshipOrg'), desc: t('resume.awards.scholarshipDesc') },
        ],
      }

      const blob = await pdf(
        <ResumePDF
          data={data}
          email={siteMetadata.email}
          github={siteMetadata.github}
          linkedin={siteMetadata.linkedin}
          blog={siteMetadata.siteUrl}
          locale={locale}
        />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = locale === 'zh' ? 'Orion_Chen_Resume_CN.pdf' : 'Orion_Chen_Resume_EN.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setDownloading(false)
    }
  }, [t, locale])

  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />

      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        {/* Language switcher & PDF download - top right */}
        <div className="flex items-center justify-end gap-2 mb-8">
          <button
            aria-label="Download PDF"
            type="button"
            disabled={downloading}
            className="h-8 w-8 rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            onClick={handleDownload}
          >
            {downloading ? (
              <svg className="h-5 w-5 animate-spin text-gray-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <ArrowDownTrayIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            )}
          </button>
          <LanguageSwitcher />
        </div>

        {/* Header - Name & Contact */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {locale === 'zh' ? '陈图南' : 'Tunan Chen'}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('resume.about.content').replace(/<[^>]*>/g, '')}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
            <a href={`mailto:${siteMetadata.email}`} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              {siteMetadata.email}
            </a>
            <a href={siteMetadata.siteUrl} className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              Blog
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

          {/* Projects */}
          <section>
            <SectionTitle>{t('resume.projects.title')}</SectionTitle>
            <div className="space-y-5">
              {(['esDrager', 'vtable', 'prohelen'] as const).map((key) => (
                <Card key={key}>
                  <EntryHeader
                    title={t(`resume.projects.${key}`)}
                    sub={t(`resume.projects.${key}Sub`)}
                  />
                  <a
                    href={t(`resume.projects.${key}Link`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    {t(`resume.projects.${key}Link`)}
                  </a>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t(`resume.projects.${key}Desc`)}</p>
                </Card>
              ))}
            </div>
            <a
              href={t('resume.projects.moreLink')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-primary-500 hover:text-primary-600 transition-colors"
            >
              {t('resume.projects.more')} →
            </a>
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
              {(Object.keys(SKILLS) as (keyof typeof SKILLS)[]).map((key) => (
                <div key={key}>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t(`resume.skills.${key}`)}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {SKILLS[key].map((s) => (
                      <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
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
