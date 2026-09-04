import type { Project } from "@/types/content";

const GH = "https://github.com/Sayrikey1";

/**
 * Every entry maps to a real public repository. `image` stays null until a real
 * screenshot exists at /public/images/projects/{slug}.png — the card component
 * falls back to the category visual automatically.
 */
export const projects: Project[] = [
  {
    slug: "code-and-clause",
    title: "Code & Clause",
    oneLiner:
      "A retrieval-augmented assistant that answers Nigerian tech-law and NITDA policy questions.",
    description:
      "Regulatory text is long, dense and rarely searchable in a useful way. Code & Clause ingests Nigerian technology policy and NITDA documents, embeds them, and answers natural-language questions with grounded citations instead of guesswork. It accepts PDF uploads and voice input, so a founder can interrogate a policy document conversationally.",
    category: "nlp",
    stack: [
      "FastAPI",
      "Streamlit",
      "RAG",
      "sentence-transformers",
      "Google Gemini",
      "Python",
    ],
    links: { github: `${GH}/Code-and-Clause` },
    highlight: true,
    metrics: [
      "PDF ingestion + voice input",
      "Grounded retrieval with citations",
    ],
    image: null,
    order: 1,
    caseStudy: {
      problem:
        "Nigerian technology regulation is spread across long PDF policy documents that founders and engineers rarely read end to end. Keyword search over them is close to useless, and a general-purpose chatbot will confidently invent provisions that do not exist.",
      approach: [
        "Built an ingestion pipeline that chunks uploaded policy PDFs and embeds them with sentence-transformers, so retrieval works over semantic meaning rather than exact wording.",
        "Grounded every answer in retrieved passages via a RAG pipeline over Google Gemini, keeping responses tied to source text rather than model recall.",
        "Exposed the system through a FastAPI service with a Streamlit interface, adding voice input so questions can be asked conversationally.",
      ],
      outcome:
        "A working assistant that turns static regulatory PDFs into something you can question directly, with answers traceable back to the passage they came from.",
    },
  },
  {
    slug: "chat-with-docs",
    title: "Chat With Docs",
    oneLiner:
      "A credit-assessment chatbot grounded in API documentation, with real auth and a vector store.",
    description:
      "A production-shaped RAG service rather than a notebook demo: JWT-authenticated, backed by PostgreSQL with Alembic migrations for relational state, and Pinecone for vector retrieval. It answers credit-assessment questions grounded in API documentation, served by Groq-hosted Llama 3.3 70B for low-latency inference.",
    category: "nlp",
    stack: [
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "Pinecone",
      "Groq Llama-3.3-70B",
      "JWT Auth",
    ],
    links: { github: `${GH}/chat-with-docs-credit-chek` },
    highlight: true,
    metrics: ["Managed migrations via Alembic", "JWT-authenticated endpoints"],
    image: null,
    order: 2,
    caseStudy: {
      problem:
        "Most retrieval demos stop at a notebook: no authentication, no schema management, no separation between relational and vector state. That is not deployable against real credit data.",
      approach: [
        "Split persistence deliberately — PostgreSQL with SQLAlchemy and Alembic for relational records and migration history, Pinecone for embedding retrieval.",
        "Put JWT authentication in front of the endpoints so document access is scoped rather than open.",
        "Served inference through Groq-hosted Llama 3.3 70B, trading self-hosting for materially lower response latency.",
      ],
      outcome:
        "A RAG backend with the operational parts intact — migrations, auth and separated stores — that answers credit-assessment questions grounded in the documentation it was given.",
    },
  },
  {
    slug: "edutrack",
    title: "EduTrack",
    oneLiner:
      "A Django education-management platform carrying 90%+ test coverage and full CI/CD.",
    description:
      "Course management, assignments, OTP-based authentication and CRM features in one Django platform, containerised with Docker and deployed through GitHub Actions. The interesting part is not the feature list but the discipline around it: test coverage above 90% and a pipeline that enforces it on every push.",
    category: "backend",
    stack: [
      "Django",
      "Python",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "OTP Auth",
    ],
    links: { github: `${GH}/EduTrack` },
    highlight: true,
    metrics: ["90%+ test coverage", "CI/CD via GitHub Actions", "Dockerised"],
    image: null,
    order: 3,
  },
  {
    slug: "drm-video-server",
    title: "DRM Video Server",
    oneLiner:
      "Adaptive-bitrate video streaming with DRM protection on AWS, end to end.",
    description:
      "A full streaming stack: MediaConvert transcodes uploads into adaptive-bitrate renditions, S3 stores them, and CloudFront serves them behind signed cookies so content cannot be hotlinked or scraped. A NestJS backend issues the signed credentials; a React and Vite frontend handles playback.",
    category: "fullstack",
    stack: [
      "NestJS",
      "React",
      "Vite",
      "AWS CloudFront",
      "AWS S3",
      "AWS MediaConvert",
      "TypeScript",
    ],
    links: { github: `${GH}/drm-video-server` },
    highlight: true,
    metrics: ["Signed-cookie content protection", "Adaptive bitrate delivery"],
    image: null,
    order: 4,
  },
  {
    slug: "video-subtitle-generator",
    title: "Video Subtitle Generator",
    oneLiner:
      "Generates and translates video subtitles across 20+ languages from raw audio.",
    description:
      "Extracts an audio track with ffmpeg, transcribes and translates it through Gemini, and emits subtitle files in over twenty languages. Built as a FastAPI service with a Streamlit interface so it can be used directly rather than through an API client.",
    category: "ai-ml",
    stack: ["FastAPI", "Streamlit", "Google Gemini", "ffmpeg", "Python"],
    links: { github: `${GH}/Video-Subtitle-Generator` },
    highlight: true,
    metrics: ["20+ output languages"],
    image: null,
    order: 5,
  },
  {
    slug: "ocr-app",
    title: "Multimodal OCR",
    oneLiner:
      "CPU-optimised document OCR running a multimodal model locally via llama.cpp.",
    description:
      "Runs MiniCPM-o 2.6 through llama.cpp to read documents without a GPU or a third-party OCR API, which matters when documents cannot leave the machine. Wrapped in FastAPI with a Streamlit interface for direct use.",
    category: "computer-vision",
    stack: ["MiniCPM-o 2.6", "llama.cpp", "FastAPI", "Streamlit", "Python"],
    links: { github: `${GH}/OCR-app` },
    highlight: true,
    metrics: [
      "Runs CPU-only — no GPU required",
      "Local inference, no data egress",
    ],
    image: null,
    order: 6,
  },

  // ── Secondary grid ────────────────────────────────────────────────
  {
    slug: "ride-hailing-app",
    title: "Ride-Hailing Backend",
    oneLiner:
      "Uber-style ride booking and dispatch backend built on Django REST Framework.",
    description:
      "Driver and rider models, trip lifecycle state, and booking endpoints built with Django REST Framework.",
    category: "backend",
    stack: ["Django", "DRF", "PostgreSQL", "Python"],
    links: { github: `${GH}/Ride-Hailing-App` },
    highlight: false,
    image: null,
    order: 7,
  },
  {
    slug: "movie-recommender",
    title: "Movie Recommender",
    oneLiner:
      "Collaborative-filtering recommender served through a Django REST API.",
    description:
      "A collaborative-filtering recommender wrapped in Django REST Framework, with custom management commands for training and data loading.",
    category: "ai-ml",
    stack: ["Django", "DRF", "Collaborative Filtering", "Python"],
    links: { github: `${GH}/movie-recommender` },
    highlight: false,
    image: null,
    order: 8,
  },
  {
    slug: "recommendation-engine",
    title: "Recommendation Engine",
    oneLiner:
      "Cosine-similarity collaborative filtering built from scratch on MovieLens.",
    description:
      "A from-scratch user-item collaborative filtering implementation over the MovieLens ml-100k dataset using cosine similarity, written up as notebooks.",
    category: "ai-ml",
    stack: ["Python", "NumPy", "pandas", "Jupyter", "MovieLens"],
    links: { github: `${GH}/recommendation-engine` },
    highlight: false,
    image: null,
    order: 9,
  },
  {
    slug: "motion-detector",
    title: "Motion Detector",
    oneLiner: "Frame-differencing motion detection with audible alarm alerts.",
    description:
      "Detects movement in a video stream through frame differencing and raises an audio alarm on detection.",
    category: "computer-vision",
    stack: ["Python", "OpenCV", "Computer Vision"],
    links: { github: `${GH}/MotionDetector` },
    highlight: false,
    image: null,
    order: 10,
  },
  {
    slug: "storefront2",
    title: "Storefront API",
    oneLiner: "Django e-commerce backend covering catalogue, carts and orders.",
    description:
      "An e-commerce backend in Django covering product catalogue, cart and order flows.",
    category: "backend",
    stack: ["Django", "DRF", "PostgreSQL", "Python"],
    links: { github: `${GH}/storefront2` },
    highlight: false,
    image: null,
    order: 11,
  },
  {
    slug: "c-shirts-store",
    title: "C-Shirts Store API",
    oneLiner: "ASP.NET Core commerce API on .NET 9.",
    description:
      "A C# commerce API built on ASP.NET Core and .NET 9, mirroring the storefront domain in a typed, compiled stack.",
    category: "backend",
    stack: ["C#", "ASP.NET Core", ".NET 9"],
    links: { github: `${GH}/c-shirts-store` },
    highlight: false,
    image: null,
    order: 12,
  },
];

export const flagshipProjects = projects
  .filter((project) => project.highlight)
  .sort((a, b) => a.order - b.order);

export const secondaryProjects = projects
  .filter((project) => !project.highlight)
  .sort((a, b) => a.order - b.order);

/** Projects with a written case study get their own /projects/[slug] route. */
export const caseStudyProjects = projects.filter(
  (project) => project.caseStudy,
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
