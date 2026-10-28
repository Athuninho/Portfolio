/**
 * All personal facts live here. Anything not yet confirmed is written as
 * [[TODO: ...]] and is shown as a visible placeholder on the site and in the PDF.
 */
export const profile = {
  brand: 'Asumanii',
  fullName: 'Athman Rajab Suba',
  title: 'Computer Science Student | Software Developer',
  headline: 'Building Useful Software for the Real World.',
  intro:
    'I build database-driven web applications with React, Node.js and PostgreSQL, and I am looking for an internship or junior developer role where I can keep growing by shipping real products.',
  location: 'Mombasa, Kenya',
  availability: 'Open to internships and junior roles anywhere in Kenya',
  availabilityDetail:
    '[[TODO: preferred start date and remote / on-site / hybrid preference]]',
  email: 'athman7970@gmail.com',
  phone: '+254 758 024 344',
  phoneHref: '+254758024344',
  github: 'https://github.com/athuninho',
  githubHandle: 'athuninho',
  linkedin: 'https://www.linkedin.com/in/athman-rajab-212921372',
  cvFile: '/Athman_Suba_CV.pdf',
  cvFileName: 'Athman_Suba_CV.pdf',
  /** Set to '' to hide the photo slot. Put the image in public/images/. */
  photo: '',
  bio: [
    'I’m a Computer Science student at Egerton University with a passion for software development, problem-solving, and building innovative digital solutions.',
    'I have worked on projects such as ShuleCloud, RentalYetu, and the UniNotes app, and I’m continuously improving my skills to create technology that makes a real impact.',
    'My goal is to grow as a software developer, gain industry experience, and contribute to meaningful projects that solve real-world problems.',
  ],
  about: {
    background:
      'I study Applied Computer Science at Egerton University in Nakuru (2024 to present, expected 2028) and live in Mombasa. Coursework includes web development, database systems, software engineering, object-oriented systems, data structures and algorithms, and computer networks.',
    approach:
      'I rely on logical thinking and careful debugging: reproduce the problem, narrow it down, fix the cause, then check that nothing else broke. I use Git and GitHub to keep that work organised.',
    interest:
      'I am most interested in web and full-stack development, database-driven systems, point-of-sale and student-management software, and AI-powered applications built on APIs.',
    learning:
      'I learn new technologies independently, by building with them, and I value working in a team where I can learn from other developers.',
    goals:
      'To gain professional industry experience as a software developer, contribute to meaningful projects, and become a dependable engineer.',
  },
  education: [
    {
      school: 'Egerton University, Kenya',
      award: 'Bachelor of Science in Applied Computer Science',
      period: '2024 – Present (expected 2028)',
      note: 'Relevant coursework: Web Development, Database Systems, Software Engineering, Object-Oriented Systems, Data Structures and Algorithms, Computer Networks, Artificial Intelligence, Software Project Management, E-Commerce, Digital Image Processing, Computer Graphics and Visualization.',
    },
    {
      school: 'Ribe Boys High School, Kenya',
      award: 'Secondary Education',
      period: '2020 – 2023',
      note: '',
    },
  ],
  languages: ['English (good working proficiency)', 'Kiswahili (good working proficiency)'],
} as const

export type Profile = typeof profile
