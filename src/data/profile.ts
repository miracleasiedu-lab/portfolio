/**
 * About, skills and CV content.
 * Wording comes from the portfolio brief and the CV supplied.
 */

export const summary =
  "Data Analyst with 3+ years of experience in SQL, Python, Power BI, data modelling, reporting automation and business intelligence.";

export const aboutParagraphs = [
  "I'm a London-based Data Analyst with more than three years of experience turning large, messy datasets into dashboards, models and recommendations that people can act on. I work across SQL, Python, Power BI, Tableau and Excel, and I care as much about whether the numbers are right as about how they're presented.",
  "Day to day that means business intelligence and reporting automation: building Power BI dashboards from requirements to deployment, writing SQL to extract and validate data, and defining KPIs with the teams who will use them. I also run statistical analysis and A/B tests, and build machine learning models for prediction and segmentation when a problem calls for it.",
  "My projects follow the same discipline: check the data before trusting it, model relationships explicitly, report associations as associations, and say plainly what the data cannot show. The case studies on this site cover NHS A&E performance, e-commerce, football recruitment, fraud detection, HR attrition and marketing conversion.",
  "I studied Biomedical Science at the University of East London, which is where I learned to think in terms of evidence, sample sizes and confounders, and I've since completed postgraduate study in Data Analytics and Generative AI.",
];

export const strengths = [
  {
    title: "Business intelligence & reporting automation",
    body: "Power BI dashboards from requirements to deployment, DAX measures, Power Query and automated reporting that replaces manual work.",
  },
  {
    title: "Data modelling & validation",
    body: "Star schemas, primary and foreign key checks, relationship validation and join-inflation tests before any number is reported.",
  },
  {
    title: "Statistical analysis",
    body: "Hypothesis tests, effect sizes, A/B testing and correlation analysis, with associations kept separate from causes.",
  },
  {
    title: "Machine learning & predictive analytics",
    body: "Classification, clustering, threshold selection and SHAP explanations, evaluated on metrics that suit imbalanced problems.",
  },
  {
    title: "Stakeholder communication",
    body: "KPIs defined with the people who use them, and findings written for managers as decisions, not just charts.",
  },
  {
    title: "Business problem-solving",
    body: "Every analysis starts from a stakeholder question and ends with prioritised, evidence-linked recommendations.",
  },
];

export type SkillGroup = {
  title: string;
  icon: "code" | "database" | "chart" | "library" | "workflow" | "brain";
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    icon: "code",
    description: "Languages I use to extract, transform and analyse data.",
    skills: ["Python", "SQL", "R"],
  },
  {
    title: "Databases",
    icon: "database",
    description: "Relational databases for modelling, querying and validation.",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Business Intelligence",
    icon: "chart",
    description: "Dashboards and reporting for decision-makers.",
    skills: ["Power BI", "Tableau", "Excel", "DAX"],
  },
  {
    title: "Python Libraries",
    icon: "library",
    description: "The analysis and modelling stack behind my notebooks.",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
  },
  {
    title: "Data Engineering",
    icon: "workflow",
    description: "Getting data into a trustworthy, analysis-ready shape.",
    skills: ["ETL", "Power Query", "Data Modelling", "Data Validation"],
  },
  {
    title: "Advanced Analytics",
    icon: "brain",
    description: "Statistical and machine learning methods for harder questions.",
    skills: ["Machine Learning", "Statistical Analysis", "Classification", "Clustering", "A/B Testing"],
  },
];

export type Role = {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

/**
 * Bullets are taken from the supplied CV. Lines that still contained [X]
 * placeholders were shortened to the parts that were complete.
 */
export const experience: Role[] = [
  {
    title: "Data Analyst",
    company: "DataMetrics Ltd",
    location: "London, UK",
    start: "June 2023",
    end: "Present",
    bullets: [
      "Designed and delivered automated Power BI dashboards for senior leaders, from requirements to deployment, cutting manual reporting time by 40%.",
      "Ran 10+ end-to-end A/B tests on user onboarding flows, from hypothesis to recommendation, pinpointing key drop-off points and contributing to a 12% improvement in conversion rates.",
      "Wrote complex SQL queries to extract, clean and validate customer records, applying UK GDPR principles such as data minimisation and role-based access.",
      "Partnered with business teams to define KPIs and translate requirements into analytical solutions, presenting monthly insights.",
    ],
  },
  {
    title: "Data Analyst Intern",
    company: "RetailPulse Analytics",
    location: "London, UK",
    start: "January 2022",
    end: "May 2023",
    bullets: [
      "Cleaned and preprocessed transactional records using Python and Pandas for market research and business analysis.",
      "Produced weekly KPI reports on inventory turnover and sales performance for regional managers.",
      "Analysed transactional data to identify sales trends that informed business decisions.",
    ],
  },
];

export const education = [
  {
    qualification: "Postgraduate Programme in Data Analysis & Generative AI",
    institution: null as string | null,
    dates: "February 2026 – September 2026",
    detail:
      "Applied data analysis, visualisation, SQL and statistical analysis to real-world problems, and integrated generative AI into analytical workflows through reports, dashboards and portfolio projects.",
  },
  {
    qualification: "BSc (Hons) Biomedical Science",
    institution: "University of East London",
    dates: "2021 – 2025",
    detail: "Classification: 2:2",
  },
];

export const cvSkills = [
  "SQL",
  "Python",
  "Power BI",
  "Tableau",
  "Excel",
  "Machine Learning",
  "Data Modelling",
];

/** Slugs of the projects listed on the CV page. */
export const cvProjectSlugs = [
  "nhs-ae-waiting-times",
  "olist-ecommerce-analytics",
  "fifa23-player-recruitment",
  "employee-attrition-prediction",
];
