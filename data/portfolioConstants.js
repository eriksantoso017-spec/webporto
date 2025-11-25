import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

export const cubeData = [
  {
    id: "home",
    title: ".home {",
    subtitle: "welcome: get-to-know-me;",
    preview: "}",
  },
  {
    id: "skills",
    title: ".skills {",
    subtitle: "what-i-do: my-technical-expertise;",
    preview: "}",
  },
  {
    id: "portfolio",
    title: ".portfolio {",
    subtitle: "my-work: projects-i-have-built;",
    preview: "}",
  },
  {
    id: "education",
    title: ".education {",
    subtitle: "learning-journey: academic-background;",
    preview: "}",
  },
  {
    id: "contact",
    title: ".contact {",
    subtitle: "get-in-touch: let-us-connect;",
    preview: "}",
  },
  {
    id: "blog",
    title: ".blog {",
    subtitle: "random-thinking: thoughts-&-ideas;",
    preview: "}",
  },
];

export const technicalSkills = [
  { name: "Word", icon: "/icons/word.svg" },
  { name: "PowerPoint", icon: "/icons/powerpoint.svg" },
  { name: "Canva", icon: "/icons/canva.svg" },
  { name: "Photoshop", icon: "/icons/photoshop.svg" },
  { name: "Premiere Pro", icon: "/icons/premierepro.svg" },
];

export const softSkills = [
  { name: "Communication", icon: "/icons/icon-skills/communication.svg" },
  {
    name: "Problem Solving",
    icon: "/icons/icon-skills/problem-solving-skills.svg",
  },
  { name: "Team Work", icon: "/icons/icon-skills/teamwork.svg" },
  { name: "Diligent", icon: "/icons/icon-skills/diligence.svg" },
  { name: "Time Management", icon: "/icons/icon-skills/management-time.svg" },
  { name: "Creativity", icon: "/icons/icon-skills/creativity.svg" },
];

export const education = [
  {
    id: 1,
    degree: "Jurusan IPS",
    institution: "MAN Sidoarjo",
    year: "2019-2022",
    icon: "/icons/mansda.svg",
    glowClass: "from-green-300 to-yellow-400", // Hijau muda ke kuning
  },
  {
    id: 2,
    degree: "S-1 Ilmu Komunikasi",
    institution: "Universitas Brawijaya",
    year: "2022-Now",
    icon: "/icons/brawijaya.svg",
    glowClass: "from-blue-900 to-yellow-500", // Biru tua ke emas
  },
];

export const experiences = [
  {
    id: 1,
    title: "Designer",
    company: "Brawijaya English Tournament 2023",
    year: "2023",
    description:
      "Mengubah tema website BET 2023 dan mendesain beberapa konten instagram",
    gradientClass: "from-purple-600 to-pink-600",
  },
];

export const contacts = [
  {
    name: "Email",
    icon: Mail,
    link: "mailto:ricksant853@gmail.com",
    color: "bg-red-600",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/erik-santoso-89596324b/",
    color: "bg-blue-600",
  },
  {
    name: "GitHub",
    icon: Github,
    link: "https://github.com/eriksantoso17",
    color: "bg-gray-700",
  },
  {
    name: "Twitter",
    icon: Twitter,
    link: "https://x.com/agenbuahkhuldi",
    color: "bg-sky-500",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://www.instagram.com/rickandsant/",
    color: "bg-pink-600",
  },
  {
    name: "Facebook",
    icon: Facebook,
    link: "https://www.facebook.com/rickandsants/",
    color: "bg-blue-800",
  },
];

