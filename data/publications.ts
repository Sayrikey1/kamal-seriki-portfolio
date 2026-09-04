import type { Publication } from "@/types/content";

/**
 * Verified against the Google Scholar profile of Kamaldeen Teniola Seriki
 * (University of Lagos). Citation counts are point-in-time and will drift.
 */
export const publications: Publication[] = [
  {
    title:
      "Predictive maintenance of an hydraulic system using spiking neural networks",
    authors: "A. O. Bakare, S. A. Animashaun, K. T. Seriki, M. M. Ogunbiyi",
    venue: "SPE Nigeria Annual International Conference and Exhibition",
    year: 2025,
    citations: 2,
  },
  {
    title:
      "Using Convolutional Neural Network for the Detection of Offshore and Onshore Oil Spills",
    authors:
      "A. O. Bakare, K. T. Seriki, F. O. Emmanuel, S. T. Osunba, S. E. Ayoigbala, et al.",
    venue: "SPE Nigeria Annual International Conference and Exhibition",
    year: 2025,
    citations: 1,
  },
  {
    title:
      "Predicting Proton Exchange Membrane Fuel Cell Performance through Advanced Machine Learning Techniques: A Comparative Analysis of Ensemble Techniques",
    authors: "A. O. Bakare, K. T. Seriki, S. M. Osunba",
    venue: "Scientia. Technology, Science and Society",
    year: 2025,
    citations: 0,
  },
];

export const scholarProfile = {
  name: "Kamaldeen Teniola Seriki",
  affiliation: "University of Lagos",
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Heat Transfer",
    "Energy",
    "Robotics",
  ],
};
