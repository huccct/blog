/* eslint-disable react/display-name */
import React from 'react'
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'
import projectsData from '@/data/projectsData'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  line: {
    position: 'absolute',
    width: 4,
    height: '14px',
    backgroundColor: 'black',
    top: 3, // Adjust the top position to align with the text
    bottom: 0,
    left: -10,
    margin: 'auto',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  link: {
    fontSize: 12,
    color: 'blue',
    textDecoration: 'underline',
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    flexBasis: '48%',
  },
})

const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.text}>
          My name is Orion Chen. I am a software engineer with a passion for web development. I have
          experience in both frontend and backend development, and I am always eager to learn new
          technologies. I am currently pursuing a master's degree in software engineering at the
          University of St. Andrews. I am looking for opportunities to work on exciting projects and
          contribute to the tech community.
        </Text>
        <Text style={styles.text}>
          In my free time, I enjoy reading, hiking, and playing video games. I am also a big fan of
          open-source software and enjoy contributing to open-source projects. I am always looking
          for new challenges and opportunities to grow as a developer.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>Education</Text>
        <Text style={styles.subHeading}>MSc Software Engineering</Text>
        <Text style={styles.text}>University of St. Andrews, 2024-2025</Text>
        <Text style={styles.subHeading}>BE Software Engineering</Text>
        <Text style={styles.text}>Qingdao Institute of Technology, 2020-2024, GPA 4.03/5.00</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>Skills</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.subHeading}>Frontend</Text>
            <Text style={styles.listItem}>JavaScript (ES6+)</Text>
            <Text style={styles.listItem}>TypeScript</Text>
            <Text style={styles.listItem}>React</Text>
            <Text style={styles.listItem}>Vue</Text>
            <Text style={styles.listItem}>Next.js</Text>
            <Text style={styles.listItem}>Tailwind CSS</Text>
            <Text style={styles.listItem}>UnoCss</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.subHeading}>Backend</Text>
            <Text style={styles.listItem}>Node.js</Text>
            <Text style={styles.listItem}>Spring Boot</Text>
            <Text style={styles.listItem}>MongoDB</Text>
            <Text style={styles.listItem}>Nginx</Text>
            <Text style={styles.listItem}>Docker</Text>
            <Text style={styles.listItem}>MySql</Text>
            <Text style={styles.listItem}>Nest.js</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.subHeading}>Devops</Text>
            <Text style={styles.listItem}>Git</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.subHeading}>Languages</Text>
            <Text style={styles.listItem}>Python</Text>
            <Text style={styles.listItem}>Java</Text>
            <Text style={styles.listItem}>C/C++</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>Work Experience</Text>
        <Text style={styles.subHeading}>Frontend Intern</Text>
        <Text style={styles.text}>Yida Technology (Shanghai) Co., Ltd., Jul 2021 - Aug 2021</Text>
        <Text style={styles.text}>
          - Worked as a frontend intern, gaining hands-on experience in the frontend department.
        </Text>

        <Text style={styles.subHeading}>Web Full Stack Development Intern</Text>
        <Text style={styles.text}>
          Kanji Concept (Shanghai) Intelligent Technology Co., Ltd., Jul 2023 - Dec 2023
        </Text>
        <Text style={styles.text}>
          - Worked as a web full stack development intern, contributing to various web development
          projects.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>Languages</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.subHeading}>Chinese</Text>
            <Text style={styles.text}>Native</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.subHeading}>English</Text>
            <Text style={styles.text}>PTE: 61</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>Projects</Text>
        {projectsData.map((project, index) => (
          <View key={index} style={styles.section}>
            <Link src={project.href} style={styles.link}>
              <Text style={styles.subHeading}>{project.title}</Text>
            </Link>
            <Text style={styles.text}>{project.brief}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>Awards</Text>
        <Text style={styles.subHeading}>Outstanding Student</Text>
        <Text style={styles.text}>Qingdao Institute of Technology, 2021</Text>
        <Text style={styles.text}>
          - Awarded as an outstanding student for academic excellence.
        </Text>

        <Text style={styles.subHeading}>Subject Competition Scholarship</Text>
        <Text style={styles.text}>Qingdao Institute of Technology, 2023</Text>
        <Text style={styles.text}>
          - Received a scholarship for outstanding performance in the subject competition.
        </Text>
      </View>
    </Page>
  </Document>
)

export default ResumePDF
