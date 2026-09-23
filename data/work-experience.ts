import type { WorkExperience } from "@/types/content";

/**
 * Reverse-chronological. Dates and claims mirror the source résumé exactly —
 * do not embellish. Add a `logo` when a real asset lands in
 * /public/images/companies/{slug}.png.
 */
export const workExperience: WorkExperience[] = [
  {
    company: "Izifin Technologies",
    role: "Mid-Senior Backend Developer",
    startDate: "2025-10",
    endDate: "2026-08",
    location: "Hybrid · Lagos",
    summary:
      "Izifin engineers high-performance fintech solutions and intelligent backend server networks.",
    highlights: [
      {
        label: "IziSentinel security infrastructure",
        detail:
          "Built a fraud detection system using unsupervised machine learning and real-time anomaly analysis to protect financial ecosystems and user trust.",
      },
      {
        label: "Merchant intelligence & AI automation",
        detail:
          "Developed intelligent chatbots for automated order reconciliation, plus a dynamic digital storefront, using Grafana to hold product reliability standards.",
      },
      {
        label: "Scalable API architecture",
        detail:
          "Designed high-throughput C#/.NET Core APIs powering external integrations and rapid delivery of mission-critical platform features.",
      },
      {
        label: "Cloud infrastructure & DevOps",
        detail:
          "Owned mission-critical cloud environments and automated CI/CD pipelines to improve release velocity and keep availability high for global end users.",
      },
      {
        label: "Database optimisation & engineering",
        detail:
          "Tuned SQL Server and PostgreSQL through advanced query optimisation and architectural migrations, cutting latency and lifting system scalability.",
      },
      {
        label: "Observability & transaction monitoring",
        detail:
          "Implemented an observability framework and transaction pipeline that cut alert fatigue with precise metric thresholds, enabling proactive resolution of system issues.",
      },
    ],
    stack: [
      "C#",
      ".NET Core",
      "SQL Server",
      "PostgreSQL",
      "Grafana",
      "Unsupervised ML",
      "CI/CD",
    ],
    logo: null,
  },
  {
    company: "Qoryx",
    role: "Lead AI & Backend Engineer",
    startDate: "2025-10",
    endDate: "2026-01",
    location: "Remote · Lagos",
    summary:
      "Qoryx is an AI-powered staffing platform that predicts risk and matches healthcare professionals to open shifts.",
    highlights: [
      {
        label: "SmartMatch recommender engine",
        detail:
          "Architected the core matching algorithm pairing doctors, nurses and phlebotomists with open shifts across skills, security clearances, live availability and geospatial distance.",
      },
      {
        label: "ForecastPro predictive system",
        detail:
          "Engineered a predictive analytics engine that flags staffing gaps up to 72 hours ahead, with explainable reasoning for care managers.",
      },
      {
        label: "OptimisePro decision support",
        detail:
          "Designed backend logic for simulation tools that propose optimal staffing fixes, letting organisations see the impact of roster changes before applying them.",
      },
      {
        label: "Backend infrastructure ownership",
        detail:
          "Built the majority of the platform backend in Django and Python, including multi-tenant architecture for organisations, professionals and client/patient profiles.",
      },
    ],
    stack: [
      "Python",
      "Django",
      "PostgreSQL",
      "Recommender Systems",
      "Time-Series Forecasting",
      "Geospatial",
    ],
    logo: null,
  },
  {
    company: "Pusheat",
    role: "Lead AI & Backend Engineer",
    startDate: "2024-11",
    endDate: "2025-10",
    location: "Remote · Lagos",
    summary:
      "Pusheat is a “TikTok-for-food” marketplace where creators sell meals directly through viral video content.",
    highlights: [
      {
        label: "Video recommendation system",
        detail:
          "Designed and deployed the AI ranking algorithms behind the main video feed, curating creator content for engagement and order conversion.",
      },
      {
        label: "“Bites” gamification & wallet architecture",
        detail:
          "Engineered the loyalty backend that tracks likes, shares and downloads, then calculates and applies checkout discounts in real time.",
      },
      {
        label: "Creator-centric payment split",
        detail:
          "Implemented a Paystack integration automating instant split payments between food creators, logistics partners and the platform.",
      },
      {
        label: "Automated logistics dispatch",
        detail:
          "Integrated Glovo LaaS for on-demand delivery, auto-assigning riders against food prep windows and customer location.",
      },
    ],
    stack: [
      "Python",
      "Django",
      "Paystack",
      "Glovo LaaS",
      "Redis",
      "Ranking Algorithms",
    ],
    logo: null,
  },
  {
    company: "Spacial Nova",
    role: "Machine Learning Engineer (Lead)",
    startDate: "2022-03",
    endDate: "2023-02",
    location: "Lagos, Nigeria",
    summary:
      "Computer vision for unmanned aerial vehicles, building perception models for constrained edge hardware.",
    note: "Acquired by Terrahaptix",
    highlights: [
      {
        label: "UAV computer vision",
        detail:
          "Led ML development of lightweight deep learning models for plant recognition and object detection, optimised for edge deployment on UAVs.",
      },
      {
        label: "Edge optimisation",
        detail:
          "Reduced model inference latency to enable real-time processing on hardware-constrained aerial devices.",
      },
      {
        label: "Acquisition outcome",
        detail:
          "Technical contributions to scalable model architecture played a pivotal role in the company’s acquisition by Terrahaptix.",
      },
    ],
    stack: [
      "Python",
      "Deep Learning",
      "Object Detection",
      "Edge Inference",
      "Computer Vision",
    ],
    logo: null,
  },
  {
    company: "Perzsi",
    role: "Backend / ML Consultant",
    startDate: "2022-02",
    endDate: "2023-02",
    location: "Lagos, Nigeria",
    summary:
      "Consulted on data acquisition infrastructure for an advertising business.",
    highlights: [
      {
        label: "Automated scraping infrastructure",
        detail:
          "Crafted a resilient backend integrated with an AI-driven scraping engine to acquire business data for advertising.",
      },
      {
        label: "Admin API development",
        detail:
          "Spearheaded real-time administrative APIs for scraping oversight and role management.",
      },
    ],
    stack: ["Python", "Web Scraping", "REST APIs", "Role-Based Access"],
    logo: null,
  },
  {
    company: "Octave Inc (MelodyAI)",
    role: "CTO · Backend & Machine Learning Engineer",
    startDate: "2019-02",
    endDate: "2022-02",
    location: "Lagos, Nigeria",
    summary:
      "Led engineering at an early-stage AI company building data analysis tooling.",
    highlights: [
      {
        label: "LLM chatbot development",
        detail:
          "Implemented an advanced RAG-based chatbot using large language models to answer complex data analysis queries, securing grant funding for the project.",
      },
      {
        label: "Data analysis engine",
        detail:
          "Directed development of an AI-powered engine deriving actionable business insights from heterogeneous datasets.",
      },
      {
        label: "API performance",
        detail:
          "Refactored legacy backend systems, significantly improving API response times and system reliability.",
      },
    ],
    stack: [
      "Python",
      "LLMs",
      "RAG",
      "Backend Architecture",
      "Technical Leadership",
    ],
    logo: null,
  },
];
