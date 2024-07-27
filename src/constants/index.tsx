import {
  symposium_gif,
  jungle,
  scheduler,
  tidyTask,
  tinyapp,
  tweeter,
} from "../assets/images";
import {
  car,
  contact,
  css,
  estate,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  mui,
  nextjs,
  nodejs,
  pricewise,
  react,
  sass,
  snapgram,
  summiz,
  tailwindcss,
  threads,
  typescript,
  xerris,
  laPrairie,
  nutrien,
  trimac,
} from "../assets/icons";

export const skills = [
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
  {
    imageUrl: express,
    name: "Express",
    type: "Backend",
  },
  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Version Control",
  },
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Frontend",
  },
  {
    imageUrl: typescript,
    name: "TypeScript",
    type: "Frontend",
  },
  {
    imageUrl: mongodb,
    name: "MongoDB",
    type: "Database",
  },
  // {
  //   imageUrl: motion,
  //   name: "Motion",
  //   type: "Animation",
  // },
  {
    imageUrl: mui,
    name: "Material-UI",
    type: "Frontend",
  },
  {
    imageUrl: nextjs,
    name: "Next.js",
    type: "Frontend",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  // {
  //   imageUrl: redux,
  //   name: "Redux",
  //   type: "State Management",
  // },
  {
    imageUrl: sass,
    name: "Sass",
    type: "Frontend",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
];

export const experiences = [
  {
    title: "Full stack Developer",
    companyName: "Accolite Digital",
    companyDescription: "",
    client: "Nutrien",
    projectDescription:
      "Created a world-class digital platform for a fertilizer manufacturer that would provide a single human-centric place to conduct business and scale to meet a growing global business. Custom-designed and developed a front-end B2B experience and delivered multiple ERP integrations utilizing Microservices architecture.",
    techEnvironment:
      "JavaScript/Typescript, React.js, MobX, AWS, CircleCI, Git, Figma, Jira, Agile, LaunchDarkly, ConfigCat, Google Tag Manager",
    icon: nutrien,
    iconBg: "#d8e9c6",
    date: "February 2022 - April 2024",
    teamSize: "30+",
    keyTasksAndResponsibilities: [
      "Developed new features and maintained micro-frontend based web applications that optimize the efficiency and effectiveness of the sales and monitoring of fertilizer transactions for Nutrien's customers, Account Managers, and Sales representatives.",
      "Worked with two custom storybook component libraries, CircleCI and React.js, to develop and maintain over 10 micro apps.",
      "Was one of two developers to own an inventory reporting app project that was slated for three months that we completed in one month.",
    ],
  },
  {
    title: "Full Stack Developer",
    companyName: "Accolite Digital",
    companyDescription: "",
    client: "Trimac",
    projectDescription:
      "Created a web application for a bulk transportation company that operates across Canada and the continental US. Leveraged Trimac's pre-existing AWS microservices foundation to build out a responsive web application that modernized and increased the efficiency of the company's entire trucking network.",
    techEnvironment:
      "JavaScript/Typescript, React.js, AWS, GraphQL, Git, Figma, Jira, Agile",
    icon: trimac,
    iconBg: "#f5c6c2",
    date: "September 2021 - February 2022",
    teamSize: "10+",
    keyTasksAndResponsibilities: [
      "Developed features on a single-page application aimed at streamlining the operations of trucking dispatchers for Trimac using React.js and GraphQL.",
      "Created company-specific components in a custom storybook component library.",
    ],
  },
  {
    title: "Full Stack Developer",
    companyName: "Accolite Digital",
    companyDescription: "",
    client: "LaPrairie Group",
    projectDescription:
      "Modernized the client's existing legacy Field Order Engine application (FOE), an MS Access based application used by employees in the field to view job details and create safety assessments. The React.js application is device agnostic allowing field operations staff to use personal devices to carry out their functions and remove the need for the more expensive Windows tablets.",
    techEnvironment:
      "JavaScript/Typescript, React.js, AWS, RxDB, GraphQL, Git, Figma, Jira, Agile",
    icon: laPrairie,
    iconBg: "#f8d7bc",
    date: "April 2021 - September 2021",
    teamSize: "10+",
    keyTasksAndResponsibilities: [
      "Developed features on a web-based platform for field operations staff to perform job functions online and offline on personal devices.",
      "Utilized React.js.js for responsive UI development.",
    ],
  },
  {
    title: "Full Stack Intern",
    companyName: "Xerris Inc. Aquired by Accolite Digital",
    companyDescription:
      "Xerris, is a Calgary-based, remote cloud technology services company providing Application Modernization, DevOps, Kubernetes, Cloud Strategy, Migration, and Data & Analytics services to clients across North America.",
    client: "",
    projectDescription: "",
    techEnvironment: "",
    icon: xerris,
    iconBg: "#f4fae9",
    date: "February 2021 - April 2021",
    teamSize: "7",
    keyTasksAndResponsibilities: [
      "Worked as a Front End developer on an Agile/SCRUM development team of 7, creating a mobile and web-based app for running planning poker sessions.",
    ],
  },
];

export const socialLinks = [
  {
    name: "Contact",
    iconUrl: contact,
    link: "/contact",
  },
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/YourGitHubUsername",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://www.linkedin.com/in/YourLinkedInUsername",
  },
];

export const projects = [
  {
    iconUrl: pricewise,
    appImage: symposium_gif,
    theme: "btn-back-red",
    name: "Symposium",
    description:
      "Symposium is a video chat connection platform for people to discuss topics covered in the podcasts they love. Built with React, Node, Express, Socket.IO, and a PostgreSQL database. Testing: Cypress",
    link: "https://github.com/AleksandarDmitrovic/symposium",
  },
  {
    iconUrl: threads,
    appImage: tidyTask,
    theme: "btn-back-green",
    name: "TidyTask",
    description:
      "Tidy task is an auto categorizing to-do list organizational web application. Built with HTML, SASS, Node, Express and a PostgreSQL database.",
    link: "https://github.com/AleksandarDmitrovic/tidyTask",
  },
  {
    iconUrl: car,
    appImage: scheduler,
    theme: "btn-back-blue",
    name: "Interview Scheduler",
    description:
      "Interview Scheduler is a single-page interview booking application where users can book, edit and delete interview appointments. My first React App. Built with React, HTML, CSS Node, Express, and a PostgreSQL database. Testing: Jest, Storybook, Cypress",
    link: "https://github.com/AleksandarDmitrovic/scheduler",
  },
  {
    iconUrl: snapgram,
    appImage: jungle,
    theme: "btn-back-pink",
    name: "Jungle",
    description:
      "A mini e-commerce application that was built with Rails 4.2. Built with Ruby on Rails, Stripe and a PostgreSQL database. Testing: RSpec, Capybara",
    link: "https://github.com/AleksandarDmitrovic/jungle-rails",
  },
  {
    iconUrl: estate,
    appImage: tweeter,
    theme: "btn-back-black",
    name: "Tweeter",
    description:
      "Tweeter is a simple, single-page Twitter clone. Built with HTML, CSS, JS, jQuery, AJAX, Node, and Express.",
    link: "https://github.com/AleksandarDmitrovic/tweeter",
  },
  {
    iconUrl: summiz,
    appImage: tinyapp,
    theme: "btn-back-yellow",
    name: "TinyApp",
    description:
      "TinyApp is a full-stack web application that allows users to shorten long URLs (à la bit.ly). Built with HTML, CSS, EJS, Node, and Express.",
    link: "https://github.com/AleksandarDmitrovic/tinyapp",
  },
];
