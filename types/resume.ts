export interface ResumeEntry {
  title: string
  company: string
  date?: string
  desc: string
}

export interface ResumeEducation {
  degree: string
  school: string
}

export interface ResumeAward {
  title: string
  org: string
  desc: string
}

export interface ResumeSkills {
  frontend: string[]
  backend: string[]
  devops: string[]
  languages: string[]
  frontendLabel: string
  backendLabel: string
  devopsLabel: string
  languagesLabel: string
}

export interface ResumeLanguage {
  name: string
  level: string
}

export interface ResumeProject {
  name: string
  sub: string
  link: string
  desc: string
}

export interface ResumeData {
  about: string
  experienceTitle: string
  experience: ResumeEntry[]
  projectsTitle: string
  projects: ResumeProject[]
  projectsMoreLink: string
  projectsMoreLabel: string
  educationTitle: string
  education: ResumeEducation[]
  skillsTitle: string
  skills: ResumeSkills
  languagesTitle: string
  langs: ResumeLanguage[]
  awardsTitle: string
  awards: ResumeAward[]
}
