export type ProjectStatus = 'Live' | 'On Google Play' | 'In development' | 'Private'

export interface ProjectLink {
  label: string
  href: string
  kind: 'live' | 'store' | 'repo'
}

export interface Project {
  slug: string
  name: string
  category: string
  status: ProjectStatus
  /** One line shown on the card. Only verified facts. */
  summary: string
  accent: 'violet' | 'teal' | 'fuchsia' | 'sky'
  overview: string
  problem: string
  users: string
  /** Features you have personally confirmed work. Empty means a placeholder is shown. */
  features: string[]
  stack: string[]
  stackNote?: string
  role: string
  contribution: string
  challenges: { challenge: string; solution: string }[]
  lessons: string
  links: ProjectLink[]
  /** Put images in public/images/ and list them here. Empty means placeholders. */
  screenshots: { src: string; alt: string }[]
  /** Facts to confirm before publishing, shown in PLACEHOLDERS.md. */
  verify: string[]
}

const todo = (what: string) => `[[TODO: ${what}]]`

export const projects: Project[] = [
  {
    slug: 'shulecloud',
    name: 'ShuleCloud',
    category: 'Education technology',
    status: 'Live',
    summary:
      'A web platform for education technology, built by a team of six developers. I worked on it as a developer.',
    accent: 'violet',
    overview:
      'ShuleCloud is an education-technology web application built with React, Node.js and PostgreSQL by a team of six.',
    problem: todo('the problem ShuleCloud solves, in one or two sentences'),
    users: todo('who uses ShuleCloud (e.g. schools, teachers, parents, students)'),
    features: [],
    stack: ['React', 'Node.js', 'PostgreSQL'],
    role: 'Developer, in a team of 6',
    contribution:
      'Developer in a team of six. The work covered frontend, backend functionality and database integration while implementing real user requirements. ' +
      todo('the specific modules, pages or endpoints you personally built'),
    challenges: [{ challenge: todo('one technical challenge'), solution: todo('how you solved it') }],
    lessons: todo('one or two lessons from building ShuleCloud in a team of six'),
    links: [{ label: 'Visit shulecloud.com', href: 'https://shulecloud.com', kind: 'live' }],
    screenshots: [],
    verify: [
      'Problem solved and target users',
      'Features you personally built',
      'Your specific modules or endpoints',
      'Permission from the team or owner to show it publicly',
      'Screenshots',
    ],
  },
  {
    slug: 'rentalyetu',
    name: 'RentalYetu',
    category: 'Property technology',
    status: 'Live',
    summary:
      'A web-based rental and property platform built by a team of six developers. I worked on it as a developer.',
    accent: 'teal',
    overview:
      'RentalYetu is a web-based rental and property platform built with React, Node.js and PostgreSQL by a team of six.',
    problem: todo('the problem RentalYetu solves, in one or two sentences'),
    users: todo('who uses RentalYetu (e.g. tenants, landlords, agents)'),
    features: [],
    stack: ['React', 'Node.js', 'PostgreSQL'],
    role: 'Developer, in a team of 6',
    contribution:
      'Developer in a team of six. The work covered web interfaces, application data management, backend development and database connectivity. ' +
      todo('the specific workflows or features you personally built'),
    challenges: [{ challenge: todo('one technical challenge'), solution: todo('how you solved it') }],
    lessons: todo('one or two lessons from building RentalYetu'),
    links: [{ label: 'Visit rentalyetu.com', href: 'https://rentalyetu.com', kind: 'live' }],
    screenshots: [],
    verify: [
      'Which workflows are live (listings, bookings, payments, dashboards)',
      'Problem solved and target users',
      'Your specific features',
      'Permission to show it publicly',
      'Screenshots',
    ],
  },
  {
    slug: 'uninotes',
    name: 'UniNotes App',
    category: 'Student productivity and education',
    status: 'On Google Play',
    summary: 'An Android app for students, published on Google Play. I worked on it as a developer.',
    accent: 'fuchsia',
    overview: 'UniNotes is an Android app published on Google Play.',
    problem: todo('the problem UniNotes solves for students'),
    users: todo('target users (e.g. university students)'),
    features: [],
    stack: [],
    stackNote: todo('the technology stack (language, framework, backend)'),
    role: 'Developer',
    contribution:
      'Developer on the app, working with the same team as ShuleCloud. ' +
      todo('your specific contribution and the team size for this app'),
    challenges: [{ challenge: todo('one technical challenge'), solution: todo('how you solved it') }],
    lessons: todo('one or two lessons from publishing an Android app'),
    links: [
      {
        label: 'View on Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.shulecloud.uninotes',
        kind: 'store',
      },
    ],
    screenshots: [],
    verify: [
      'Technology stack',
      'Features actually in the published app',
      'Your specific contribution and team size',
      'Public GitHub repository, if any',
      'Screenshots',
    ],
  },
  {
    slug: 'pos',
    name: 'Point of Sale (POS)',
    category: 'Retail and business software',
    status: 'In development',
    summary: 'A point-of-sale system I am developing on my own. Work in progress.',
    accent: 'sky',
    overview: 'A point-of-sale system for retail and business use. It is still in development and I am building it solo.',
    problem: todo('the problem this POS solves and for what kind of business'),
    users: todo('intended users (e.g. shop owners, cashiers)'),
    features: [],
    stack: [],
    stackNote: todo('the technology stack'),
    role: 'Solo developer',
    contribution:
      'Sole developer. The project is still in progress. ' + todo('the features that already work today'),
    challenges: [{ challenge: todo('one technical challenge'), solution: todo('how you solved it') }],
    lessons: todo('one lesson from building a project alone'),
    links: [],
    screenshots: [],
    verify: [
      'Technology stack',
      'Which of sales, inventory, receipts, reports and login already work',
      'GitHub repository (if public) and a live demo (if any)',
      'Screenshots',
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
