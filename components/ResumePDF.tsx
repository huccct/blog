/* eslint-disable react/display-name */
import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer'
import projectsData from '@/data/projectsData'

Font.register({
  family: 'NotoSansSC',
  src: `/fonts/NotoSansSC-VariableFont_wght.ttf`,
})

Font.register({
  family: 'NotoSnsSC-Bold',
  src: `/fonts/NotoSansSC-Bold.ttf`,
})

Font.register({
  family: 'NotoSnsSC-Medium',
  src: `/fonts/NotoSansSC-Medium.ttf`,
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  line: {
    width: 4,
    height: 17, // 增加高度以确保线条足够长
    backgroundColor: 'black',
    position: 'absolute',
    left: 0, // 将线条放置在标题左边
    top: 5, // 确保线条的顶部与标题顶部对齐
  },
  section: {
    marginBottom: 10,
    position: 'relative', // 设置相对定位以使线条绝对定位
    paddingLeft: 10, // 增加内边距以给标题留出空间
  },
  heading: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
    fontFamily: 'NotoSnsSC-Bold',
    position: 'relative', // 设置相对定位以确保与线条对齐
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'NotoSnsSC-Bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'NotoSnsSC-Medium',
  },
  link: {
    fontSize: 12,
    color: 'blue',
    textDecoration: 'underline',
    fontFamily: 'NotoSansSC',
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
    fontFamily: 'NotoSnsSC-Medium',
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
        <Text style={styles.heading}>关于我</Text>
        <Text style={styles.text}>
          Hi，我是图南，一名对Web开发充满热情的软件工程专业学生。
          我具有前端和后端开发的经验，并且总是渴望学习新技术。
          目前，我在圣安德鲁斯大学攻读软件工程硕士学位。
          我正在寻找机会参与令人兴奋的项目并为技术社区做出贡献。
        </Text>
        <Text style={styles.text}>
          在业余时间，我喜欢阅读、徒步旅行和玩电子游戏。
          我也是开源软件的忠实粉丝，喜欢为开源项目做贡献。
        </Text>
        <Text style={styles.text}>我总是在寻找新的挑战和成长为开发者的机会。</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>教育背景</Text>
        <Text style={styles.subHeading}>软件工程硕士</Text>
        <Text style={styles.text}>圣安德鲁斯大学, 2024-2025</Text>
        <Text style={styles.subHeading}>软件工程学士</Text>
        <Text style={styles.text}>青岛工学院, 2020-2024, GPA 4.03/5.00</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>技能</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.subHeading}>前端</Text>
            <Text style={styles.listItem}>JavaScript (ES6+)</Text>
            <Text style={styles.listItem}>TypeScript</Text>
            <Text style={styles.listItem}>React</Text>
            <Text style={styles.listItem}>Vue</Text>
            <Text style={styles.listItem}>Next.js</Text>
            <Text style={styles.listItem}>Tailwind CSS</Text>
            <Text style={styles.listItem}>UnoCss</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.subHeading}>后端</Text>
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
            <Text style={styles.subHeading}>运维</Text>
            <Text style={styles.listItem}>Git</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.subHeading}>编程语言</Text>
            <Text style={styles.listItem}>Python</Text>
            <Text style={styles.listItem}>Java</Text>
            <Text style={styles.listItem}>C/C++</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>工作经验</Text>
        <Text style={styles.subHeading}>前端开发实习生</Text>
        <Text style={styles.text}>壹沓科技（上海）有限公司, 2021年7月 - 2021年8月</Text>
        <Text style={styles.text}>- 担任前端实习生，在前端部门获得了实际的工作经验。</Text>

        <Text style={styles.subHeading}>Web全栈开发实习生</Text>
        <Text style={styles.text}>看见概念（上海）智能科技有限公司, 2023年7月 - 2023年12月</Text>
        <Text style={styles.text}>- 担任Web全栈开发实习生，参与了多个Web开发项目。</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>语言</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.subHeading}>中文</Text>
            <Text style={styles.text}>母语</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.subHeading}>英语</Text>
            <Text style={styles.text}>PTE: 61</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>项目</Text>
        {projectsData.map((project, index) => (
          <View key={index} style={styles.section}>
            <Link src={project.href} style={styles.link}>
              <Text style={styles.subHeading}>{project.title}</Text>
            </Link>
            <Text style={styles.text}>{project.chinese}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.line}></View>
        <Text style={styles.heading}>奖项</Text>
        <Text style={styles.subHeading}>优秀学生</Text>
        <Text style={styles.text}>青岛工学院, 2021</Text>
        <Text style={styles.text}>- 因学术成绩优异被评为优秀学生。</Text>

        <Text style={styles.subHeading}>学科竞赛奖学金</Text>
        <Text style={styles.text}>青岛工学院, 2023</Text>
        <Text style={styles.text}>- 在学科竞赛中表现优异，获得奖学金。</Text>

        <Text style={styles.subHeading}>卓越创新人才</Text>
        <Text style={styles.text}>青岛工学院, 2024</Text>
        <Text style={styles.text}>- 在校期间成绩优异，表现突出。</Text>
      </View>
    </Page>
  </Document>
)

export default ResumePDF
