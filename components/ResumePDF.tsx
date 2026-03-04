import { Document, Page, View, Text, Link, Font, StyleSheet } from '@react-pdf/renderer'
import type { ResumeData } from '@/types/resume'

Font.register({
  family: 'Noto Sans SC',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-400-normal.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-500-normal.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-700-normal.ttf',
      fontWeight: 700,
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Noto Sans SC',
    fontSize: 10,
    padding: '36 40',
    color: '#1a1a1a',
    lineHeight: 1.5,
  },
  header: { marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 700 },
  aboutText: { fontSize: 9, color: '#555', marginTop: 6 },
  contactRow: { flexDirection: 'row', gap: 12, marginTop: 6 },
  contactLink: { fontSize: 9, color: '#666', textDecoration: 'none' },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#888',
    marginBottom: 6,
    marginTop: 14,
    borderBottom: '0.5 solid #ddd',
    paddingBottom: 3,
  },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  entryTitle: { fontSize: 10, fontWeight: 500 },
  entrySub: { fontSize: 9, color: '#555' },
  entryDate: { fontSize: 9, color: '#888' },
  entryDesc: { fontSize: 9, color: '#444', marginTop: 2 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 4 },
  skillGroup: { width: '45%' },
  skillLabel: { fontSize: 9, fontWeight: 500, marginBottom: 2 },
  skillTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tag: {
    fontSize: 8,
    backgroundColor: '#f3f3f3',
    padding: '2 6',
    borderRadius: 2,
    color: '#555',
  },
  langRow: { flexDirection: 'row', gap: 24, marginTop: 4 },
  langItem: { fontSize: 9 },
  langLevel: { color: '#888' },
})

interface Props {
  data: ResumeData
  email: string
  github: string
  linkedin: string
  blog: string
  locale: string
}

const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '')

export default function ResumePDF({ data, email, github, linkedin, blog, locale }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{locale === 'zh' ? '陈图南' : 'Tunan Chen'}</Text>
          <Text style={styles.aboutText}>{stripHtml(data.about)}</Text>
          <View style={styles.contactRow}>
            <Link src={`mailto:${email}`} style={styles.contactLink}>
              {email}
            </Link>
            <Link src={blog} style={styles.contactLink}>
              Blog
            </Link>
            <Link src={github} style={styles.contactLink}>
              GitHub
            </Link>
            <Link src={linkedin} style={styles.contactLink}>
              LinkedIn
            </Link>
          </View>
        </View>

        {/* Experience */}
        <Text style={styles.sectionTitle}>{data.experienceTitle}</Text>
        {data.experience.map((e, i) => (
          <View key={i}>
            <View style={styles.entryRow}>
              <View>
                <Text style={styles.entryTitle}>{e.title}</Text>
                <Text style={styles.entrySub}>{e.company}</Text>
              </View>
              {e.date && <Text style={styles.entryDate}>{e.date}</Text>}
            </View>
            <Text style={styles.entryDesc}>{e.desc}</Text>
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionTitle}>{data.projectsTitle}</Text>
        {data.projects.map((p, i) => (
          <View key={i} style={{ marginTop: 4 }}>
            <Link src={p.link} style={{ ...styles.entryTitle, color: '#1a1a1a', textDecoration: 'none' }}>
              {p.name}
            </Link>
            <Text style={styles.entrySub}>{p.sub}</Text>
            <Text style={styles.entryDesc}>{p.desc}</Text>
          </View>
        ))}
        <Link src={data.projectsMoreLink} style={{ fontSize: 9, color: '#666', marginTop: 6, textDecoration: 'none' }}>
          {data.projectsMoreLabel} →
        </Link>

        {/* Education */}
        <Text style={styles.sectionTitle}>{data.educationTitle}</Text>
        {data.education.map((e, i) => (
          <View key={i} style={{ marginTop: 4 }}>
            <Text style={styles.entryTitle}>{e.degree}</Text>
            <Text style={styles.entrySub}>{e.school}</Text>
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>{data.skillsTitle}</Text>
        <View style={styles.skillsGrid}>
          {(['frontend', 'backend', 'devops', 'languages'] as const).map((key) => (
            <View key={key} style={styles.skillGroup}>
              <Text style={styles.skillLabel}>{data.skills[`${key}Label`]}</Text>
              <View style={styles.skillTags}>
                {data.skills[key].map((s) => (
                  <Text key={s} style={styles.tag}>
                    {s}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Languages */}
        <Text style={styles.sectionTitle}>{data.languagesTitle}</Text>
        <View style={styles.langRow}>
          {data.langs.map((l, i) => (
            <Text key={i} style={styles.langItem}>
              {l.name} <Text style={styles.langLevel}>-- {l.level}</Text>
            </Text>
          ))}
        </View>

        {/* Awards */}
        <Text style={styles.sectionTitle}>{data.awardsTitle}</Text>
        {data.awards.map((a, i) => (
          <View key={i} style={{ marginTop: 4 }}>
            <Text style={styles.entryTitle}>{a.title}</Text>
            <Text style={styles.entrySub}>{a.org}</Text>
            <Text style={styles.entryDesc}>{a.desc}</Text>
          </View>
        ))}
      </Page>
    </Document>
  )
}
