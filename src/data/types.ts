export const CATEGORIES = [
  "Excel",
  "SQL",
  "Python",
  "Power BI",
  "Tableau",
  "Machine Learning",
  "Live Analytics",
  "Business Case Studies",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type ImageAsset = {
  /** Path under /public, e.g. /projects/my-project/chart.webp */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** How a thumbnail fills its frame: charts are contained, dashboard screenshots cover. */
  fit?: "contain" | "cover";
};

export type LinkAsset = {
  href: string;
  label: string;
};

export type Kpi = {
  label: string;
  value: string;
  note?: string;
};

export type SimpleTable = {
  caption?: string;
  head: string[];
  rows: string[][];
  /** Index of the row to visually emphasise (e.g. the selected model). */
  highlightRow?: number;
};

export type BarChartData = {
  title: string;
  /** What the numbers are, e.g. "Conversion rate (%)". */
  unit: string;
  /** Format used for value labels. */
  format?: "percent" | "number" | "decimal";
  data: { label: string; value: number }[];
  /** Label of the bar to emphasise. */
  highlight?: string;
  /** Optional reference value drawn as a dashed line, e.g. an overall average. */
  reference?: { value: number; label: string };
  source: string;
};

export type CodeSnippet = {
  title: string;
  language: "sql" | "python" | "dax" | "excel";
  code: string;
};

export type AdvancedBlock = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: SimpleTable;
};

/**
 * Every field below is optional so case studies can be filled in gradually.
 * Anything left empty renders as a clearly marked "to be added" placeholder.
 */
export type CaseStudy = {
  businessProblem?: string[];
  dataset?: {
    summary: string[];
    facts?: Kpi[];
  };
  objectives?: string[];
  toolsDetail?: { tool: string; use: string }[];
  dataQuality?: string[];
  cleaning?: string[];
  dataModelling?: string[];
  kpis?: Kpi[];
  eda?: string[];
  advanced?: AdvancedBlock[];
  charts?: BarChartData[];
  code?: CodeSnippet[];
  insights?: string[];
  recommendations?: string[];
  limitations?: string[];
  conclusion?: string[];
};

export type Project = {
  slug: string;
  title: string;
  domain: string;
  stakeholder: string;
  categories: Category[];
  tools: string[];
  /** One or two sentences for the project card. */
  problem: string;
  /** One verified headline result, shown on cards and in the home page ledger. */
  headline: { value: string; label: string };
  featured: boolean;
  /** Cover image. Null renders a labelled placeholder thumbnail. */
  thumbnail: ImageAsset | null;
  gallery: ImageAsset[];
  links: {
    /** Null until the repository is published. Never guess a URL. */
    github: string | null;
    dashboard: LinkAsset | null;
    notebook: LinkAsset | null;
    dataset: LinkAsset | null;
  };
  /** Assets that exist in the project but are not yet on the site. */
  pendingAssets?: string[];
  caseStudy: CaseStudy;
};
