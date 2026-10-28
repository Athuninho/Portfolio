export interface SkillGroup {
  id: string
  title: string
  /** Skills taken from the CV. Add new ones here as you learn them. */
  items: string[]
  /** Shown as a visible placeholder when the group has no confirmed items yet. */
  todo?: string
}

export const skillGroups: SkillGroup[] = [
  { id: 'languages', title: 'Programming languages', items: ['JavaScript', 'Python', 'Java', 'C++'] },
  {
    id: 'frontend',
    title: 'Frontend development',
    items: ['React', 'HTML5', 'CSS3', 'Responsive design'],
  },
  { id: 'backend', title: 'Backend development', items: ['Node.js', 'REST APIs', 'MVC architecture'] },
  {
    id: 'databases',
    title: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Database design', 'CRUD operations'],
  },
  { id: 'apis', title: 'APIs and integrations', items: ['REST APIs', 'API integration'] },
  {
    id: 'tools',
    title: 'Developer tools',
    items: ['Visual Studio Code', 'NetBeans', 'Maven', 'Linux', 'Windows'],
  },
  { id: 'vcs', title: 'Version control', items: ['Git', 'GitHub'] },
  {
    id: 'testing',
    title: 'Testing and deployment',
    items: ['Debugging', 'Troubleshooting'],
    todo: '[[TODO: testing tools and deployment platforms you have actually used]]',
  },
]
