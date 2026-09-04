import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Kamaldeen Seriki",
  shortName: "Kamal Seriki",
  title: "Senior AI Engineer & Backend Architect",
  location: "Akoka, Lagos, Nigeria",
  email: "kamalseriki49@gmail.com",
  yearsExperience: 5,

  strapline:
    "I build the intelligent systems behind fintech, healthcare and creator platforms.",

  summary:
    "Senior Backend & AI Engineer with over 5 years of experience architecting high-impact distributed systems. Expert in building scalable backends, reliable data pipelines, and intelligent decision-support tools using Python, .NET C#, TypeScript and Node.js.",

  about: [
    "I started in Mechanical Engineering at the University of Lagos and ended up architecting the backends and machine learning systems that production platforms depend on. That route was not accidental: engineering taught me to model messy physical systems under constraint, and that is precisely the skill that matters when you are routing payments, matching clinicians to shifts, or ranking a video feed in real time.",
    "Over five years I have owned full product lifecycles across six companies, from CTO at an early-stage AI startup to fraud detection infrastructure in fintech. My work concentrates on three problems: making distributed backends hold up under load, turning heterogeneous data into decisions people actually trust, and shipping models that survive contact with production.",
    "I still publish. Three peer-reviewed papers applying machine learning to industrial systems came out of the research side of that engineering background, and it keeps the theory honest.",
  ],

  headshot: {
    src: "/images/kamal.jpeg",
    alt: "Portrait of Kamaldeen Seriki",
  },
};
