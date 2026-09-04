import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
  {
    title: "Core AI & ML",
    icon: "brain",
    skills: [
      "Predictive Modeling (Time-Series)",
      "Recommender Systems",
      "Collaborative Filtering",
      "Optimization Algorithms",
      "NLP · LLMs · RAG",
      "Computer Vision",
      "Anomaly Detection",
      "Edge / On-Device ML",
    ],
  },
  {
    title: "Backend Engineering",
    icon: "server",
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "Node.js",
      ".NET / C#",
      "TypeScript",
      "Microservices",
      "Docker",
      "Celery",
      "Redis",
      "PostgreSQL",
      "SQL Server",
    ],
  },
  {
    title: "Web3 & Blockchain",
    icon: "blocks",
    skills: [
      "Solidity",
      "Foundry",
      "Smart Contracts",
      "ERC-20",
      "ERC-721 / NFTs",
      "DeFi Protocols",
      "Chainlink Price Feeds",
    ],
  },
  {
    title: "Domain Expertise",
    icon: "target",
    skills: [
      "Payment Infrastructure",
      "Fraud Detection",
      "Healthcare Workforce Planning",
      "Creator Economy Monetization",
      "Geospatial Logistics",
      "Observability & Monitoring",
    ],
  },
  {
    title: "Integrations & Platform",
    icon: "plug",
    skills: [
      "Paystack (Split Payments)",
      "Glovo LaaS",
      "Google Maps API",
      "Grafana",
      "CI/CD Pipelines",
      "AWS (S3, CloudFront, MediaConvert)",
    ],
  },
];
