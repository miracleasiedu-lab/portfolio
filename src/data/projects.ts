import type { ImageAsset, Project } from "./types";

/**
 * PROJECT DATA
 * ------------
 * Every figure here was copied from the project's own report, notebook output or
 * results file. Nothing is estimated. To add or update a project, edit this file:
 * the gallery, filters, case-study pages, sitemap and home page all read from it.
 *
 * Links set to `null` render as clearly labelled "coming soon" states.
 * When you publish a repository, paste its URL into `links.github`.
 */

const img = (
  slug: string,
  name: string,
  width: number,
  height: number,
  alt: string,
  caption?: string,
): ImageAsset => ({
  src: `/projects/${slug}/${name}.webp`,
  width,
  height,
  alt,
  caption: caption ?? alt,
});

/* -------------------------------------------------------------------------- */
/* 1. NHS A&E                                                                  */
/* -------------------------------------------------------------------------- */
const NHS = "nhs-ae-waiting-times";
const nhs: Project = {
  slug: NHS,
  title: "NHS A&E Waiting-Time Performance Analysis",
  domain: "Healthcare / NHS operations",
  stakeholder: "Hospital Operations Manager",
  categories: ["Python", "Business Case Studies"],
  tools: ["Python", "Pandas", "NumPy", "Matplotlib"],
  problem:
    "Where is A&E demand creating four-hour breaches and severe admission delays across 205 NHS organisations, and which trusts face compounding pressure?",
  headline: { value: "22.5M", label: "A&E attendances analysed across 205 NHS organisations" },
  featured: true,
  thumbnail: img(NHS, "rate-by-month", 880, 495, ">4-hour breach rate by month, April 2025 to March 2026"),
  gallery: [
    img(NHS, "rate-by-month", 880, 495, "Overall >4-hour rate by month", "The breach rate peaked at 28.17% in January 2026, not in the busiest month."),
    img(NHS, "attendances-by-month", 880, 495, "Total A&E attendances by month", "Attendances peaked in March 2026 at 2,351,347."),
    img(NHS, "rate-by-region", 880, 495, ">4-hour rate by NHS region", "Midlands recorded the highest breach rate (28.17%); London the lowest (23.09%)."),
    img(NHS, "demand-vs-breaches", 660, 550, "Demand vs breaches at organisation-month level", "Attendances and breaches correlate strongly (r = 0.93)."),
    img(NHS, "dta-12-hour-waits", 880, 495, "DTA 12+ hour waits by month", "Severe post-decision-to-admit delays rose sharply in January 2026."),
    img(NHS, "priority-score", 990, 660, "Top 15 organisations by Operational Priority Score", "A project-derived composite score, not an official NHS measure."),
    img(NHS, "rate-month-region", 1100, 550, ">4-hour rate by month and region"),
    img(NHS, "attendance-mix", 990, 550, "Attendance volume by region and A&E type"),
  ],
  links: {
    github: null,
    dashboard: null,
    notebook: null,
    dataset: {
      href: "https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/",
      label: "NHS England A&E Attendances and Emergency Admissions",
    },
  },
  caseStudy: {
    businessProblem: [
      "Hospital Operations Managers need to know how much A&E demand they face, how many patients wait longer than four hours, how performance changes month to month, and which organisations and regions perform worst.",
      "They also need to see where severe post-decision-to-admit (DTA) delays occur and whether rising demand alone explains waiting-time pressure.",
    ],
    dataset: {
      summary: [
        "Ten monthly NHS England A&E CSV files (April 2025 to March 2026) were combined into one organisation-month dataset. June and August 2025 were not available, so the analysis covers 10 of the 12 intended months, and every total and trend refers to those 10 months.",
      ],
      facts: [
        { label: "Monthly files", value: "10 of 12" },
        { label: "Organisations", value: "205" },
        { label: "NHS regions", value: "7" },
        { label: "Rows after cleaning", value: "1,984" },
      ],
    },
    objectives: [
      "Quantify A&E demand and four-hour performance over the available months.",
      "Compare performance across organisations and NHS regions.",
      "Locate severe DTA 12+ hour admission delays.",
      "Test whether demand volume explains breach levels.",
      "Identify organisations with pressure across several indicators at once.",
    ],
    toolsDetail: [
      { tool: "Python (Pandas, NumPy)", use: "Combining monthly files, cleaning, derived metrics and aggregation" },
      { tool: "Matplotlib", use: "Trend, regional, correlation and ranking charts" },
    ],
    dataQuality: [
      "No missing values across the 22 source columns.",
      "No exact duplicate rows and no duplicate (month, organisation) pairs.",
      "No negative or impossible values in any numeric column.",
      "Each monthly file holds a pre-aggregated national TOTAL row. In the February 2026 file it was labelled inconsistently, so it was identified by Organisation Code instead.",
      "205 of the 206 organisation codes appear in every available month; the remainder most plausibly reflect trust mergers or service changes.",
    ],
    cleaning: [
      "Removed the 10 national TOTAL rows to prevent double counting (1,994 → 1,984 rows, 0.5%).",
      "Converted the month identifier to a true date for sorting and charting.",
      "Renamed 18 long source columns to analysis-ready labels.",
      "Derived total attendances, total >4-hour attendances, >4-hour and within-4-hour rates, total emergency admissions and a Type 1 >4-hour rate.",
    ],
    dataModelling: [
      "A single tidy fact table at organisation-month grain, with region (Parent Org) as the grouping dimension and derived rate columns calculated from summed counts rather than averaged percentages.",
    ],
    kpis: [
      { label: "Total A&E attendances", value: "22,518,704" },
      { label: "Attendances over 4 hours", value: "5,807,605" },
      { label: "Within-4-hour performance", value: "74.21%", note: "Against a 95% constitutional standard" },
      { label: "Overall >4-hour rate", value: "25.79%" },
      { label: "Type 1 >4-hour rate", value: "39.63%" },
      { label: "DTA 4–12 hour waits", value: "841,643" },
      { label: "DTA 12+ hour waits", value: "496,365" },
      { label: "Emergency admissions", value: "5,388,807" },
    ],
    eda: [
      "Demand and performance peak in different months: attendances peaked in March 2026 (2,351,347) while the breach rate peaked in January 2026 (28.17%).",
      "NHS England Midlands had the highest regional >4-hour rate (28.17%); London had the lowest (23.09%).",
      "Type 1 (major) departments account for most attendances in every region, while Type 2 and other department activity varies considerably by region.",
      "Royal Free London NHS Foundation Trust recorded the highest total DTA 12+ hour waits (19,255 patients).",
    ],
    advanced: [
      {
        title: "Demand vs breaches",
        paragraphs: [
          "Attendances and >4-hour breaches are strongly correlated at organisation-month level (r = 0.93), so breaches broadly track volume, but some organisations perform much better or worse than volume alone predicts.",
          "Emergency admissions and DTA 12+ hour waits show only a moderate correlation (r = 0.63), pointing to downstream bed and discharge capacity as part of the story.",
        ],
      },
      {
        title: "Operational Priority Score (project-derived)",
        paragraphs: [
          "A composite score combining demand, >4-hour rate, DTA 12+ hour delays and emergency admissions, each min-max normalised to 0–1 and averaged with equal weights. University Hospitals Birmingham NHS Foundation Trust ranks highest (0.87), showing simultaneous pressure across all four dimensions. This is not an official NHS KPI and different weightings would change the ranking.",
        ],
      },
      {
        title: "Top organisations by total >4-hour breaches",
        table: {
          head: ["Organisation", ">4-hour breaches"],
          rows: [
            ["University Hospitals Birmingham NHS FT", "141,140"],
            ["Barts Health NHS Trust", "128,169"],
            ["Manchester University NHS FT", "109,406"],
            ["University Hospitals Sussex NHS FT", "107,192"],
            ["Northern Care Alliance NHS FT", "106,959"],
          ],
        },
      },
    ],
    code: [
      {
        title: "Operational Priority Score (nhs_ae_analysis.py)",
        language: "python",
        code: `org_scores = df.groupby(["Org Code", "Org name"]).agg(
    total_attendances=("total_attendances", "sum"),
    total_over4hrs=("total_over4hrs", "sum"),
    dta_12plus=("dta_12_plus_hours", "sum"),
    total_emergency_admissions=("total_emergency_admissions", "sum"),
)
org_scores["over4hr_rate"] = org_scores["total_over4hrs"] / org_scores["total_attendances"] * 100

def minmax(s):
    rng = s.max() - s.min()
    return (s - s.min()) / rng if rng > 0 else s * 0

org_scores["norm_volume"] = minmax(org_scores["total_attendances"])
org_scores["norm_rate"] = minmax(org_scores["over4hr_rate"])
org_scores["norm_dta12"] = minmax(org_scores["dta_12plus"])
org_scores["norm_admissions"] = minmax(org_scores["total_emergency_admissions"])

org_scores["operational_priority_score"] = org_scores[
    ["norm_volume", "norm_rate", "norm_dta12", "norm_admissions"]
].mean(axis=1)`,
      },
    ],
    insights: [
      "74.21% of attendances were seen within four hours, below the 95% NHS constitutional standard.",
      "The busiest month (March 2026) was not the worst-performing month (January 2026).",
      "University Hospitals Birmingham recorded the most >4-hour breaches (141,140) and tops the Operational Priority Score.",
      "Midlands performed worst overall (28.17%) and London best (23.09%).",
      "Demand explains much of the breach volume (r = 0.93) but not all of it, so flow and capacity matter too.",
      "Pressure is both system-wide and concentrated in an identifiable subset of organisations, which suggests a two-track response.",
    ],
    recommendations: [
      "Check whether staffing rotas at the highest-pressure organisations match observed attendance and breach patterns.",
      "Investigate bed occupancy and escalation capacity at organisations with high DTA 12+ hour waits.",
      "Review end-to-end patient flow where breach rates are high despite moderate volume.",
      "Investigate discharge processes and delayed transfers at organisations flagged for severe DTA delay.",
      "Use the monthly trend for seasonal capacity planning, noting the 10-month coverage.",
      "Benchmark practice between the best- and worst-performing regions.",
      "Prioritise operational reviews at the organisations ranked highest on the Operational Priority Score.",
    ],
    limitations: [
      "Covers 10 of 12 intended months; June and August 2025 are excluded.",
      "Organisation-month aggregates only: no patient-level age, diagnosis or individual wait times.",
      "Organisations differ in size and configuration, so raw counts partly reflect scale.",
      "Correlations describe association, not causation.",
      "Staffing, outbreaks, estate issues and seasonal illness are not captured.",
      "The Operational Priority Score uses judgement-based equal weights.",
    ],
    conclusion: [
      "Across 22.5 million attendances, performance sits well below the 95% standard, and waiting-time pressure and severe DTA delays are concentrated in a defined group of organisations and one region. Investigation should start with the organisations flagged by the priority score and the DTA analysis, looking at bed capacity, discharge flow and staffing around the January peak.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 2. Olist                                                                    */
/* -------------------------------------------------------------------------- */
const olist: Project = {
  slug: "olist-ecommerce-analytics",
  title: "Olist E-Commerce Sales & Customer Analytics",
  domain: "E-commerce / Retail",
  stakeholder: "Sales Director / E-commerce Manager",
  categories: ["SQL", "Business Case Studies"],
  tools: ["MySQL 8.0", "SQL (CTEs, window functions, views)", "Python (report build)"],
  problem:
    "Nine raw Olist tables, no enforced keys and a growth plateau: what drives revenue, delivery performance and customer satisfaction, and where should the business act?",
  headline: { value: "R$13.22M", label: "Product revenue modelled from 96,478 delivered orders in MySQL" },
  featured: true,
  thumbnail: null,
  gallery: [],
  links: {
    github: null,
    dashboard: null,
    notebook: null,
    dataset: {
      href: "https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce",
      label: "Brazilian E-Commerce Public Dataset by Olist (Kaggle)",
    },
  },
  pendingAssets: [
    "Power BI dashboard built on the SQL views",
    "Entity-relationship diagram image",
  ],
  caseStudy: {
    businessProblem: [
      "Olist grew strongly through 2017 but monthly revenue plateaued in 2018, hovering between roughly R$0.83M and R$0.98M. Year-on-year growth fell from +727% in January to +51% in August.",
      "Management needed to know which levers (delivery, sellers, geography, retention, category mix) are most closely tied to revenue and satisfaction.",
    ],
    dataset: {
      summary: [
        "Nine CSV files covering orders, customers, items, payments, reviews, products, sellers, geolocation and category translations, from September 2016 to October 2018. Trend analysis uses the 20 complete trading months from January 2017 to August 2018.",
        "The reviews file has 104,720 physical lines but 99,224 records, because free-text comments contain line breaks. One comment ending in a backslash merged two reviews under MySQL's default escaping, so every load uses ESCAPED BY ''.",
      ],
      facts: [
        { label: "Source tables", value: "9" },
        { label: "Orders", value: "99,441" },
        { label: "Order items", value: "112,650" },
        { label: "Geolocation points", value: "1,000,163" },
      ],
    },
    objectives: [
      "Build a typed, constrained relational database from raw staging tables.",
      "Prove relationships and prevent join inflation with a two-grain analytical layer.",
      "Define 10 KPIs and run 30 univariate, bivariate and multivariate analyses.",
      "Deep-dive customers, products, sellers, delivery and time series.",
      "Give the Sales Director prioritised, evidence-linked recommendations.",
    ],
    toolsDetail: [
      { tool: "MySQL 8.0", use: "Staging load, 23 data-quality checks, cleaning, constraints and views" },
      { tool: "Advanced SQL", use: "CTEs, window functions (LAG, ROW_NUMBER, NTILE, RANK), conditional aggregation" },
      { tool: "Python", use: "run_sql.py and build_report.py regenerate the report tables from live query output" },
    ],
    dataQuality: [
      "Missing order timestamps are structural (undelivered orders have no delivery date). The true anomalies were 8 delivered orders with no delivery date, 14 with no approval time and 6 cancelled orders with a delivery date.",
      "610 products have no category and 4 weigh 0 g.",
      "547 orders have multiple reviews.",
      "Geolocation is not unique per ZIP prefix and includes out-of-Brazil points.",
      "162 ZIP prefixes used by customers or sellers are missing from the geolocation file.",
    ],
    cleaning: [
      "Cast text columns to proper types (CHAR(32) IDs, DATETIME, DECIMAL, ENUM).",
      "Converted 4,908 blank timestamp cells to NULL and kept the rows.",
      "Flagged 1,388 delivered orders with inconsistent timestamps and excluded them from stage timing only.",
      "Kept uncategorised products with a NULL foreign key, labelled 'uncategorized' in views.",
      "Chose the latest review per order with ROW_NUMBER() in views.",
      "De-duplicated and filtered geolocation from 1,000,163 points to 19,015 ZIP prefixes.",
      "Added the 162 missing ZIP prefixes with has_geolocation = 0 so foreign keys hold.",
    ],
    dataModelling: [
      "A constrained relational schema with primary and foreign keys enforced in MySQL, and an analytical layer at two grains (order and item) that structurally prevents join inflation.",
      "Validation showed every order has exactly one customer_id (1:1), while one person (customer_unique_id) can have up to 17 orders (1:many). Using customer_id would overstate the customer base by 3,120 (3.3%).",
      "Naively joining items and payments was shown to overstate revenue by 5% and payments by 29%.",
    ],
    kpis: [
      { label: "Product revenue (delivered)", value: "R$13.22M", note: "R$15.42M including freight" },
      { label: "Delivered orders", value: "96,478", note: "97.0% of all orders" },
      { label: "Unique customers", value: "93,358" },
      { label: "Average order value", value: "R$137.04", note: "Median R$86.57" },
      { label: "Items sold", value: "110,197" },
      { label: "Repeat customers", value: "3.0%", note: "5.5% of revenue" },
    ],
    eda: [
      "On-time orders average 4.29 stars; late orders average 2.27, and 62.4% of late orders receive a 1–2 star review.",
      "Satisfaction dips in Nov 2017 and Feb–Mar 2018 coincide with late-delivery spikes of up to 19%.",
      "64% of revenue is shipped by São Paulo sellers. Northeast customers wait 20 days on average (8.8 in SP) and pay 21.7% of product value in freight (13.9% in SP).",
      "18 of 74 categories produce 80% of revenue; the top 10% of sellers produce 67% and the top 10% of customers 41%.",
    ],
    advanced: [
      {
        title: "Delivery promise vs reality",
        paragraphs: [
          "Estimates allow about 23.7 days for about 12.6 days of actual delivery, yet 6.8% of orders still arrive late. 74% of delivery time is spent in transit, and sellers who miss the hand-over deadline quadruple the late rate.",
        ],
      },
      {
        title: "Seller quality",
        paragraphs: [
          "153 established sellers rated below 4.0 carry about 22% of established-seller revenue; the worst miss hand-over deadlines on a third of orders.",
        ],
      },
    ],
    code: [
      {
        title: "Days until a customer orders again (10_deep_dives.sql)",
        language: "sql",
        code: `WITH seq AS (
  SELECT customer_unique_id, order_purchase_timestamp,
         LAG(order_purchase_timestamp) OVER (PARTITION BY customer_unique_id
                                             ORDER BY order_purchase_timestamp) AS prev_ts
  FROM fact_order WHERE order_status = 'delivered'
)
SELECT CASE WHEN DATEDIFF(order_purchase_timestamp, prev_ts) = 0  THEN '1: same day'
            WHEN DATEDIFF(order_purchase_timestamp, prev_ts) <= 30 THEN '2: 1-30 days'
            WHEN DATEDIFF(order_purchase_timestamp, prev_ts) <= 90 THEN '3: 31-90 days'
            WHEN DATEDIFF(order_purchase_timestamp, prev_ts) <= 180 THEN '4: 91-180 days'
            ELSE '5: 181+ days' END AS gap_band,
       COUNT(*) AS repeat_orders,
       ROUND(100 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) AS pct
FROM seq WHERE prev_ts IS NOT NULL
GROUP BY gap_band ORDER BY gap_band;`,
      },
      {
        title: "KPI 1: total revenue (06_kpis.sql)",
        language: "sql",
        code: `SELECT ROUND(SUM(item_revenue), 2)                 AS total_revenue,
       ROUND(SUM(freight), 2)                      AS total_freight,
       ROUND(SUM(item_revenue + freight), 2)       AS gmv_incl_freight,
       ROUND(SUM(payment_value), 2)                AS total_payment_value
FROM fact_order
WHERE order_status = 'delivered';`,
      },
    ],
    insights: [
      "Growth has stalled and AOV has stayed flat (R$124–149), so historical growth came from acquiring new customers.",
      "Retention is close to zero: 3.0% of customers return, yet a second order roughly doubles lifetime value.",
      "Late delivery is the strongest correlate of dissatisfaction; 1-star reviews jump from about 7% to about 70% once orders are 8+ days late.",
      "The carrier leg is the bottleneck, with sellers responsible for a meaningful minority of late orders.",
      "Geography is a structural handicap: cross-state orders take twice as long and cost 72% more freight.",
      "Instalments power high-ticket sales, with 7+ instalment card orders forming the largest single pool of payment value.",
    ],
    recommendations: [
      "Make on-time delivery a managed KPI with carrier SLAs and a monthly late-rate target, prioritising RJ (12.1% late) and the Northeast.",
      "Pre-book peak-season carrier capacity before Black Friday and similar peaks.",
      "Introduce a monthly seller scorecard and improvement plans for the 153 at-risk sellers.",
      "Launch a retention programme in the 30–90-day post-delivery window.",
      "Recruit sellers in under-served regions or pilot regional fulfilment for top SKUs.",
      "Test free-shipping thresholds where freight exceeds about 20% of price.",
      "Require category, photos and dimensions at listing creation.",
    ],
    limitations: [
      "2016 and Sep–Oct 2018 are sparse; trends rely on Jan 2017 – Aug 2018.",
      "No cost, commission or margin data, so profitability cannot be assessed.",
      "Reviews are order-level; in 1,278 multi-seller orders a review is attributed to every seller.",
      "All relationships are observational associations.",
      "No traffic, conversion or marketing data to explain why growth plateaued.",
    ],
    conclusion: [
      "Nine raw files became a validated MySQL database with enforced keys and a two-grain analytical layer. The analysis points to three levers for the next phase of growth: delivery reliability, seller and regional supply quality, and retention. Because every metric is reproducible from SQL views, the KPIs can be refreshed monthly to track whether interventions work.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 3. FIFA 23                                                                  */
/* -------------------------------------------------------------------------- */
const FIFA = "fifa23-player-recruitment";
const fifa: Project = {
  slug: FIFA,
  title: "FIFA 23 Player Recruitment & Performance",
  domain: "Sports analytics / Football recruitment",
  stakeholder: "Sporting Director / Head of Recruitment",
  categories: ["Python", "Business Case Studies"],
  tools: ["Python", "Pandas", "NumPy", "Matplotlib", "scikit-learn"],
  problem:
    "18,401 players is too many to scout in person. Which players offer the most ability, ceiling and value for money by position?",
  headline: { value: "47", label: "Shortlisted players from 18,401, across five recruitment scenarios" },
  featured: true,
  thumbnail: img(FIFA, "league-value-efficiency", 889, 486, "League mean overall vs median player value"),
  gallery: [
    img(FIFA, "league-value-efficiency", 889, 486, "League mean overall vs median player value", "Brazil's Série A sits about 40% below the price its quality predicts."),
    img(FIFA, "data-model", 980, 521, "Two-table data model and analytical dataset", "Two tables with no shared ID joined one-to-many on a cleaned club name."),
    img(FIFA, "age-vs-growth", 800, 396, "Age vs potential growth", "Development headroom averages 12.5 points at 21 or under and falls below 1 point by 27."),
    img(FIFA, "overall-vs-value", 800, 396, "Overall rating vs market value (log scale)"),
    img(FIFA, "value-heatmap", 762, 315, "Median value of 80+ rated players by position and age"),
    img(FIFA, "blocked-prospects", 711, 333, "High-growth players by league tier and squad role", "84% of high-growth players aged 23 or under are substitutes or reserves."),
    img(FIFA, "player-comparison", 1020, 395, "Player comparison tool output: Pedri, Gavi and Bellingham"),
    img(FIFA, "recruitment-score", 1070, 350, "Recruitment score distribution and score vs overall"),
  ],
  links: {
    github: null,
    dashboard: null,
    notebook: null,
    dataset: null,
  },
  pendingAssets: [
    "Dataset source link",
    "Tableau dashboard of the shortlists",
  ],
  caseStudy: {
    businessProblem: [
      "Recruitment decisions are expensive and hard to reverse. Ten scouts watching three players a day would need about 20 months to see all 18,401 players once.",
      "Without structure, clubs overpay for reputation and miss undervalued players in less-watched leagues. The department needed a data-led first filter so live scouting time goes to the players most worth watching.",
    ],
    dataset: {
      summary: [
        "Two raw FIFA 23 tables (players and teams) from the start of the 2022/23 season. The tables share no ID column, the players table has no player ID at all, and the join is only possible on club name.",
      ],
      facts: [
        { label: "Players (clean)", value: "18,401" },
        { label: "Clubs", value: "677" },
        { label: "Leagues", value: "52" },
        { label: "Free agents", value: "90" },
      ],
    },
    objectives: [
      "Build a validated player-level dataset enriched with club and league context.",
      "Describe the market and find development and value opportunities.",
      "Create a transparent, position-specific recruitment score.",
      "Build a reusable player-comparison tool and scenario shortlists.",
    ],
    toolsDetail: [
      { tool: "Pandas", use: "Profiling, key checks, cleaning and a validated many-to-one merge" },
      { tool: "scikit-learn", use: "Value-driver regression (R² = 0.973)" },
      { tool: "Matplotlib", use: "30 charts including heatmaps, bubble and radar charts" },
    ],
    dataQuality: [
      "No player ID column and 119 exact duplicate rows.",
      "1,563 players share a display name, so names cannot be a key.",
      "A trailing space in one team name silently broke 28 player matches.",
      "Goalkeeper ratings stored in outfield columns (Pace, Shooting and so on).",
      "Zeros standing in for missing values (free agents, players aged 40+).",
      "A fictional club (AFC Richmond) present in both tables.",
    ],
    cleaning: [
      "Recovered the sofifa player number from the image URL as player_id, unique after de-duplication.",
      "Normalised whitespace, lifting the match rate from 99.85% to 100% for contracted players.",
      "Set outfield face stats to NaN for goalkeepers and used goalkeeper attributes instead.",
      "Converted disguised zeros to NaN.",
      "Removed the fictional club from both tables.",
    ],
    dataModelling: [
      "Teams modelled as a dimension (one row per club, primary key team_id) and players as a fact-style entity (one row per player card, primary key player_id).",
      "Foreign key club_name → teams.team_name, one team to 18–33 players, with 90 free agents having no team.",
      "pd.merge(how='left', validate='many_to_one', indicator=True) kept all 18,401 rows with zero row multiplication; all 90 unmatched rows were verified free agents.",
    ],
    kpis: [
      { label: "Players rated 80+", value: "2.7%" },
      { label: "Value held by top 5%", value: "50.2%" },
      { label: "Average overall", value: "65.78", note: "Median 66" },
      { label: "Median market value", value: "€0.97m", note: "Mean €2.84m" },
      { label: "High-potential players (≥80)", value: "1,647", note: "8.95% of players" },
      { label: "75+ players, contracts ending by 2023", value: "472", note: "27.0% of contracted 75+ players" },
    ],
    eda: [
      "Development headroom averages 12.5 points at age 21 or under and drops below 1 point by 27.",
      "Goalkeepers cost about 40% less than outfield players with the same rating, and the market barely prices pace.",
      "The 15 most valuable squads hold 24.7% of all value, while development clubs such as Ajax, Sporting CP, Salzburg and Anderlecht hold as many prospects as the richest clubs.",
      "524 of the 968 players aged 23 or under with potential 80+ cost €10m or less and earn €15k a week or less.",
    ],
    advanced: [
      {
        title: "Position-specific recruitment score",
        paragraphs: [
          "Score = 100 × (0.40 × ability + 0.25 × potential + 0.15 × growth + 0.20 × value efficiency), where each component is a percentile rank within the player's position group. Ability is a weighted composite of role-specific attributes.",
          "Only 5 of the top 100 players by score are also in the top 100 by overall, and the score correlates with overall at 0.79, so it is related to ability without duplicating it.",
        ],
      },
      {
        title: "Scenario shortlists",
        table: {
          head: ["Shortlist", "Criteria", "Eligible", "Leading names"],
          rows: [
            ["A: Young high-potential", "Age ≤ 21, potential ≥ 83", "257", "C. Lukeba, W. Saliba, A. Bella Kotchap"],
            ["B: Value for money", "Overall ≥ 75, age ≤ 28, value ≤ €10m", "37", "F. Medina, L. Thomas, Paulinho"],
            ["C: High-potential attackers", "Attacker, age ≤ 23, potential ≥ 82", "91", "A. Kalimuendo, Rafael Leão, Tiago Tomás"],
            ["D: Midfield", "Age 21–27, overall ≥ 76, value ≤ €30m", "223", "S. Özcan, Y. Fofana, M. Caqueret"],
            ["E: Defensive", "Age ≤ 26, overall ≥ 74, value ≤ €20m", "220", "C. Lukeba, N. Collins, D. Zima"],
          ],
        },
      },
    ],
    code: [
      {
        title: "Validated many-to-one merge (Stage 7)",
        language: "python",
        code: `rows_before = len(players_clean)

df = pd.merge(
    players_clean,
    teams_clean,
    left_on="club_name",
    right_on="team_name",
    how="left",
    validate="many_to_one",
    indicator=True,
)

rows_after = len(df)
print(f"Row multiplication: {rows_after - rows_before}")
print(f"player_id still unique: {df['player_id'].is_unique}")

# Every unmatched row must be a free agent, and every free agent must be unmatched
print("left_only rows that are NOT free agents:",
      int(((df['_merge'] == 'left_only') & ~df['is_free_agent']).sum()))`,
      },
    ],
    insights: [
      "Elite talent is scarce and expensive: budgets should be set from medians within a quality band, not means.",
      "Growth is almost entirely age-driven and gone by 27.",
      "84% of high-growth players aged 23 or under are substitutes or reserves, including 383 with potential 80+.",
      "FIFA values follow a near-formula (R² = 0.973), giving a fair-price benchmark for negotiation.",
      "Brazil's Série A is about 40% cheaper than its quality predicts; the Premier League carries the largest premium.",
    ],
    recommendations: [
      "Restrict development and resale signings to players aged 23 or under.",
      "Shift scouting coverage toward under-priced markets (Brazil, Turkey) and development clubs.",
      "Build a watchlist of the 169 prime-age 75+ players with contracts ending in 2023.",
      "Treat goalkeeping as a value position.",
      "Pursue loan-to-buy deals for the 383 blocked high-potential youngsters.",
      "Start early on scarce profiles: only 74 left-footed centre-backs exist in the 75–82 band.",
      "Send multi-list players (Lukeba, Wahi, Medina) to live scouting first.",
    ],
    limitations: [
      "Ratings are EA Sports game assessments, not match data.",
      "FIFA values follow a formula and are not real transfer fees.",
      "A single snapshot from the start of 2022/23.",
      "The name-based join validated at 100% here, but text keys are fragile across versions.",
      "Score weights are judgement-based and should change with tactical system.",
      "Minutes, injuries, personality and work permits are absent.",
    ],
    conclusion: [
      "Two imperfect tables with no shared ID became one validated, auditable dataset through key assessment, relationship testing and a constrained merge. The analysis shows where talent, ceiling and value sit in the market and turns that into a short, defensible list of names. It does not replace scouts; it tells them where to look first.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 4. Employee attrition                                                       */
/* -------------------------------------------------------------------------- */
const ATT = "employee-attrition-prediction";
const attrition: Project = {
  slug: ATT,
  title: "Employee Attrition Prediction",
  domain: "HR / People analytics",
  stakeholder: "HR Manager / People Analytics Manager",
  categories: ["Python", "Machine Learning"],
  tools: ["Python", "Pandas", "scikit-learn", "XGBoost", "SHAP", "SciPy"],
  problem:
    "Which workforce patterns are associated with employees leaving, and can a model prioritise supportive retention conversations without judging individuals?",
  headline: { value: "0.813", label: "Test ROC-AUC for the selected logistic regression attrition model" },
  featured: true,
  thumbnail: img(ATT, "overtime-x-jobrole", 1332, 882, "Attrition rate by job role and overtime"),
  gallery: [
    img(ATT, "overtime-x-jobrole", 1332, 882, "Attrition rate (%) by job role and overtime", "Sales Representatives working overtime leave at 66.7%."),
    img(ATT, "attrition-by-jobrole", 1600, 546, "Attrition rate by job role", "Sales Representatives have the highest attrition at 39.8%."),
    img(ATT, "tenure-band", 1600, 483, "Attrition by tenure band", "First-year attrition is 34.9%."),
    img(ATT, "model-comparison", 1600, 571, "Test-set metrics for all three models at threshold 0.50"),
    img(ATT, "threshold-analysis", 1600, 470, "Threshold sweep on out-of-fold training predictions", "The F2-optimal threshold of 0.20 was chosen on training data only."),
    img(ATT, "threshold-confusion", 1318, 582, "Confusion matrices at thresholds 0.50 and 0.20", "Lowering the threshold to 0.20 catches 30 of 47 test leavers."),
    img(ATT, "shap-beeswarm", 1435, 1040, "XGBoost SHAP beeswarm", "Overtime is the #1 driver of predicted risk in both models."),
    img(ATT, "shap-importance", 1337, 888, "XGBoost mean |SHAP| importance"),
  ],
  links: {
    github: null,
    dashboard: null,
    notebook: { href: "/notebooks/employee-attrition-prediction.html", label: "Full notebook (HTML)" },
    dataset: {
      href: "https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset",
      label: "IBM HR Analytics Employee Attrition & Performance (Kaggle)",
    },
  },
  caseStudy: {
    businessProblem: [
      "Attrition is costly, and HR teams need to know which patterns are associated with leaving and where to focus supportive retention effort.",
      "Any model must be used only to prioritise supportive conversations, never for punitive employment decisions.",
    ],
    dataset: {
      summary: [
        "The IBM HR Analytics Employee Attrition dataset: a fictional dataset created by IBM data scientists for teaching. Findings illustrate a method that must be rebuilt on an organisation's own data.",
      ],
      facts: [
        { label: "Employees", value: "1,470" },
        { label: "Leavers", value: "237" },
        { label: "Columns", value: "35" },
        { label: "Attrition rate", value: "16.1%" },
      ],
    },
    objectives: [
      "Identify workforce patterns associated with attrition using rates and significance tests.",
      "Build and compare three classifiers without leakage.",
      "Choose a decision threshold suited to a supportive HR use case.",
      "Explain predictions with SHAP and cross-check across models.",
    ],
    toolsDetail: [
      { tool: "SciPy", use: "Chi-square with Cramér's V and Mann-Whitney U tests" },
      { tool: "scikit-learn", use: "Pipeline + ColumnTransformer, stratified CV, GridSearch on PR-AUC" },
      { tool: "XGBoost", use: "Gradient-boosted comparison model" },
      { tool: "SHAP", use: "TreeSHAP on XGBoost and linear SHAP on logistic regression" },
    ],
    dataQuality: [
      "Checked missing values, duplicates, invalid codes and logical consistency (e.g. years in role ≤ years at company).",
      "Checked constant columns, IQR outliers, class imbalance, multicollinearity and target leakage.",
    ],
    cleaning: [
      "Removed the constant columns EmployeeCount, Over18 and StandardHours, and the identifier EmployeeNumber.",
      "Kept genuine high earners and long-tenure 'outliers'.",
    ],
    dataModelling: [
      "Stratified 80/20 split; all preprocessing (one-hot encoding, scaling for logistic regression only) fitted inside pipelines on training folds.",
      "Hyperparameters tuned by 5-fold stratified CV on PR-AUC; the test set used once per model.",
      "Class imbalance handled through class_weight / scale_pos_weight and an explicit threshold choice.",
    ],
    kpis: [
      { label: "Overall attrition", value: "16.1%" },
      { label: "Attrition with overtime", value: "30.5%", note: "vs 10.4% without (2.93×)" },
      { label: "Highest-attrition role", value: "39.8%", note: "Sales Representative" },
      { label: "First-year attrition", value: "34.9%" },
      { label: "Test ROC-AUC / PR-AUC", value: "0.813 / 0.591" },
      { label: "Recall at threshold 0.20", value: "0.638", note: "30 of 47 test leavers" },
    ],
    eda: [
      "Overtime risk concentrates in front-line roles: with overtime, Sales Representatives leave at 66.7%, Laboratory Technicians at 50.0%, Research Scientists at 34.0% and Sales Executives at 33.0%.",
      "First-year attrition reaches 44–49% for early-career, Level 1 hires.",
      "Young, low-paid employees show the highest age-pay attrition (43.2%).",
      "Role matters far more than department (Cramér's V 0.242 vs 0.086).",
      "The company-wide pay gap is mostly a role-mix effect.",
    ],
    advanced: [
      {
        title: "Model comparison (test set at 0.50, plus 5-fold CV)",
        table: {
          head: ["Model", "Accuracy", "Precision", "Recall", "F1", "ROC-AUC", "PR-AUC", "CV PR-AUC"],
          rows: [
            ["Logistic Regression", "0.867", "0.667", "0.340", "0.451", "0.813", "0.591", "0.651 ± 0.061"],
            ["Random Forest", "0.827", "0.409", "0.191", "0.261", "0.779", "0.409", "0.565 ± 0.070"],
            ["XGBoost", "0.861", "0.667", "0.255", "0.369", "0.799", "0.523", "0.648 ± 0.051"],
          ],
          highlightRow: 0,
        },
        paragraphs: [
          "Selection used cross-validated PR-AUC with a one-standard-error parsimony rule, not test results. Logistic regression and XGBoost tie in CV, so the simpler, more interpretable model was chosen; it is also best on every test ranking metric.",
        ],
      },
      {
        title: "Threshold for a supportive use case",
        paragraphs: [
          "An F2 (recall-weighted) sweep on out-of-fold training predictions selected 0.20. Applied once to the test set it gives recall 0.638 and precision 0.417, which is 2.6× the base rate.",
        ],
      },
    ],
    charts: [
      {
        title: "Attrition rate with overtime, by job role",
        unit: "Attrition rate (%)",
        format: "percent",
        data: [
          { label: "Sales Representative", value: 66.7 },
          { label: "Laboratory Technician", value: 50.0 },
          { label: "Research Scientist", value: 34.0 },
          { label: "Sales Executive", value: 33.0 },
        ],
        reference: { value: 16.1, label: "Company average 16.1%" },
        source: "Notebook analysis M1 (employees working overtime only)",
      },
    ],
    code: [
      {
        title: "Out-of-fold threshold selection (F2)",
        language: "python",
        code: `oof = cross_val_predict(final_model, X_train, y_train, cv=CV,
                        method="predict_proba", n_jobs=-1)[:, 1]

def threshold_table(y_true, proba, thresholds):
    rows = []
    for t in thresholds:
        p = (proba >= t).astype(int)
        tn, fp, fn, tp = confusion_matrix(y_true, p).ravel()
        rows.append({"Threshold": round(t, 2), "Flagged": tp + fp,
                     "Precision": precision_score(y_true, p, zero_division=0),
                     "Recall": recall_score(y_true, p),
                     "F1": f1_score(y_true, p),
                     "F2": fbeta_score(y_true, p, beta=2)})
    return pd.DataFrame(rows).set_index("Threshold").round(3)

grid = np.round(np.arange(0.05, 0.91, 0.05), 2)
oof_table = threshold_table(y_train, oof, grid)
CHOSEN_T = float(oof_table["F2"].idxmax())   # 0.20`,
      },
    ],
    insights: [
      "Overtime is the strongest, most consistent signal and the #1 SHAP feature in both models.",
      "Overtime risk persists even among employees who rate their work-life balance well.",
      "The first year is the danger zone, especially for early-career Level 1 hires.",
      "Low environment satisfaction, job satisfaction and involvement are consistent warning signals.",
      "Stock options and marital status are entangled in this dataset (every single employee has stock level 0) and need verifying before action.",
      "The model is good enough to prioritise supportive outreach, not to judge individuals.",
    ],
    recommendations: [
      "Review overtime in front-line roles.",
      "Introduce structured first-year onboarding for early-career hires.",
      "Review within-role pay positioning for low-paid, high-attrition roles.",
      "Create clear progression out of Level 1.",
      "Use stay interviews, manager continuity and team-level pulse surveys.",
      "Pilot travel and commute flexibility.",
      "Deploy the model only for governed, supportive outreach after a fairness review.",
    ],
    limitations: [
      "Small (1,470 rows), imbalanced and synthetic dataset.",
      "Observational associations only.",
      "No exit-reason field to separate resignation from retirement.",
      "Undocumented snapshot timing and omitted variables such as manager quality and market pay.",
      "Sensitive attributes are among the inputs, so a fairness review is required.",
    ],
    conclusion: [
      "The analysis shows overtime, role, early tenure and pay position as the clearest attrition signals, and a logistic regression model at a 0.20 threshold finds about two in three leavers at 2.6× the base rate. The method transfers; the numbers, model and threshold must be rebuilt and validated on an organisation's own data.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 5. Credit card fraud                                                        */
/* -------------------------------------------------------------------------- */
const FRAUD = "credit-card-fraud-detection";
const fraud: Project = {
  slug: FRAUD,
  title: "Credit Card Fraud Detection",
  domain: "Finance / Fraud analytics",
  stakeholder: "Fraud Risk Manager",
  categories: ["Python", "Machine Learning"],
  tools: ["Python", "Pandas", "scikit-learn", "imbalanced-learn", "XGBoost", "SHAP"],
  problem:
    "Fraud is 0.17% of transactions. How do you catch it without blocking genuine customers, and where should the alert threshold sit?",
  headline: { value: "73 of 95", label: "Test frauds caught with a single false alarm (precision 0.987)" },
  featured: false,
  thumbnail: img(FRAUD, "test-confusion-matrix", 470, 426, "Test confusion matrix at threshold 0.43"),
  gallery: [
    img(FRAUD, "test-confusion-matrix", 470, 426, "Test confusion matrix at threshold 0.43", "73 frauds caught, 1 false alarm, 22 missed among 56,746 test transactions."),
    img(FRAUD, "test-curves", 1418, 514, "Test precision-recall and ROC curves for the selected XGBoost model"),
    img(FRAUD, "shap-summary", 829, 813, "SHAP summary", "V14 and V4 dominate, matching the exploratory analysis."),
    img(FRAUD, "amount-band-rate", 1088, 426, "Fraud rate by amount band", "Amount risk is U-shaped: zero-value transactions are 8.3× the average fraud rate."),
    img(FRAUD, "hour-rate", 1198, 426, "Volume and fraud rate by elapsed hour", "Hours 1–6 carry 7.15% of transactions but 24.95% of frauds."),
    img(FRAUD, "ks-statistic", 1309, 427, "KS statistic per predictor"),
    img(FRAUD, "extreme-signal-count", 978, 426, "Fraud rate vs number of simultaneous extreme signals"),
    img(FRAUD, "validation-threshold", 1089, 426, "Validation precision, recall and F2 by threshold"),
  ],
  links: {
    github: null,
    dashboard: null,
    notebook: { href: "/notebooks/credit-card-fraud-detection.html", label: "Full notebook (HTML)" },
    dataset: {
      href: "https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud",
      label: "Credit Card Fraud Detection, ULB Machine Learning Group (Kaggle)",
    },
  },
  caseStudy: {
    businessProblem: [
      "A card issuer must stop fraudulent transactions without disrupting genuine customers. A missed fraud means direct loss and chargebacks; a false alarm means friction, lost revenue and analyst workload.",
      "Because fraud is so rare, a model that approves everything is 99.83% accurate yet catches no fraud, so accuracy was not used to judge models.",
    ],
    dataset: {
      summary: [
        "284,807 European card transactions over 48 hours. V1–V28 are anonymised principal components supplied by the data provider; Time and Amount are the only raw features.",
      ],
      facts: [
        { label: "Transactions (de-duplicated)", value: "283,726" },
        { label: "Frauds", value: "473" },
        { label: "Fraud rate", value: "0.1667%" },
        { label: "Time window", value: "48 hours" },
      ],
    },
    objectives: [
      "Rank every transaction by fraud risk.",
      "Beat a logistic regression baseline on PR-AUC and fraud recall on held-out data.",
      "Make the precision/recall trade-off explicit so the Fraud Risk Manager can choose an operating point.",
      "Keep every result reproducible and leakage-free.",
    ],
    toolsDetail: [
      { tool: "scikit-learn", use: "Pipelines, ColumnTransformer, logistic regression, decision tree, random forest" },
      { tool: "imbalanced-learn", use: "SMOTE inside pipelines on training data only" },
      { tool: "XGBoost", use: "Selected model (400 trees, depth 4, learning rate 0.05)" },
      { tool: "SHAP", use: "Explainability, cross-checked with permutation importance" },
    ],
    dataQuality: [
      "No missing or infinite values, no negative amounts and only labels 0/1.",
      "1,081 exact duplicate rows (19 of them fraud).",
      "No identical feature vectors had conflicting labels.",
    ],
    cleaning: [
      "Removed 1,081 exact duplicates.",
      "Deliberately kept outliers and 1,825 zero-amount transactions: V14 and V12 outliers have fraud rates of 3.04% and 2.66%, more than 15× the base rate, so deleting outliers would delete fraud.",
    ],
    dataModelling: [
      "Stratified 60/20/20 split before any scaling or resampling: train 170,235 rows (284 frauds), validation 56,745 (94), test 56,746 (95).",
      "log(1 + Amount) then standardisation (skewness 16.98 → 0.16), plus standardisation of Time and V1–V28, all inside pipelines fitted on training data only.",
      "Eight configurations compared on validation PR-AUC; the winner was evaluated once on the untouched test set.",
    ],
    kpis: [
      { label: "Test precision", value: "0.987", note: "95% CI 0.956–1.000" },
      { label: "Test recall", value: "0.768", note: "95% CI 0.684–0.846" },
      { label: "Test PR-AUC", value: "0.833", note: "Baseline LR 0.698" },
      { label: "Test ROC-AUC", value: "0.973" },
      { label: "Fraud value", value: "58,591.39", note: "0.2334% of total value" },
      { label: "Average fraud amount", value: "123.87", note: "vs 88.41 legitimate" },
    ],
    eda: [
      "Amount risk is U-shaped: zero-value transactions have a 1.38% fraud rate (8.3× average) and the 10–50 band is the safest (0.061%). Chi-square p ≈ 8e-99.",
      "Elapsed hours 1–6 carry 7.15% of transactions but 24.95% of frauds (118 of 473).",
      "By KS statistic, V14 (0.838), V10, V12, V4, V11 and V17 separate the classes far better than Amount (0.27) or Time (0.16). The lowest V14 decile contains 90.1% of all fraud.",
      "Within fraud the top six components are strongly inter-correlated (mean |r| = 0.74), versus 0.09 among legitimate transactions.",
      "Fraud rate rises from 0.022% with no extreme signals to 64–88% with four or more.",
      "59 frauds (12.5%) show no extreme value on any top component, which caps what any model on these features can detect.",
    ],
    advanced: [
      {
        title: "Final model vs baseline (untouched test set)",
        table: {
          head: ["Model", "Threshold", "Precision", "Recall", "F1", "ROC-AUC", "PR-AUC", "TP / FP / FN"],
          rows: [
            ["Logistic Regression (baseline)", "0.50", "0.862", "0.589", "0.700", "0.949", "0.698", "56 / 9 / 39"],
            ["XGBoost (selected)", "0.43", "0.987", "0.768", "0.864", "0.973", "0.833", "73 / 1 / 22"],
          ],
          highlightRow: 1,
        },
      },
      {
        title: "Threshold trade-off (test set)",
        table: {
          head: ["Threshold", "Alerts", "Caught", "False alarms", "Missed", "Recall", "Precision"],
          rows: [
            ["0.05", "96", "76", "20", "19", "0.800", "0.792"],
            ["0.10", "83", "75", "8", "20", "0.789", "0.904"],
            ["0.20", "76", "73", "3", "22", "0.768", "0.961"],
            ["0.43", "74", "73", "1", "22", "0.768", "0.987"],
            ["0.70", "68", "67", "1", "28", "0.705", "0.985"],
            ["0.90", "64", "63", "1", "32", "0.663", "0.984"],
          ],
          highlightRow: 3,
        },
        paragraphs: [
          "Raising the threshold loses fraud quickly while precision barely improves; lowering it to 0.05 adds only 3 low-value frauds for 19 extra false alarms. Most missed frauds score near zero, so recovering them needs new information, not a lower cut-off.",
        ],
      },
      {
        title: "What resampling actually did",
        paragraphs: [
          "Class weighting and SMOTE mainly moved the operating point, pushing more transactions over 0.5, without improving ranking quality (PR-AUC flat or slightly lower). The large jump in PR-AUC came from changing the algorithm from logistic regression to XGBoost.",
        ],
      },
    ],
    charts: [
      {
        title: "Validation PR-AUC by model configuration",
        unit: "PR-AUC (validation)",
        format: "decimal",
        data: [
          { label: "XGBoost (no weighting)", value: 0.886 },
          { label: "XGBoost + scale_pos_weight", value: 0.884 },
          { label: "Random Forest (balanced)", value: 0.871 },
          { label: "XGBoost + SMOTE", value: 0.867 },
          { label: "Logistic Regression (baseline)", value: 0.798 },
          { label: "LR + SMOTE", value: 0.790 },
          { label: "LR + class weighting", value: 0.789 },
          { label: "Decision Tree (balanced)", value: 0.695 },
        ],
        highlight: "XGBoost (no weighting)",
        source: "results/validation_model_comparison.csv",
      },
    ],
    code: [
      {
        title: "Leakage-safe preprocessing and model comparison",
        language: "python",
        code: `def make_preprocessor():
    """log1p + scale Amount, scale Time, scale V1-V28.
    Fitted only on whatever data the pipeline is fitted on."""
    amount_pipe = Pipeline([("log1p", FunctionTransformer(np.log1p, feature_names_out="one-to-one")),
                            ("scale", StandardScaler())])
    return ColumnTransformer([("amount", amount_pipe, ["Amount"]),
                              ("time", StandardScaler(), ["Time"]),
                              ("pca", StandardScaler(), V_COLS)],
                             verbose_feature_names_out=False)

fit_and_score("A: LR + class weighting",
              Pipeline([("prep", make_preprocessor()), ("clf", lr(class_weight="balanced"))]), RESULTS, MODELS)
fit_and_score("B: LR + SMOTE",
              ImbPipeline([("prep", make_preprocessor()), ("smote", SMOTE(random_state=RANDOM_STATE)),
                           ("clf", lr())]), RESULTS, MODELS)
fit_and_score("XGBoost (no weighting)",
              Pipeline([("prep", make_preprocessor()), ("clf", xgb())]), RESULTS, MODELS)`,
      },
    ],
    insights: [
      "The selected XGBoost model caught 73 of 95 test frauds with one false alarm among 56,651 genuine transactions.",
      "The baseline caught 56 frauds and raised 9 false alarms on the same data.",
      "High value combined with a fraud-like V14 profile is the sharpest risk: a 22.3% fraud rate vs 0.107% for other high-value transactions.",
      "About a quarter of test fraud value was missed at any practical threshold.",
    ],
    recommendations: [
      "Deploy as a tiered risk score: block or prioritise review at ≥ 0.43 and use step-up authentication for roughly 0.05–0.43.",
      "Order the review queue by score × amount.",
      "Monitor alert volume, precision and recall weekly and re-tune when patterns or capacity change.",
      "Watch zero/micro-value and quiet-period transactions once confirmed on longer history.",
      "Invest in customer, merchant, device and velocity data for the hidden fraud.",
    ],
    limitations: [
      "Only 473 frauds and fewer than 100 in each of validation and test, so metrics have wide confidence intervals.",
      "V1–V28 are anonymised, so findings cannot become business rules.",
      "No cost data; F2 was used as a proxy for relative costs.",
      "48 hours of history with no true clock time or seasonality.",
      "A random rather than temporal split may be optimistic for forward deployment.",
    ],
    conclusion: [
      "Evaluated on precision, recall and PR-AUC rather than accuracy, the selected XGBoost model at a 0.43 threshold catches about three in four frauds with almost no false alarms. The threshold table gives the Fraud Risk Manager an explicit choice of operating point, and the remaining gap points to new data rather than further tuning.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 6. Online shoppers                                                          */
/* -------------------------------------------------------------------------- */
const SHOP = "online-shoppers-purchase-intention";
const shoppers: Project = {
  slug: SHOP,
  title: "Online Shoppers Purchasing Intention",
  domain: "E-commerce / Digital marketing",
  stakeholder: "E-commerce Marketing Manager",
  categories: ["Python", "Machine Learning"],
  tools: ["Python", "Pandas", "scikit-learn", "Matplotlib", "Seaborn", "SciPy"],
  problem:
    "Only 15.5% of sessions convert. Which sessions will buy, what kinds of visitor behaviour exist, and where should marketing budget go?",
  headline: { value: "80%", label: "Of purchases come from two behaviour segments making up 30% of sessions" },
  featured: false,
  thumbnail: img(SHOP, "segment-purchase-rate", 1084, 380, "Purchase rate by K-Means segment"),
  gallery: [
    img(SHOP, "segment-purchase-rate", 1084, 380, "Actual purchase rate by segment", "Revenue was not used to form the clusters."),
    img(SHOP, "target-distribution", 651, 336, "Target distribution: 15.5% of sessions end in a purchase"),
    img(SHOP, "categorical-rates", 1600, 899, "Purchase rate by month, visitor type, traffic type and special-day proximity", "November converts at 25.4%; February at 1.6%."),
    img(SHOP, "roc-curves", 644, 534, "ROC curves on the test set"),
    img(SHOP, "precision-recall", 666, 534, "Precision-recall curves on the test set"),
    img(SHOP, "lr-coefficients", 974, 534, "Logistic regression: strongest positive and negative coefficients"),
    img(SHOP, "cluster-centres", 1184, 380, "Standardised cluster centres"),
    img(SHOP, "segments-pca", 1600, 577, "Segments in PCA space and on product-page time vs page value"),
  ],
  links: {
    github: null,
    dashboard: null,
    notebook: null,
    dataset: {
      href: "https://www.kaggle.com/datasets/imakash3011/online-shoppers-purchasing-intention-dataset",
      label: "Online Shoppers Purchasing Intention (Kaggle mirror of the UCI dataset)",
    },
  },
  caseStudy: {
    businessProblem: [
      "Online retailers attract many visitors but convert few. Discount, retargeting, live chat and email budgets are limited, so the Marketing Manager needs to know where to spend them.",
      "Two questions: will a given session end in a purchase (classification), and what natural groups of browsing behaviour exist (clustering)? The project then combines the two.",
    ],
    dataset: {
      summary: [
        "12,330 sessions collected over one year from an online retailer (Sakar et al., 2019; UCI Machine Learning Repository), with ten behavioural metrics and seven categorical features.",
      ],
      facts: [
        { label: "Sessions", value: "12,330" },
        { label: "Columns", value: "18" },
        { label: "Purchase sessions", value: "1,908 (15.47%)" },
        { label: "Missing values", value: "0" },
      ],
    },
    objectives: [
      "Predict which sessions convert, with F1 for the purchase class as the primary metric.",
      "Find interpretable behaviour segments without using the purchase label.",
      "Show where prediction is reliable and where it is not, segment by segment.",
      "Turn both into prioritised marketing recommendations.",
    ],
    toolsDetail: [
      { tool: "SciPy", use: "Mann-Whitney U, chi-square and Cramér's V" },
      { tool: "scikit-learn", use: "Pipelines, GridSearchCV, logistic regression, decision tree, random forest, K-Means, PCA" },
      { tool: "Matplotlib / Seaborn", use: "EDA, evaluation and segment visuals" },
    ],
    dataQuality: [
      "No missing values.",
      "125 exact duplicates (201 rows involved), all 'land and leave' non-purchase sessions.",
      "Durations and PageValues are highly right-skewed (skewness 5–7.6) and zero-inflated: 78% of sessions have PageValues = 0.",
      "The 1.5×IQR rule breaks down on zero-inflated features, and flagged sessions are disproportionately buyers, so outliers were kept.",
    ],
    cleaning: [
      "Removed 125 exact duplicates (12,330 → 12,205) to avoid train/test leakage; purchase rate moved from 15.47% to 15.63%.",
      "Dropped Region (no association, p = 0.32) and Browser (weakest association, V = 0.05).",
      "One-hot encoded Month, VisitorType, TrafficType and OperatingSystems, grouping levels with fewer than 100 training sessions.",
      "log1p then standardisation for counts, durations and PageValues (product-page duration skew 7.87 → −1.43).",
    ],
    dataModelling: [
      "Stratified 80/20 split (9,764 train / 2,441 test). All preprocessing inside scikit-learn pipelines; tuning by 5-fold stratified CV on the training set; class_weight = 'balanced'.",
      "K-Means on nine scaled behavioural features with Revenue removed, comparing k = 2–10 on elbow, silhouette, Davies-Bouldin and Calinski-Harabasz.",
    ],
    kpis: [
      { label: "Test F1 (Random Forest)", value: "0.679", note: "Majority baseline F1 = 0" },
      { label: "Test recall", value: "77.5%" },
      { label: "Test precision", value: "0.604", note: "About 3.9× the base rate" },
      { label: "Test ROC-AUC", value: "0.931" },
      { label: "Segments (K-Means)", value: "k = 5", note: "Bootstrap ARI 0.997" },
      { label: "November conversion", value: "25.4%", note: "February 1.6%" },
    ],
    eda: [
      "The median buyer views 29 product pages for about 1,110 seconds, versus 16 pages and about 510 seconds for non-buyers.",
      "Sessions with any page value convert at 56.3% (3.9% without) and contain 80.6% of purchases.",
      "New visitors convert at 24.9%, returning visitors at 13.9%.",
      "Traffic types 2, 5, 8, 10, 11 and 20 convert at 19–28%; type 13 at 5.8%.",
      "PageValues has by far the strongest correlation with Revenue (Spearman ρ = 0.63).",
    ],
    advanced: [
      {
        title: "Test-set performance (2,441 sessions, 382 purchases)",
        table: {
          head: ["Model", "Accuracy", "Precision", "Recall", "F1", "ROC-AUC"],
          rows: [
            ["Majority baseline", "0.844", "0.000", "0.000", "0.000", "0.500"],
            ["Logistic Regression", "0.881", "0.587", "0.801", "0.678", "0.925"],
            ["Decision Tree", "0.848", "0.509", "0.859", "0.639", "0.924"],
            ["Random Forest (selected)", "0.885", "0.604", "0.775", "0.679", "0.931"],
          ],
          highlightRow: 3,
        },
      },
      {
        title: "Segment value",
        table: {
          head: ["Segment", "Share of sessions", "Purchase rate", "Share of purchases", "Lift"],
          rows: [
            ["High-Intent Shoppers", "12.8%", "65.9%", "54.0%", "4.2×"],
            ["Engaged Researchers", "17.4%", "23.3%", "26.0%", "1.5×"],
            ["Mid-Funnel Browsers", "26.2%", "6.5%", "10.8%", "0.4×"],
            ["Light Browsers", "37.4%", "3.7%", "8.9%", "0.2×"],
            ["Instant Bouncers", "6.2%", "0.5%", "0.2%", "0.03×"],
          ],
        },
      },
      {
        title: "Where the model is weak",
        paragraphs: [
          "Recall is 99% for High-Intent Shoppers but only 9% for Mid-Funnel Browsers and 35% for Light Browsers, which together hold 65% of missed buyers. Segment-specific thresholds find three times as many Mid-Funnel buyers (recall 9% → 29%) at the same overall F1.",
          "Retrained without PageValues, the Random Forest reaches F1 0.42 and ROC-AUC 0.78, so real-time early-session triggers need a separate model.",
        ],
      },
    ],
    charts: [
      {
        title: "Purchase rate by behaviour segment",
        unit: "Purchase rate (%)",
        format: "percent",
        data: [
          { label: "High-Intent Shoppers", value: 65.9 },
          { label: "Engaged Researchers", value: 23.3 },
          { label: "Mid-Funnel Browsers", value: 6.5 },
          { label: "Light Browsers", value: 3.7 },
          { label: "Instant Bouncers", value: 0.5 },
        ],
        reference: { value: 15.6, label: "Overall 15.6%" },
        source: "Project report, Table 7",
      },
    ],
    code: [
      {
        title: "Comparing k for K-Means",
        language: "python",
        code: `ks = range(2, 11); rows = []
for k in ks:
    km = KMeans(n_clusters=k, n_init=20, random_state=RANDOM_STATE).fit(Xc_scaled)
    rows.append({'k': k, 'inertia': km.inertia_,
                 'silhouette': silhouette_score(Xc_scaled, km.labels_, sample_size=6000,
                                                random_state=RANDOM_STATE),
                 'Davies-Bouldin': davies_bouldin_score(Xc_scaled, km.labels_),
                 'Calinski-Harabasz': calinski_harabasz_score(Xc_scaled, km.labels_),
                 'smallest cluster %': np.bincount(km.labels_).min() / len(km.labels_) * 100})
k_table = pd.DataFrame(rows).set_index('k')`,
      },
    ],
    insights: [
      "Page value, low exit and bounce rates, product engagement, November seasonality (odds ×2.1) and channel drive conversion.",
      "High-Intent Shoppers and Engaged Researchers are 30% of traffic and 80% of purchases.",
      "About 34% of High-Intent Shoppers still leave without buying, the main recoverable loss.",
      "Segment labels add no predictive power as features; their value is strategic.",
    ],
    recommendations: [
      "Recover high-intent abandoners with basket-abandonment emails, retargeting and a checkout friction audit.",
      "Use model scores as a budget lever: ≥ 0.75 for costly incentives (~78% precision), 0.3–0.6 for low-cost email.",
      "Nurture Engaged Researchers with comparison content, reviews and price alerts timed for Oct–Nov.",
      "Redesign the Mid-Funnel journey and A/B test changes rather than relying on the model there.",
      "Concentrate budget in Q4, especially November, and re-allocate acquisition spend by channel.",
      "Deploy a separate early-session model without PageValues for real-time triggers.",
    ],
    limitations: [
      "Model performance depends heavily on PageValues.",
      "One retailer, one year, January and April missing, and anonymised channel codes.",
      "No customer history or lifetime value.",
      "Moderate silhouette (0.37) means segment boundaries are approximate, though the partition is highly stable.",
      "Recommendations show where to act; their effect should be confirmed with A/B tests.",
    ],
    conclusion: [
      "A tuned Random Forest predicts purchases with F1 0.68, recall 77.5% and ROC-AUC 0.93, and K-Means finds five interpretable segments, two of which generate 80% of purchases. Combining them shows where prediction is reliable (high-intent sessions) and where it is not (mid-funnel and light browsers).",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 7. UK weather                                                               */
/* -------------------------------------------------------------------------- */
const weather: Project = {
  slug: "uk-weather-analytics",
  title: "Live UK Weather Analytics Dashboard",
  domain: "Environmental monitoring / Operations",
  stakeholder: "Environmental monitoring and operations team",
  categories: ["Python", "Live Analytics"],
  tools: ["Python", "Pandas", "Requests", "Streamlit", "Open-Meteo API"],
  problem:
    "An operations team needs live conditions and 12 months of hourly history for 12 UK cities in one place, with alerts for gales, heavy rain and frost.",
  headline: { value: "12", label: "UK cities tracked with live API data and 12 months of hourly history" },
  featured: false,
  thumbnail: null,
  gallery: [],
  links: {
    github: null,
    dashboard: null,
    notebook: null,
    dataset: { href: "https://open-meteo.com", label: "Open-Meteo weather API (CC BY 4.0)" },
  },
  pendingAssets: [
    "Dashboard screenshots",
    "Link to the deployed Streamlit dashboard",
    "Headline figures from the latest pipeline run",
    "Air quality indicators alongside the weather data",
  ],
  caseStudy: {
    businessProblem: [
      "An environmental monitoring and operations team needs one view of current conditions across the UK, compared with what is normal for that city, month and hour, plus alerts for gale-force gusts, heavy rain and sub-zero temperatures.",
    ],
    dataset: {
      summary: [
        "Hourly historical weather and live conditions for 12 UK cities from the free Open-Meteo API. The default window is the 12 most recent complete calendar months, so monthly totals are not biased by partial months. Historical data is ERA5-based reanalysis for the nearest model grid cell, not station observations.",
      ],
      facts: [
        { label: "Cities", value: "12" },
        { label: "Nations", value: "4" },
        { label: "History", value: "12 months, hourly" },
        { label: "API key needed", value: "None" },
      ],
    },
    objectives: [
      "Extract historical and live data from the API with retries and raw JSON caching.",
      "Assess and clean the data without inventing rainfall.",
      "Compute KPIs, 30 exploratory analyses, time-series views and extremes.",
      "Deliver an auto-refreshing dashboard and a generated written report.",
    ],
    toolsDetail: [
      { tool: "Requests + urllib3 Retry", use: "API client with backoff, retry on 429/5xx and cached raw responses" },
      { tool: "Pandas", use: "JSON to DataFrame, quality assessment, cleaning, features and daily aggregation" },
      { tool: "Streamlit", use: "Live panel with threshold alerts, history controls and analysis tabs" },
    ],
    dataQuality: [
      "Completeness, missingness, duplicates and timestamp gaps per city.",
      "Out-of-range values against configurable valid ranges.",
      "Internal consistency: rain ≤ precipitation, dew point ≤ temperature, gust ≥ wind.",
    ],
    cleaning: [
      "De-duplicate on city and timestamp and enforce a full hourly grid.",
      "Null implausible values.",
      "Interpolate continuous gaps of 3 hours or less; accumulations such as rainfall are never interpolated.",
      "Flag every imputed row.",
    ],
    dataModelling: [
      "An hourly table and a daily aggregate (full day = at least 20 valid hours), with DST-aware local time, meteorological seasons, Beaufort force, rolling 24h/168h and 7/30-day means, pressure tendency, temperature anomaly and extreme-day flags.",
    ],
    kpis: [],
    eda: [
      "The pipeline runs 10 univariate, 10 bivariate and 10 multivariate analyses (including a correlation matrix and a standardised regression), 6 time-series analyses, extremes and a city comparison.",
      "Insight sentences are templates filled with computed values, and interpretive claims are only made when the computed numbers support them.",
    ],
    code: [
      {
        title: "Cleaning without inventing rainfall (src/processing.py)",
        language: "python",
        code: `for city, g in df.groupby("city", sort=False):
    g = g.set_index("time_utc")
    full = pd.date_range(g.index.min(), g.index.max(), freq="h", name="time_utc")
    g = g.reindex(full)                                   # enforce a full hourly grid
    g["city"] = city
    before = g.isna()
    for col in [c for c in config.CONTINUOUS_VARS if c in g]:
        g[col] = g[col].interpolate(method="time", limit=config.MAX_INTERPOLATION_HOURS,
                                    limit_area="inside")
    # Accumulations are NOT interpolated: an unknown rain hour stays unknown.
    filled = before & g.notna()
    g["was_imputed"] = filled.any(axis=1)`,
      },
    ],
    limitations: [
      "Historical data is reanalysis for the nearest grid cell, not weather-station observations.",
      "The archive lags real time by about 5–7 days.",
      "Open-Meteo data is free for non-commercial use (about 10,000 calls a day).",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 8. Bank marketing                                                           */
/* -------------------------------------------------------------------------- */
const BANK = "bank-marketing-conversion";
const bank: Project = {
  slug: BANK,
  title: "Bank Marketing Campaign & Customer Conversion",
  domain: "Banking / Marketing analytics",
  stakeholder: "Marketing / Customer Acquisition Manager",
  categories: ["Python", "Business Case Studies"],
  tools: ["Python", "Pandas", "SciPy", "statsmodels", "scikit-learn", "Seaborn"],
  problem:
    "124,956 calls produced 5,289 term-deposit sales. Which customers and campaign conditions convert, and where is calling effort being wasted?",
  headline: { value: "63.9%", label: "Of conversions from 37.4% of customers, using five simple segment rules" },
  featured: false,
  thumbnail: img(BANK, "segment-priority-map", 1500, 825, "Segment priority map: share of contacts vs conversion rate"),
  gallery: [
    img(BANK, "segment-priority-map", 1500, 825, "Segment priority map (bubble size = conversions)", "Segment A needs 2.8 attempts per conversion; segment D needs 40.6."),
    img(BANK, "gains-curve", 1600, 554, "Propensity score: conversion by decile and cumulative gains on hold-out", "The top 30% of scored customers hold 59.9% of conversions."),
    img(BANK, "conversion-by-age", 1600, 514, "Conversion by age band", "Age is U-shaped: 18–24 convert at 25.59% and 65+ at 42.10%."),
    img(BANK, "attempts-vs-conversion", 1600, 514, "Conversion by number of attempts in the campaign"),
    img(BANK, "history-x-attempts", 1500, 600, "Conversion by contact history and attempts", "Previous-success customers stay above 40% even at 6–10 attempts."),
    img(BANK, "month-volume-conversion", 1600, 655, "Contact volume and conversion rate by month", "May holds 30.4% of contacts at 6.72% conversion."),
    img(BANK, "conversion-by-job", 1500, 675, "Conversion rate by occupation"),
    img(BANK, "odds-ratios", 1350, 1650, "Adjusted odds ratios from logistic regression"),
  ],
  links: {
    github: null,
    dashboard: null,
    notebook: { href: "/notebooks/bank-marketing-conversion.html", label: "Full notebook (HTML)" },
    dataset: {
      href: "https://archive.ics.uci.edu/dataset/222/bank+marketing",
      label: "Bank Marketing dataset (UCI Machine Learning Repository)",
    },
  },
  pendingAssets: ["SQL version of the KPI and segment queries"],
  caseStudy: {
    businessProblem: [
      "A Portuguese bank contacted 45,211 customers by telephone to sell term deposits, making 124,956 contact attempts. Conversion was highly uneven, and calling effort was often concentrated where conversion was weakest.",
    ],
    dataset: {
      summary: [
        "bank-full.csv from the UCI Bank Marketing archive: one row per customer with demographics, financial position, contact details and campaign history.",
      ],
      facts: [
        { label: "Customers", value: "45,211" },
        { label: "Contact attempts", value: "124,956" },
        { label: "Subscriptions", value: "5,289" },
        { label: "Conversion", value: "11.70%" },
      ],
    },
    objectives: [
      "Measure baseline conversion and effort per conversion.",
      "Find which customer and campaign conditions are associated with subscription.",
      "Build transparent segments and a pre-call targeting score.",
      "Recommend changes to list building, contact caps and the campaign calendar.",
    ],
    toolsDetail: [
      { tool: "Pandas / SciPy", use: "Rates, chi-square and Mann-Whitney tests" },
      { tool: "statsmodels", use: "Logistic regression with adjusted odds ratios" },
      { tool: "scikit-learn", use: "Propensity score on pre-call data with hold-out validation" },
    ],
    dataQuality: [
      "pdays = −1 (81.7% of rows) exactly matches previous = 0: a 'never contacted' code, not a number.",
      "poutcome = unknown applies to 36,954 of 36,959 never-contacted rows.",
      "contact = unknown (28.8%) is concentrated in the first ~28% of rows and converts at 4.07%, so it is period-confounded.",
      "duration is only known after the call, so it would leak into targeting.",
    ],
    cleaning: [
      "Created a previously_contacted flag and set pdays_clean to NaN for never-contacted customers.",
      "Recoded poutcome = unknown into a contact_history field.",
      "Kept contact = unknown as 'not recorded' and flagged it.",
      "Kept job and education 'unknown' as categories (0.6% and 4.1%, near-average conversion).",
      "Kept plausible outliers in balance, campaign and previous; analysed with medians and bands.",
      "Excluded duration from targeting.",
    ],
    dataModelling: [
      "One customer-level analytical table with engineered bands (age, balance, recency, attempts) and a debt profile, analysed through 10 KPIs and 10 univariate, 10 bivariate and 10 multivariate analyses.",
    ],
    kpis: [
      { label: "Conversion rate", value: "11.70%" },
      { label: "Attempts per conversion", value: "23.6" },
      { label: "Previous-success conversion", value: "64.73%", note: "Adjusted odds ratio 8.55" },
      { label: "No-loan conversion", value: "18.22%", note: "vs 6.07–8.04% for loan holders" },
      { label: "Effort on 6+ attempts", value: "34.4%", note: "Producing 4.8% of conversions" },
      { label: "Targeting score AUC", value: "0.730", note: "Hold-out, pre-call data only" },
    ],
    eda: [
      "Customers whose previous campaign succeeded converted at 64.73%, 5.5× the average, but were only 3.3% of contacts.",
      "18–24s (25.59%) and 65+ (42.10%) convert far above the 35–54 core (≈9.5%), yet each end received only ~1.8% of contacts.",
      "Loan holders absorb 62.0% of contacts; balance only helps when there are no loans.",
      "May holds 30.4% of contacts at 6.72% conversion, while Mar/Sep/Oct/Dec convert at 44–52% on 4.4% of volume.",
      "31% of calls lasting two minutes or less convert at 1.5%.",
    ],
    advanced: [
      {
        title: "Rule-based customer segments",
        table: {
          head: ["Segment", "Rule", "Contacts", "Conversion", "Share of conversions", "Attempts per conversion"],
          rows: [
            ["A. Previous-success re-engagers", "poutcome = success", "3.3%", "64.73%", "18.5%", "2.8"],
            ["B. Life-stage", "Age 60+, students or retired", "7.9%", "20.60%", "13.9%", "11.9"],
            ["C. Debt-free savers", "No loans, positive balance", "26.2%", "14.09%", "31.5%", "20.8"],
            ["D. Loan holders", "Housing and/or personal loan", "58.4%", "6.77%", "33.8%", "40.6"],
            ["E. Debt-free, no funds", "No loans, zero/negative balance", "4.3%", "6.48%", "2.4%", "50.8"],
          ],
        },
      },
      {
        title: "Contact-cap scenario (arithmetic on observed data, not a forecast)",
        table: {
          head: ["Cap", "Attempts freed", "Share of effort", "Conversions after the cap"],
          rows: [
            ["3 attempts", "36,916", "29.5%", "709 (13.4%)"],
            ["5 attempts", "21,156", "16.9%", "253 (4.8%)"],
          ],
        },
      },
    ],
    charts: [
      {
        title: "Conversion rate by customer segment",
        unit: "Conversion rate (%)",
        format: "percent",
        data: [
          { label: "A. Previous success", value: 64.73 },
          { label: "B. Life-stage", value: 20.6 },
          { label: "C. Debt-free savers", value: 14.09 },
          { label: "D. Loan holders", value: 6.77 },
          { label: "E. Debt-free, no funds", value: 6.48 },
        ],
        reference: { value: 11.7, label: "Overall 11.70%" },
        source: "Business case study report, section 9",
      },
    ],
    code: [
      {
        title: "Segment rules applied in priority order",
        language: "python",
        code: `rules = [df.contact_history == "Prior success",
         (df.age >= 60) | df.job.isin(["student", "retired"]),
         (df.debt_profile == "No loans") & (df.balance > 0),
         (df.housing == "yes") | (df.loan == "yes")]
labels = ["A. Previous-success re-engagers", "B. Life-stage: students, retirees, 60+",
          "C. Debt-free savers (no loans, positive balance)", "D. Loan holders"]
df["segment"] = np.select(rules, labels, "E. Debt-free, no funds (zero/negative balance)")

seg = conv_table("segment")
seg["attempts_per_conversion"] = (df.groupby("segment").campaign.sum() / seg.conversions).round(1)`,
      },
    ],
    insights: [
      "Relationship history is the strongest pre-call signal.",
      "Age has a U-shape, and both high-converting ends are under-contacted.",
      "Existing credit is associated with lower take-up.",
      "Persistence has sharply diminishing returns for cold contacts.",
      "Targeting works with pre-call data: segment rules and a propensity score both concentrate conversions.",
    ],
    recommendations: [
      "Prioritise segments A → B → C in list building.",
      "Introduce segment-specific contact caps (about 3 for cold contacts, up to 5 for warm).",
      "Order call lists by propensity score, measured against a random control group.",
      "Build a re-engagement journey for previous successes and recent recontacts.",
      "Pilot propositions for 18–24s (starter savings) and 65+ (retirement income).",
      "Move part of the loan-holder segment to lower-cost channels.",
      "A/B test shifting volume away from May, and fix CRM data capture.",
    ],
    limitations: [
      "Observational data: customers were not randomly assigned to months, channels or attempts.",
      "No year field, and conversion rises strongly along the file (3.0% → 47.1%), so month effects partly reflect campaign wave.",
      "Calling usually stops at subscription, which mechanically lowers attempts for converters.",
      "No cost or revenue data; efficiency is measured in attempts.",
      "The propensity score is validated on a random hold-out, not a future campaign.",
    ],
    conclusion: [
      "The evidence supports a shift from calling more to calling better: prioritising warm and high-propensity segments, capping persistence for cold contacts, and validating timing and channel changes through controlled tests that would also give the bank causal evidence.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 9. Student performance                                                      */
/* -------------------------------------------------------------------------- */
const STU = "student-performance-analytics";
const student: Project = {
  slug: STU,
  title: "Student Performance & Educational Equity Analysis",
  domain: "Education analytics",
  stakeholder: "School Principal",
  categories: ["SQL"],
  tools: ["SQL (SQLite)", "Window functions", "CASE banding", "Python (charts)"],
  problem:
    "Which students are falling behind, why, and which lever does the school control? Forty SQL queries across KPIs, univariate, bivariate and multivariate phases.",
  headline: { value: "+7.63", label: "Point score gain for students who completed test preparation" },
  featured: false,
  thumbnail: img(STU, "pass-rate-test-prep", 1200, 800, "Pass rate by test preparation status"),
  gallery: [
    img(STU, "pass-rate-test-prep", 1200, 800, "Pass rate by test preparation status", "83.24% pass with test prep vs 64.95% without."),
    img(STU, "ses-score-gap", 1200, 800, "Score gap by lunch type (socio-economic proxy)", "Standard lunch 70.84 vs free/reduced 62.20."),
    img(STU, "parental-education", 1400, 840, "Average composite score by parental education"),
    img(STU, "gender-subjects", 1300, 840, "Subject-level average score by gender"),
    img(STU, "performance-bands", 1100, 1100, "Overall performance band distribution"),
    img(STU, "test-prep-score-gap", 1200, 800, "Score gap by test preparation course"),
  ],
  links: {
    github: null,
    dashboard: null,
    notebook: null,
    dataset: {
      href: "https://www.kaggle.com/datasets/spscientist/students-performance-in-exams",
      label: "Students Performance in Exams (Kaggle)",
    },
  },
  pendingAssets: ["Python companion notebook"],
  caseStudy: {
    businessProblem: [
      "A principal cannot track 1,000 students' circumstances personally. The school needs to know which sub-populations are falling behind, why, and which interventions it actually controls.",
    ],
    dataset: {
      summary: [
        "The public 'Students Performance in Exams' dataset: 1,000 students with gender, five anonymised ethnicity groups, parental education, lunch type (a socio-economic proxy), test-prep completion and maths, reading and writing scores.",
        "The project was originally scoped around attendance and engagement fields that the supplied dataset does not contain, so the analysis was rebuilt around the fields actually present.",
      ],
      facts: [
        { label: "Students", value: "1,000" },
        { label: "Fields", value: "8" },
        { label: "SQL queries", value: "40" },
        { label: "Database", value: "SQLite" },
      ],
    },
    objectives: [
      "Establish baseline KPIs for academic health.",
      "Identify the sub-populations most at risk.",
      "Quantify the impact of the test-preparation course.",
      "Reveal where disadvantage compounds across factors.",
    ],
    toolsDetail: [
      { tool: "SQLite", use: "Single table student_performance with a surrogate student_id key" },
      { tool: "SQL", use: "Aggregates, CASE banding, conditional aggregation, NTILE, subqueries, multi-column GROUP BY" },
    ],
    dataModelling: [
      "One table loaded from CSV with a surrogate primary key added for window operations; a composite score ((maths + reading + writing) / 3) used throughout, with a pass line at 60.",
    ],
    kpis: [
      { label: "Composite average", value: "67.77", note: "'Good' band" },
      { label: "Pass rate (≥ 60)", value: "71.5%", note: "285 students below the line" },
      { label: "Test-prep completion", value: "35.8%" },
      { label: "Test-prep effect", value: "+7.63 pts", note: "+18.3 pts pass rate" },
      { label: "Socio-economic gap", value: "8.64 pts" },
      { label: "Largest compounded gap", value: "17.27 pts" },
    ],
    eda: [
      "Maths is the weakest subject (66.09) and reading the strongest (69.17).",
      "Parental education shows a 10.5-point spread from high school to master's degree.",
      "Free/reduced-lunch students are roughly twice as likely to be in the 'Poor' band and half as likely to reach 'Excellent'.",
      "Female students lead in reading and writing; male students lead in maths.",
    ],
    advanced: [
      {
        title: "Compounding disadvantage",
        paragraphs: [
          "The widest gap (17.27 points) is between free/reduced-lunch students in Group A and standard-lunch students in Group E, larger than either factor alone. The highest-performing segment stacks parental education, socio-economic status and prep completion to reach 82.63.",
        ],
      },
    ],
    code: [
      {
        title: "Quartile segmentation with NTILE",
        language: "sql",
        code: `-- Who are the bottom 25% and top 25% of students by composite score?
SELECT composite_quartile,
       COUNT(*) AS student_count
FROM
  (SELECT student_id,
          NTILE(4) OVER (
                         ORDER BY (math_score+reading_score+writing_score)/3.0) AS composite_quartile
   FROM student_performance) q
GROUP BY composite_quartile
ORDER BY composite_quartile;`,
      },
      {
        title: "KPI 5: overall pass rate",
        language: "sql",
        code: `SELECT ROUND(100.0 * SUM(CASE WHEN (math_score+reading_score+writing_score)/3.0 >= 60
                             THEN 1 ELSE 0 END) / COUNT(*), 2) AS pass_rate_pct
FROM student_performance;`,
      },
    ],
    insights: [
      "Test prep is the school's best lever: a consistent, gender-neutral +7.6 point benefit, yet only 35.8% complete it.",
      "Socio-economic status drives the widest distribution-level gap.",
      "Disadvantage compounds rather than adds.",
      "Subject strengths differ by gender.",
    ],
    recommendations: [
      "Raise prep-course completion from 35.8% toward 60%+ within a year, prioritising Group D (lowest uptake, 31.3%).",
      "Pair tutoring for free/reduced-lunch students with expanded prep access.",
      "Move from single-factor eligibility to a compounded risk score for students with two or more disadvantage factors.",
      "Offer differentiated enrichment rather than subject-blind support.",
    ],
    limitations: [
      "A single public teaching dataset with no school, year or attendance information.",
      "Ethnicity groups are anonymised labels.",
      "Associations only; the prep-course effect is not a controlled estimate.",
    ],
    conclusion: [
      "Forty SQL queries show that achievement gaps are driven by compounding disadvantage: socio-economic status, parental education and access to test preparation reinforce one another. That reframes the question from 'which group needs help' to 'which combination of factors puts a student at risk'.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 10. Hospital operations                                                     */
/* -------------------------------------------------------------------------- */
const HOSP = "hospital-operations-performance";
const hospital: Project = {
  slug: HOSP,
  title: "Hospital Operations Performance Dashboard",
  domain: "Healthcare operations",
  stakeholder: "Hospital Operations Manager",
  categories: ["Tableau"],
  tools: ["Tableau", "Parameters", "Calculated fields", "Excel (source)"],
  problem:
    "Do demand, waiting times, admissions and satisfaction show peaks or bottlenecks a manager should staff around? An interactive Tableau rebuild of an Excel dashboard.",
  headline: { value: "r = −0.021", label: "Wait time vs satisfaction across 2,517 scored encounters: no link" },
  featured: false,
  thumbnail: { ...img(HOSP, "dashboard-preview", 1600, 1029, "Hospital operations dashboard layout preview"), fit: "cover" },
  gallery: [
    img(HOSP, "dashboard-preview", 1600, 1029, "Main dashboard layout", "Layout preview rendered from the cleaned dataset; the packaged .twbx needs Tableau 2026.1 or later."),
    img(HOSP, "monthly-encounters", 1120, 544, "Monthly patient encounters", "Volume stays between 431 and 530 a month."),
    img(HOSP, "demand-heatmap", 1120, 512, "Encounters by day of week and hour"),
    img(HOSP, "wait-by-department", 1120, 544, "Average wait time by department", "Only a 2.1-minute spread between departments (axis starts at 30)."),
    img(HOSP, "wait-vs-satisfaction", 1120, 544, "Wait time vs satisfaction score"),
  ],
  links: { github: null, dashboard: null, notebook: null, dataset: null },
  pendingAssets: [
    "Tableau Public link",
    "Screenshot of the published Tableau dashboard",
    "Dataset source link",
  ],
  caseStudy: {
    businessProblem: [
      "Hospital managers need a single view of patient flow to plan staffing, bed capacity and service improvements. The source analysis lived in a formula-driven Excel workbook; rebuilding it in Tableau makes it faster to filter, easier to share and simpler to extend.",
    ],
    dataset: {
      summary: ["One row per patient encounter from 1 April 2023 to 30 October 2024. Patients are 51.3% male and 48.7% female, aged 1 to 79 (median 39)."],
      facts: [
        { label: "Encounters", value: "9,216" },
        { label: "Fields", value: "13" },
        { label: "Months", value: "19" },
        { label: "Satisfaction recorded", value: "27.3%" },
      ],
    },
    objectives: [
      "Prepare a clean, analysis-ready dataset.",
      "Define four headline KPIs.",
      "Visualise trends, departmental differences, day-hour demand and the wait-satisfaction relationship.",
      "Combine them into a dashboard controlled by Department and Date Range.",
    ],
    toolsDetail: [
      { tool: "Tableau", use: "Parameters, calculated fields, BANs, line, bar, highlight table and scatter" },
      { tool: "Excel", use: "Original workbook the data was extracted from" },
    ],
    dataQuality: [
      "Mixed US-style and Day/Month/Year dates.",
      "58.6% of rows have no referring department.",
      "Only 2,517 encounters (27.3%) have a satisfaction score.",
      "A gender typo ('Femaleemale').",
    ],
    cleaning: [
      "Re-parsed every date as Day/Month/Year (no month value exceeded 12) and exported in ISO format.",
      "Labelled missing departments 'Not Specified' and excluded them from department comparisons.",
      "Kept blank satisfaction scores as nulls so averages use surveyed patients only.",
      "Derived Admission Hour, Day of Week and Month, and removed Excel-only helper columns.",
    ],
    dataModelling: [
      "Three parameters (Department, Start Date, End Date) drive every sheet so one control applies consistently, with calculated fields such as Admission Rate = SUM(IIF([Admission Flag]=\"Admission\",1,0)) / COUNT([Patient Id]) and a Survey Response Rate data-coverage check.",
    ],
    kpis: [
      { label: "Patient encounters", value: "9,216" },
      { label: "Average wait", value: "35.3 min", note: "Range 10–60" },
      { label: "Admission rate", value: "50.0%", note: "4,612 admitted" },
      { label: "Average satisfaction", value: "4.99 / 10", note: "27.3% of encounters" },
    ],
    eda: [
      "Monthly volume ranges from 431 (February 2024) to 530 (August 2024), with no clear seasonal pattern or trend.",
      "Day totals range from 1,260 (Wednesday) to 1,377 (Saturday), a spread of only 9.3%.",
      "Department waits range from 34.7 min (Renal) to 36.8 min (Neurology).",
      "The wait-satisfaction correlation is −0.021, effectively zero.",
    ],
    code: [
      {
        title: "Tableau calculated fields",
        language: "excel",
        code: `// Filter: Dept + Date (applied to all sheets as True)
([Department] = "All" OR [Department Referral] = [Department])
AND [Admission Date] >= [Start Date] AND [Admission Date] <= [End Date]

// Admission Rate
SUM(IIF([Admission Flag] = "Admission", 1, 0)) / COUNT([Patient Id])

// Survey Response Rate (data-coverage check)
COUNT([Satisfaction Score]) / COUNT([Patient Id])`,
      },
    ],
    insights: [
      "Operations are unusually stable and evenly distributed across time, days and departments.",
      "No single department is a bottleneck.",
      "Waiting time does not predict satisfaction in this data.",
      "Data capture limits confidence: only 41.4% of encounters name a department.",
    ],
    recommendations: [
      "Re-validate any roster that assumes strong peak hours; the data does not show one.",
      "Use a flatter, more even rota across weekdays and weekends.",
      "Prioritise hospital-wide triage or check-in improvements over single-department fixes.",
      "Look beyond wait time (communication, environment, outcome) to improve satisfaction.",
      "Make department referral mandatory at registration and raise survey completion.",
    ],
    limitations: [
      "Department and satisfaction results rest on 41.4% and 27.3% of encounters.",
      "No staffing, length-of-stay or clinical outcome data.",
      "The very even distributions may indicate synthetic or sampled data.",
    ],
    conclusion: [
      "The dashboard's main message is consistency: improvement effort is best directed at hospital-wide processes and at fixing data capture. The analysis reports the flatness honestly rather than inventing a peak the data does not show.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 11. Chocolate sales                                                         */
/* -------------------------------------------------------------------------- */
const CHOC = "chocolate-sales-performance";
const chocolate: Project = {
  slug: CHOC,
  title: "Chocolate Sales Performance & Growth Dashboard",
  domain: "Sales analytics",
  stakeholder: "Sales Director",
  categories: ["Power BI"],
  tools: ["Power BI", "Power Query", "DAX", "Star schema"],
  problem:
    "Which products, countries and salespeople drive $6.18M of chocolate sales, and where is the biggest gap to close?",
  headline: { value: "2.3×", label: "Sales gap between the top and bottom salesperson" },
  featured: false,
  thumbnail: { ...img(CHOC, "executive-overview", 1440, 1136, "Executive overview page of the chocolate sales dashboard"), fit: "cover" },
  gallery: [
    img(CHOC, "executive-overview", 1440, 1136, "Executive overview", "Interactive HTML companion to the Power BI build, with live country and product filters."),
    img(CHOC, "product-market", 1440, 1737, "Product & market page"),
    img(CHOC, "salesperson-performance", 1440, 1673, "Salesperson performance page"),
  ],
  links: {
    github: null,
    dashboard: { href: "/dashboards/chocolate-sales-dashboard.html", label: "Interactive dashboard" },
    notebook: null,
    dataset: null,
  },
  pendingAssets: [
    "Power BI report screenshots or a Publish to web link",
    "Dataset source link",
  ],
  caseStudy: {
    businessProblem: [
      "A Sales Director needs to see chocolate sales across products, countries, salespeople and time, to identify strong and weak areas and where performance can improve.",
    ],
    dataset: {
      summary: ["Transaction-level sales from January to August 2022: salesperson, country, product, date, amount and boxes shipped."],
      facts: [
        { label: "Transactions", value: "1,094" },
        { label: "Salespeople", value: "25" },
        { label: "Countries", value: "6" },
        { label: "Products", value: "22" },
      ],
    },
    objectives: [
      "Audit and prepare the data in Power Query.",
      "Build a star schema with a marked date table.",
      "Write a DAX measure library including time intelligence and dynamic ranks.",
      "Build a three-page report and turn it into recommendations.",
    ],
    toolsDetail: [
      { tool: "Power Query", use: "Typing, trim and clean, duplicate and blank checks" },
      { tool: "DAX", use: "13 measures: totals, ratios, month-over-month change and RANKX ranks" },
      { tool: "Power BI", use: "Three report pages: Executive Overview, Product & Market, Salesperson Performance" },
    ],
    dataQuality: [
      "0 missing values and 0 duplicate rows across 1,094 rows.",
      "No amounts or box counts ≤ 0 (amount $7 to $22,050; boxes 1 to 709).",
      "All dates parse and fall between 3 Jan and 31 Aug 2022, so year-over-year comparison is not possible.",
    ],
    cleaning: [
      "The data was clean; no rows were removed or imputed.",
      "Defensive Power Query steps (trim, clean, de-duplicate, blank checks) were still applied to protect future refreshes.",
    ],
    dataModelling: [
      "A star schema with one fact table (ChocSales) related one-to-many to a marked DateTable (243 days). Country, Product and Sales Person stay as fact-table columns because they have no attributes beyond the name; a blank _Measures table holds all DAX measures.",
    ],
    kpis: [
      { label: "Total sales", value: "$6,183,625" },
      { label: "Boxes shipped", value: "177,007" },
      { label: "Average per transaction", value: "$5,652" },
      { label: "Revenue per box", value: "$34.93" },
    ],
    eda: [
      "Monthly sales ranged from $674,051 (April) to $896,105 (January), a swing of about 33%.",
      "February (−21.95%) and April (−10.06%) were the sharpest month-over-month drops; May (+11.70%) and June (+14.91%) the strongest rebounds.",
      "Australia leads ($1,137,367) and New Zealand trails ($950,418), only a 16.5% spread.",
      "Revenue per box varies 56% across products, from $26.40 (70% Dark Bites) to $41.20 (Almond Choco).",
    ],
    code: [
      {
        title: "Time intelligence and dynamic ranking (DAX)",
        language: "dax",
        code: `Total Sales = SUM ( ChocSales[Amount] )

Previous Month Sales =
CALCULATE ( [Total Sales], DATEADD ( DateTable[Date], -1, MONTH ) )

Month-over-Month Sales Change % =
DIVIDE ( [Total Sales] - [Previous Month Sales], [Previous Month Sales] )

Salesperson Sales Rank =
RANKX ( ALL ( ChocSales[Sales Person] ), [Total Sales], , DESC )`,
      },
    ],
    insights: [
      "Volume and value are decoupled: Caramel Stuffed Bars and 70% Dark Bites ship high volume yet rank 21st and 22nd on revenue.",
      "Performance is a people gap more than a geography gap: top performer Ches Bonnell ($320,901) sold 2.3× more than the lowest.",
      "There is visible within-period seasonality, but 8 months is too short to call a cycle.",
      "No country or product is a liability; the weakest product's problem is price per box, not demand.",
    ],
    recommendations: [
      "Compare the bottom-quartile salespeople's product mix and country assignments with the top performer's.",
      "Reprice or repackage low revenue-per-box products that clearly have demand.",
      "Protect and promote high revenue-per-box products such as Almond Choco and White Choc.",
      "Treat February and April as checkpoints once more months of data arrive.",
      "Replicate top salesperson × product pairings across the team.",
    ],
    limitations: [
      "Eight months only, with no prior year.",
      "Amount is revenue, not profit; revenue per box is only a proxy for margin.",
      "No customer-level data to separate new and repeat business.",
    ],
    conclusion: [
      "Country performance is even, while salesperson- and product-level performance both show a spread worth acting on. The report lets a Sales Director drill from the headline number to the specific salesperson, product or country behind it.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 12. Retail sales (Excel)                                                    */
/* -------------------------------------------------------------------------- */
const RET = "retail-sales-executive-dashboard";
const retail: Project = {
  slug: RET,
  title: "Retail Sales & Customer Analytics",
  domain: "Retail / Office products",
  stakeholder: "Senior management",
  categories: ["Excel", "Business Case Studies"],
  tools: ["Excel", "SUMIFS", "INDEX-MATCH", "Named ranges", "Data validation"],
  problem:
    "Sales grew 51% in four years, so why is Furniture earning a 2.5% margin and where are discounts destroying profit?",
  headline: { value: "$135K", label: "Lost on order lines discounted by more than 20%" },
  featured: false,
  thumbnail: { ...img(RET, "excel-dashboard", 1600, 1053, "Retail sales executive dashboard in Excel"), fit: "cover" },
  gallery: [
    img(RET, "excel-dashboard", 1600, 1053, "Retail Sales Executive Dashboard (Region = All, Year = All)"),
    img(RET, "annual-sales-profit", 1400, 680, "Annual sales and profit, 2014–2017"),
    img(RET, "region-margin", 1400, 680, "Sales and profit margin by region", "Central sells more than South but earns only a 7.9% margin."),
    img(RET, "profit-by-subcategory", 1400, 919, "Profit by sub-category", "Tables, Bookcases and Supplies lose money."),
    img(RET, "margin-by-discount", 1400, 640, "Profit margin by discount band", "Above 20% discount, every sale loses money."),
  ],
  links: { github: null, dashboard: null, notebook: null, dataset: null },
  pendingAssets: [
    "Python analysis companion",
    "Downloadable workbook",
  ],
  caseStudy: {
    businessProblem: [
      "Nearly 10,000 order lines across 49 states, 4 regions and 1,850 products cannot answer simple executive questions such as which region is growing fastest, which products drive revenue, or where the business is losing money.",
    ],
    dataset: {
      summary: [
        "The Sample Superstore orders table for a US office-products retailer, January 2014 to December 2017, with no missing values and no duplicate rows.",
      ],
      facts: [
        { label: "Order lines", value: "9,994" },
        { label: "Unique orders", value: "5,009" },
        { label: "Customers", value: "793" },
        { label: "Products", value: "1,850" },
      ],
    },
    objectives: [
      "Clean and structure the order data for reliable summaries.",
      "Build summary tables that recalculate when filters change.",
      "Design a one-screen dashboard with KPI cards, four charts and filters.",
      "Generate data-driven commentary directly from formulas.",
    ],
    toolsDetail: [
      { tool: "SUMIFS", use: "Formula-driven 'pivot' tables reading two named filter cells" },
      { tool: "LARGE + INDEX/MATCH", use: "Top 10 product ranking with a tiebreaker" },
      { tool: "Text formulas", use: "CEO Insights and Recommendations panels that update with the filters" },
    ],
    cleaning: [
      "Added OrderYear and OrderMonthNum for filtering and grouping.",
      "Added IsFirstOrderLine so summing it counts unique orders (5,009) rather than lines (9,994).",
    ],
    dataModelling: [
      "A three-layer workbook: Raw_Data (data), Pivot_Tables (calculation) and Dashboard (presentation), plus a README sheet. Every summary reads the named inputs SelRegion and SelYear.",
    ],
    kpis: [
      { label: "Total sales", value: "$2,297,201" },
      { label: "Total profit", value: "$286,397", note: "12.5% margin" },
      { label: "Average order value", value: "$458.61" },
      { label: "Order lines sold at a loss", value: "18.7%" },
    ],
    eda: [
      "Sales grew 51% from 2014 to 2017 (CAGR about 14.8%) and profit 89%.",
      "September, November and December deliver 43% of annual sales; February is weakest ($60K).",
      "West leads on sales and margin (14.9%); Central has the lowest margin (7.9%) with a 24% average discount.",
      "Technology earns 17.4% and Office Supplies 17.0%, while Furniture earns 2.5%.",
    ],
    charts: [
      {
        title: "Profit margin by region",
        unit: "Profit margin (%)",
        format: "percent",
        data: [
          { label: "West", value: 14.9 },
          { label: "East", value: 13.5 },
          { label: "South", value: 11.9 },
          { label: "Central", value: 7.9 },
        ],
        reference: { value: 12.5, label: "Overall 12.5%" },
        source: "Project report, section 6.4",
      },
    ],
    code: [
      {
        title: "Filter-aware total sales (SUMIFS on named ranges)",
        language: "excel",
        code: `=IF(SelRegion="All",
    IF(SelYear="All", SUM(Sales), SUMIFS(Sales, Year, SelYear)),
    IF(SelYear="All", SUMIFS(Sales, Region, SelRegion),
                      SUMIFS(Sales, Region, SelRegion, Year, SelYear)))`,
      },
    ],
    insights: [
      "Healthy growth: sales up 51% and profit up 89% between 2014 and 2017.",
      "Furniture is 32% of sales but only 6% of profit, with Tables (−$17.7K) and Bookcases (−$3.5K) losing money.",
      "Discounts above 20% account for $135K of losses on 14% of order lines.",
      "Technology is the growth and profit engine.",
    ],
    recommendations: [
      "Cap discounts at 20% and require manager approval above it.",
      "Reprice or restructure Tables and Bookcases.",
      "Run a Central-region turnaround, starting with discounting in Texas and Illinois.",
      "Invest behind Technology and Office Supplies.",
      "Build stock and staffing ahead of September and November–December.",
    ],
    limitations: [
      "A public sample ending in 2017, so it illustrates method rather than current conditions.",
      "Profit is taken as given; cost of goods, shipping and returns are not broken out.",
      "The dashboard filters by region and year only.",
    ],
    conclusion: [
      "The workbook turns almost 10,000 rows into a single page a manager can read in under a minute. It shows a business growing well but leaking profit through deep discounts and loss-making furniture lines.",
    ],
  },
};

/** Display order in the gallery. */
export const projects: Project[] = [
  nhs,
  olist,
  fifa,
  attrition,
  fraud,
  shoppers,
  weather,
  bank,
  student,
  hospital,
  chocolate,
  retail,
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
