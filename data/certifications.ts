import type { Certification, CommunityRole } from "@/types/content";

export const certifications: Certification[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI · Coursera",
    kind: "certification",
    detail:
      "Neural network architectures, optimisation and structuring machine learning projects.",
  },
  {
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI · Coursera",
    kind: "certification",
    detail:
      "Sequence models, attention and transformer architectures for language tasks.",
  },
  {
    title: "3rd Place · AI4D Yoruba Machine Translation Challenge",
    issuer: "Zindi",
    kind: "award",
    detail:
      "Placed third building machine translation models for Yoruba, a low-resource language.",
  },
  {
    title: "Notable projects",
    issuer: "Selected work",
    kind: "award",
    detail:
      "Staffing prediction models, viral content recommenders, fraud detection at a 98% F1-score, and motion detection systems.",
  },
];

export const communityRoles: CommunityRole[] = [
  {
    organization: "Data Science Nigeria · Unilag AI Club",
    role: "Mentor & Technical Lead",
  },
  {
    organization: "Machine Learning Lagos",
    role: "Project Lead",
  },
  {
    organization: "Google Developer Student Club",
    role: "Active Member & Contributor",
  },
];
