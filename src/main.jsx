import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  Code2,
  Database,
  Mail,
  Menu,
  Moon,
  Search,
  Sun,
  Workflow,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

const projects = [
  {
    title: 'HR People Analytics Platform',
    category: 'Data & BI',
    eyebrow: 'Featured / People analytics',
    image: '/screenshots/hr-people-analytics.webp',
    description:
      'End-to-end people analytics platform for HR teams — employee lifecycle tracking (hiring, onboarding, exits), attrition analysis, headcount vs budget variance reporting with 5% threshold flagging, and AI-generated workforce insights via OpenAI API. Replaces manual weekly HR reporting with automated dashboards and one-click Excel exports.',
    tech: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'OpenAI API', 'openpyxl'],
    outcome: 'Gives people teams a single source of truth for headcount, attrition, and budget variance.',
    links: [
      ['Live demo', 'https://hr-people-analytics-platform.streamlit.app/'],
      ['GitHub', 'https://github.com/RidhanPar/hr-people-analytics-platform']
    ],
    featured: true
  },
  {
    title: 'AI Ops Workflow Automation Platform',
    category: 'AI & Automation',
    eyebrow: 'Featured / Agentic operations',
    image: '/screenshots/ai-ops-workflow.webp',
    description:
      'Traceable LangGraph operations agent with RAG, explicit tool orchestration, evaluation, structured traces, and human approval controls.',
    tech: ['LangGraph', 'FastAPI', 'React', 'PostgreSQL', 'pgvector', 'OpenTelemetry'],
    outcome: 'Demonstrates bounded agent orchestration with measurable reliability controls.',
    links: [
      ['Live demo', 'https://ridhan-ai-ops-dashboard.onrender.com'],
      ['GitHub', 'https://github.com/RidhanPar/ai-ops-workflow-automation-platform']
    ],
    caseStudy: {
      problem:
        'Support teams triage tickets by hand, but letting an LLM agent act on customer records autonomously is unsafe — a wrong call silently changes real data with no audit trail and no way to review it.',
      approach:
        'A LangGraph agent runs a fixed tool sequence rather than free-form actions: retrieve knowledge, look up customer history, then emit a Pydantic-validated recommendation. Anything customer-impacting stops at a human approval gate instead of executing, and invalid output, provider failure, and unexpected errors each have their own fallback path.',
      architecture:
        'React dashboard sends JWT plus a trace ID to a FastAPI service that enforces role-based access, then dispatches to the agent. Retrieval uses a PostgreSQL pgvector HNSW index with a deterministic local-vector fallback so demos cost nothing. An idempotent workflow engine handles routing, with Alembic migrations, Prometheus and Grafana monitoring, and Kubernetes manifests validated in CI.',
      results: [
        ['Access control', '4 roles, JWT-scoped'],
        ['Sensitive actions', 'Human approval gated'],
        ['Agent evaluation', 'Golden dataset, incl. prompt injection'],
        ['Per-call telemetry', 'Trace ID, latency, tokens, cost']
      ]
    },
    featured: true
  },
  {
    title: 'PayGuard AI Fraud Detection',
    category: 'ML & Analytics',
    eyebrow: 'Featured / Explainable AI',
    description:
      'Explainable payment fraud detection prototype with XGBoost, SHAP, automated tests, CI, Docker, and an interactive Streamlit decision interface.',
    tech: ['Python', 'XGBoost', 'SHAP', 'Streamlit', 'Docker', 'CI'],
    outcome: 'Turns model predictions into transparent, reviewable fraud signals.',
    links: [
      ['Live demo', 'https://payguard-ai-fraud-detection.streamlit.app/'],
      ['GitHub', 'https://github.com/RidhanPar/payguard-ai-fraud-detection']
    ],
    featured: true
  },
  {
    title: 'Web Security Log Anomaly Detector',
    category: 'ML & Analytics',
    eyebrow: 'Featured / Threat detection',
    image: '/screenshots/web-security.webp',
    description:
      'Real-time threat detection system that classifies brute force, SQL injection, bot traffic, account takeover, and data exfiltration in Nginx web logs using a three-method ML ensemble — Isolation Forest, Local Outlier Factor, and z-score baseline.',
    tech: ['Python', 'PySpark', 'Isolation Forest', 'Apache Kafka', 'AWS S3', 'AWS Athena', 'AWS Lambda', 'Streamlit'],
    outcome: 'Enables one analyst to monitor 50,000+ events daily — catching attacks in seconds before damage compounds.',
    links: [
      ['GitHub', 'https://github.com/RidhanPar/web-security-log-anomaly-detector']
    ],
    caseStudy: {
      problem:
        'A SOC cannot eyeball 50,000 log lines a day, and any single detector has a blind spot: statistical baselines catch volumetric floods but miss slow behavioural attacks, while density methods do the reverse.',
      approach:
        'Engineer 10 behavioural features per IP with PySpark window functions — requests per minute, post-login rate, error rate, unique URLs per hour, response-byte ratio, request-interval variance — then score each event with Isolation Forest, Local Outlier Factor, and a z-score baseline, combining all three into one composite threat score ranked CRITICAL / HIGH / MEDIUM.',
      architecture:
        'Batch path: Nginx logs land in PySpark for ingestion and data-quality checks, flow through feature engineering and the three detectors, and export to S3 where Athena makes them SQL-queryable, with a Lambda triaging each new alert file. A parallel real-time path streams logs through Kafka into Spark Structured Streaming on 30-second micro-batches. Both feed a four-tab Streamlit dashboard.',
      results: [
        ['Brute force / SQLi / bot', '100% detected'],
        ['Account takeover & exfiltration', '77.1% detected'],
        ['Overall attack detection', '90.8%'],
        ['False-positive rate', '10.2%']
      ],
      note:
        'Measured on the bundled 50,000-row labelled dataset (90% benign, 10% attacks) at contamination = 0.1. The false-positive rate tracks that contamination setting and is the precision/recall lever a SOC would tune.'
    },
    featured: true
  },
  {
    title: 'Credit Risk Scorecard Engine',
    category: 'ML & Analytics',
    eyebrow: 'Featured / Explainable credit risk',
    image: '/screenshots/credit-risk-scorecard.webp',
    description:
      'End-to-end credit fraud and default prediction system that approves or declines loan applications and generates a plain-English SHAP and LIME explanation of every decision; built in both Python and R for dual validation.',
    tech: ['Python', 'XGBoost', 'SHAP', 'LIME', 'R', 'MLflow', 'Streamlit', 'optbinning'],
    outcome: 'Eliminates regulatory audit risk by providing decision-level explanations for every application.',
    links: [
      ['Live demo', 'https://credit-risk-scorecard-engine.streamlit.app'],
      ['GitHub', 'https://github.com/RidhanPar/credit-risk-scorecard-engine']
    ],
    caseStudy: {
      problem:
        'A consumer lender has to explain every decline to the applicant and justify it to a regulator. Under GDPR Article 22 and ECOA that rules out a black-box score — the decision has to decompose into auditable points.',
      approach:
        'Build the scorecard the way lenders actually do: Weight of Evidence encoding via optbinning to linearise each feature, logistic regression scaled to a 300–850 score with PDO methodology, and XGBoost trained alongside as a benchmark. SHAP and LIME explain individual decisions, and Population Stability Index monitors score drift to signal retraining.',
      architecture:
        'The UCI German Credit data loads into a SQLite feature store where CTEs and window functions derive the features, including engineered ones like age relative to loan duration. Those feed WoE binning, then both models, then a Gini / KS / ROC evaluation and a PSI monitor. A five-tab Streamlit app serves live scoring, and Docker Compose brings the whole thing up in one command.',
      results: [
        ['Logistic scorecard ROC-AUC', '0.818'],
        ['Gini / KS statistic', '0.636 / 0.562'],
        ['XGBoost benchmark ROC-AUC', '0.799'],
        ['Top feature IV (checking_status)', '0.6168']
      ],
      note:
        'The interpretable scorecard beat XGBoost here: WoE encoding pre-linearises the features, so there is little non-linear structure left for a tree to find. Trained on the public UCI German Credit dataset.'
    },
    featured: true
  },
  {
    title: 'DirectDebit IQ',
    category: 'ML & Analytics',
    eyebrow: 'Featured / Payment intelligence',
    image: '/screenshots/directdebit-iq.webp',
    description:
      'End-to-end direct debit analytics and failure prediction with SQL, XGBoost, MLflow, dbt-style models, testing, and an operational dashboard.',
    tech: ['SQL', 'XGBoost', 'MLflow', 'dbt', 'Streamlit'],
    outcome: 'Surfaces payment failure risk and the drivers behind it.',
    links: [
      ['Live demo', 'https://directdebit-iq.streamlit.app/'],
      ['GitHub', 'https://github.com/RidhanPar/directdebit-iq']
    ],
    caseStudy: {
      problem:
        'Retrying a failed direct debit touches a real customer’s bank account. Automating that end to end is a governance problem as much as a modelling one: an unreviewed or duplicated retry is worse than a missed recovery.',
      approach:
        'Score every scheduled payment for failure risk, explain the drivers, and recommend a retry above threshold — but treat the recommendation as a request, not an action. Customer-impacting retries require a reviewer with the right role, carry an idempotency key so a repeated call cannot double-charge, and write an audit record either way.',
      architecture:
        'Each payment flows through risk scoring into a prediction audit that pins the model version, threshold, and trace ID. Above threshold it becomes a retry recommendation held at a human approval gate; approved actions execute idempotently and persist their outcome. An n8n workflow drives the same authenticated endpoints the tests and API docs use, so it cannot bypass the gate.',
      results: [
        ['Dataset', '50,000 payments'],
        ['ROC-AUC', '~0.690'],
        ['Recall at 0.30 threshold', '~94.5%'],
        ['Governance controls passing', '7 / 7']
      ],
      note:
        'Metrics come from an out-of-time synthetic holdout. The repository is explicit that the dataset and any benefit figures are scenario estimates — this demonstrates engineering and governance controls, not validated production performance.'
    },
    featured: true
  },
  {
    title: 'Customer Support Intelligence Platform',
    category: 'ML & Analytics',
    eyebrow: 'Featured / Support operations',
    image: '/screenshots/customer-support-intelligence.webp',
    description:
      'Workforce and service quality analytics platform extracting insights from support interaction data. Surfaces agent performance KPIs, team-level workload trends, and resolution rate metrics to support people team decisions and capacity planning.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'Plotly', 'Streamlit'],
    outcome: 'Helps support teams act before high-risk tickets breach SLA.',
    links: [
      ['Live demo', 'https://customer-support-intelligence-platform.streamlit.app/'],
      ['GitHub', 'https://github.com/RidhanPar/customer-support-intelligence-platform']
    ],
    featured: true
  },
  {
    title: 'Baltic Commerce Intelligence',
    category: 'Data & BI',
    eyebrow: 'Featured / Analytics engineering',
    image: '/screenshots/baltic-commerce.webp',
    description:
      'Reproducible Baltic commerce analytics case study with Python, SQL, dbt, SQLite, Excel, statistical analysis, tests, and CI.',
    tech: ['Python', 'SQL', 'dbt', 'SQLite', 'Excel', 'Statistics'],
    outcome: 'Connects tested analytics models with decision-ready reporting.',
    links: [
      ['Live demo', 'https://ridhanpar.github.io/baltic-commerce-intelligence/'],
      ['GitHub', 'https://github.com/RidhanPar/baltic-commerce-intelligence']
    ],
    featured: true
  },
  {
    title: 'AI Automation Command Center',
    category: 'AI & Automation',
    eyebrow: 'Featured / Operations strategy',
    image: '/screenshots/ai-automation-command-center.webp',
    description:
      'Decision-support dashboard for scoring, prioritizing, and tracking AI and workflow automation opportunities across business teams.',
    tech: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Workflow Automation'],
    outcome: 'Translates automation ideas into a measurable delivery roadmap.',
    links: [
      ['Live demo', 'https://ai-automation-command-center.streamlit.app/'],
      ['GitHub', 'https://github.com/RidhanPar/ai-automation-command-center']
    ],
    featured: true
  },
  {
    title: 'EduPulse Platform',
    category: 'ML & Analytics',
    eyebrow: 'Machine learning system',
    description:
      'Student early-warning platform that predicts academic risk, explains feature importance, and compares predictions with actual outcomes.',
    tech: ['Python', 'Flask', 'scikit-learn', 'Pandas', 'HTML', 'CSS'],
    outcome: 'Makes academic-risk intervention more proactive and explainable.',
    links: [
      ['Live demo', 'https://edupulse-platform.onrender.com/'],
      ['GitHub', 'https://github.com/RidhanPar/edupulse-platform']
    ]
  },
  {
    title: 'Marketing AI Automation Platform',
    category: 'AI & Automation',
    eyebrow: 'AI-powered marketing',
    description:
      'AI-powered marketing toolkit with an ad copy generator, campaign performance analyzer, and A/B variant scorer, built with Streamlit and Claude AI.',
    tech: ['Python', 'Streamlit', 'Claude AI', 'Pandas', 'Plotly'],
    outcome: 'Turns raw campaign data into optimised copy and scored variant recommendations.',
    links: [
      ['GitHub', 'https://github.com/RidhanPar/marketing-ai-automation-platform']
    ]
  },
  {
    title: 'PySpark Anti-Money Laundering Pipeline',
    category: 'ML & Analytics',
    eyebrow: 'Featured / Financial crime detection',
    image: '/screenshots/pyspark-aml.webp',
    description:
      'Real-time AML transaction monitoring pipeline flagging smurfing, layering, and rapid-velocity transfers across 1M+ records using PySpark, Kafka streaming, dbt, and Delta Lake with a full regulatory audit trail.',
    tech: ['Python', 'PySpark', 'Apache Kafka', 'dbt', 'Delta Lake', 'Streamlit', 'Docker'],
    outcome: 'Real-time flagging under 3 seconds enables transaction blocking before funds clear — batch detection cannot do this.',
    links: [
      ['Live demo', 'https://pyspark-aml-transaction-analysis.streamlit.app/'],
      ['GitHub', 'https://github.com/RidhanPar/pyspark-aml-transaction-analysis']
    ],
    featured: true
  },
  {
    title: 'Payment Webhook Processor',
    category: 'Full-stack',
    eyebrow: 'Payments backend engineering',
    description:
      'FastAPI service that ingests payment lifecycle webhooks with strict validation, race-safe idempotency enforced by a database unique constraint, and a state machine that rejects illegal payment transitions; phase 2 verifies and maps real GoCardless sandbox webhooks.',
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'pytest', 'GoCardless API'],
    outcome: 'Processes duplicate and concurrent webhook deliveries exactly once — the failure mode that actually bites payment consumers.',
    links: [['GitHub', 'https://github.com/RidhanPar/payment-webhook-processor']]
  },
  {
    title: 'Payment Retry A/B Test Readout',
    category: 'ML & Analytics',
    eyebrow: 'Experiment analysis',
    description:
      'Full experiment readout for a smart payment-retry strategy: two-proportion z-test on recovery rate, power analysis with Cohen’s h, randomization checks, and guardrail metrics for recovery speed and disputes.',
    tech: ['Python', 'statsmodels', 'Hypothesis Testing', 'Pandas', 'Streamlit'],
    outcome: 'Turns a 5.1-point recovery-rate lift into a defensible ship/no-ship recommendation.',
    links: [['GitHub', 'https://github.com/RidhanPar/payment-retry-ab-test']]
  },
  {
    title: 'Merchant CLV Segmentation',
    category: 'Data & BI',
    eyebrow: 'Payments portfolio analytics',
    description:
      'Segments 3,000 merchants across 575k simulated transactions with RFM scoring, estimates platform-revenue lifetime value per merchant, and ranks where payment failures put the most value at risk.',
    tech: ['Python', 'Pandas', 'RFM Segmentation', 'CLV Modelling', 'Streamlit'],
    outcome: 'Points retention and payment-recovery effort at the merchants actually worth saving.',
    links: [['GitHub', 'https://github.com/RidhanPar/payment-merchant-clv-segmentation']]
  },
  {
    title: 'Databricks Credit Risk Feature Pipeline',
    category: 'ML & Analytics',
    eyebrow: 'Lakehouse feature engineering',
    description:
      'End-to-end Databricks workflow: Delta Lake ingestion, PySpark window-function feature engineering with MERGE upserts, XGBoost training tracked in MLflow, and automated PSI drift monitoring using Delta time travel.',
    tech: ['Databricks', 'PySpark', 'Delta Lake', 'MLflow', 'XGBoost', 'SHAP'],
    outcome: 'Shows production-shaped lakehouse feature engineering with drift monitoring built in.',
    links: [['GitHub', 'https://github.com/RidhanPar/databricks-credit-risk-features']]
  },
  {
    title: 'Low Stock Reorder Alert',
    category: 'AI & Automation',
    eyebrow: 'Power Automate workflow',
    description:
      'Event-driven Power Automate cloud flow that watches SharePoint stock intake, flags items at or below their reorder threshold, raises reorder requests, and alerts purchasing in Teams and email — documented as a complete rebuildable specification.',
    tech: ['Power Automate', 'SharePoint', 'Microsoft Teams', 'Workflow Automation'],
    outcome: 'Removes the manual watch step that turns missed reorders into stockouts.',
    links: [['GitHub', 'https://github.com/RidhanPar/power-automate-reorder-alert']]
  },
  {
    title: 'Internal Knowledge Assistant',
    category: 'AI & Automation',
    eyebrow: 'Agentic RAG',
    description:
      'Agentic retrieval service that answers questions over internal documents with grounded, cited answers, and refuses when the documents do not support a response. A LangGraph agent decides when to retrieve, chooses between document search and a structured directory lookup, generates with Claude via the Anthropic API, and searches local embeddings in pgvector. Deployed on AWS EC2 with Terraform.',
    tech: ['FastAPI', 'LangGraph', 'Claude (Anthropic)', 'pgvector', 'sentence-transformers', 'Terraform', 'Docker'],
    outcome: 'Ships with an evaluation suite that scores retrieval quality and answer faithfulness on a labeled question set and flags ungrounded answers.',
    links: [['GitHub', 'https://github.com/RidhanPar/internal-knowledge-assistant']]
  },
  {
    title: 'AWS Iceberg Lakehouse',
    category: 'Data & BI',
    eyebrow: 'Lakehouse on AWS',
    description:
      'A working payments data lakehouse on real AWS infrastructure. Parquet lands in S3, is registered as Apache Iceberg tables in the Glue Data Catalog, queried with Athena, and transformed with dbt into tested staging and mart models. Schema evolution, time travel, and partition evolution are each run on the live tables.',
    tech: ['AWS S3', 'Apache Iceberg', 'AWS Glue', 'Amazon Athena', 'dbt', 'PyIceberg'],
    outcome: 'Lakehouse fundamentals on real infrastructure, with 25 passing dbt tests, measured partition pruning, and a full teardown.',
    links: [['GitHub', 'https://github.com/RidhanPar/aws-iceberg-lakehouse']]
  },
  {
    title: 'Live Payments Analytics on ClickHouse',
    category: 'Data & BI',
    eyebrow: 'Streaming analytics',
    description:
      'A running analytics stack, not a static demo: a producer streams 25 to 40 payment events per second into ClickHouse, materialized views maintain per-minute and per-merchant aggregates as data arrives, an anomaly detector flags merchants whose failure rate breaks from their baseline, and Superset serves auto-refreshing dashboards. Runs on Docker Compose, built across 12 reviewed pull requests.',
    tech: ['ClickHouse', 'Apache Superset', 'Docker Compose', 'Materialized Views', 'Python'],
    outcome: 'Streaming aggregation, TTL retention, and anomaly detection handled as properties of the tables rather than extra systems.',
    links: [['GitHub', 'https://github.com/RidhanPar/clickhouse-payments-analytics']]
  },
  {
    title: 'PHP eCommerce Store',
    category: 'Full-stack',
    eyebrow: 'Plain PHP MVC',
    description:
      'A small eCommerce storefront in plain PHP with no framework, hand-writing the router, front controller, and autoloader so the mechanics stay visible. Includes cart and checkout that saves an order, stock decremented inside the order transaction with row locking, CSRF protection on state-changing forms, and tests run in CI.',
    tech: ['PHP 8.2', 'MySQL', 'PDO', 'Apache', 'Docker', 'CI'],
    outcome: 'PHP fundamentals done properly: MVC structure, OOP models, and PDO prepared statements without a framework.',
    links: [['GitHub', 'https://github.com/RidhanPar/php-ecommerce-store']]
  },
  {
    title: 'Airline Crew Rostering Optimisation',
    category: 'ML & Analytics',
    eyebrow: 'Operations research',
    description:
      'Mixed-Integer Program that assigns 136 pilots to 740 monthly duty periods under rest rules, daily, weekly and monthly duty caps, type ratings, licence expiry, crew bases and leave, trading pay cost against fairness. Wrapped in a SQL data layer that quarantines bad input, infeasibility diagnostics that name the conflicting rule, an independent roster checker, and 11 what-if scenarios exported to Power BI.',
    tech: ['Python', 'PuLP', 'CBC', 'SQL', 'SQLite', 'pandas', 'Power BI', 'pytest'],
    outcome: 'Full month rostered with every seat covered in 9.7 seconds, proven within 0.28% of optimal, with zero violations from the independent checker.',
    links: [['GitHub', 'https://github.com/RidhanPar/crew-rostering-optimisation']]
  },
  {
    title: 'Data Analysis Projects',
    category: 'Data & BI',
    eyebrow: 'Analytics portfolio',
    description:
      'Collection of practical analysis work including movie-industry exploration, SQL housing-data cleaning, COVID-19 analysis, and visualization.',
    tech: ['Python', 'SQL', 'Pandas', 'Tableau', 'Data Cleaning'],
    outcome: 'Demonstrates hands-on analysis from raw data to insight.',
    links: [['GitHub', 'https://github.com/RidhanPar/DataAnalysisProjects']]
  },
  {
    title: 'Book Social Network',
    category: 'Full-stack',
    eyebrow: 'Community product',
    description:
      'A social-network experience for book readers to discover books, connect with other readers, and exchange recommendations.',
    tech: ['TypeScript', 'Angular', 'Spring Boot', 'REST API'],
    outcome: 'Explores end-to-end product development and community features.',
    links: [['GitHub', 'https://github.com/RidhanPar/book-social-network']]
  },
  {
    title: 'E-Commerce Store',
    category: 'Full-stack',
    eyebrow: 'Commerce experience',
    description:
      'Angular and TypeScript storefront focused on reusable UI patterns, product discovery, and a clear shopping journey.',
    tech: ['TypeScript', 'Angular', 'Frontend Development'],
    outcome: 'Shows practical component-driven commerce development.',
    links: [['GitHub', 'https://github.com/RidhanPar/E-Commerce-Store']]
  },
  {
    title: 'Employee Management System',
    category: 'Full-stack',
    eyebrow: 'Java + React application',
    description:
      'Full-stack employee management application represented across separate Spring Boot backend and React frontend repositories.',
    tech: ['Java', 'Spring Boot', 'React', 'REST API'],
    outcome: 'Demonstrates a separated frontend and backend application architecture.',
    links: [
      ['Backend', 'https://github.com/RidhanPar/employee-management-system'],
      ['Frontend', 'https://github.com/RidhanPar/employee-management-system-ui']
    ]
  },
  {
    title: 'Restaurant Reservation Web',
    category: 'Full-stack',
    eyebrow: 'Reservation experience',
    description:
      'Restaurant reservation website built as an early web-development project with a focus on practical booking interactions.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    outcome: 'Captures foundational web-development and interaction design skills.',
    links: [['GitHub', 'https://github.com/RidhanPar/Restaurent_reservation_web']]
  },
  {
    title: 'WhatsNew Social Forum',
    category: 'Full-stack',
    eyebrow: 'Community platform',
    description:
      'Reddit-style discussion platform where users create subreddits, submit posts, comment, and vote, secured with Spring Security and JWT authentication across a Spring Boot API and Angular client.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Angular'],
    outcome: 'Demonstrates a secured, role-aware full-stack application architecture.',
    links: [['GitHub', 'https://github.com/RidhanPar/whatsnew']]
  },
  {
    title: 'Social Media Dashboard',
    category: 'Full-stack',
    eyebrow: 'Responsive UI build',
    description:
      'Responsive social media analytics dashboard with a dark and light theme toggle, built from a Frontend Mentor challenge using a structured SCSS architecture and a Gulp build pipeline.',
    tech: ['SCSS', 'JavaScript', 'HTML', 'Gulp', 'Responsive Design'],
    outcome: 'Shows attention to responsive layout, theming, and maintainable styling.',
    links: [['GitHub', 'https://github.com/RidhanPar/fem-sociam-media-dark-light-toggle-dashboard']]
  }
];

const agentWorkflows = [
  {
    name: 'Ticket Triage Graph',
    role: 'Bounded agent orchestration',
    description:
      'Route support tickets through a LangGraph workflow that retrieves context, proposes actions, and pauses sensitive changes for approval.',
    outputs: ['Explicit tool steps', 'Approval gates', 'Deterministic fallback']
  },
  {
    name: 'Knowledge Retrieval',
    role: 'Grounded response context',
    description:
      'Search a pgvector-backed knowledge base and attach retrieved evidence before the workflow recommends a ticket action.',
    outputs: ['Vector search', 'Retrieved evidence', 'Source-aware output']
  },
  {
    name: 'Tool Orchestration',
    role: 'Connected workflow execution',
    description:
      'Coordinate knowledge search, customer-history lookup, and ticket updates through explicit tools with role checks and audit records.',
    outputs: ['Tool traces', 'Role checks', 'Audit events']
  },
  {
    name: 'CI and Observability',
    role: 'Reliable agent delivery',
    description:
      'Support agent-assisted delivery with automated checks, clear logs, explainable outputs, and measurable operational outcomes.',
    outputs: ['Quality gates', 'Auditability', 'Operational metrics']
  }
];

const skills = [
  'SQL',
  'Python',
  'Power BI',
  'Tableau',
  'Looker Studio',
  'Excel',
  'Snowflake',
  'dbt',
  'Databricks',
  'HR Analytics',
  'People Data',
  'Employee Lifecycle Automation',
  'Machine Learning',
  'XGBoost',
  'SHAP',
  'Streamlit',
  'FastAPI',
  'React',
  'Workflow Automation',
  'LangGraph',
  'RAG',
  'OpenTelemetry',
  'AI Agents',
  'GitHub Actions',
  'PySpark',
  'Apache Kafka',
  'Isolation Forest',
  'Delta Lake',
  'MLflow',
  'R',
  'n8n',
  'OpenAI API',
  'Anthropic API',
  'Docker'
];

function ProjectCard({ project }) {
  const [caseOpen, setCaseOpen] = useState(false);
  const demoLink = project.links.find(([label]) => label === 'Live demo');
  const study = project.caseStudy;
  const panelId = `case-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <article className={`projectCard ${project.featured ? 'featured' : ''}`}>
      {project.image && (
        <a
          className="projectThumb"
          href={(demoLink || project.links[0])[1]}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title}${demoLink ? ' live demo' : ''}`}
        >
          <img src={project.image} alt={`${project.title} interface preview`} loading="lazy" />
        </a>
      )}
      <div className="projectTopline">
        <p className="eyebrow">{project.eyebrow}</p>
        {project.featured && <span className="featuredBadge">Featured</span>}
      </div>
      <h3>{project.title}</h3>
      <p className="projectDescription">{project.description}</p>
      <p className="outcome">
        <CheckCircle2 size={17} aria-hidden="true" />
        {project.outcome}
      </p>
      <div className="tags" aria-label={`${project.title} technologies`}>
        {project.tech.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="projectLinks">
        {project.links.map(([label, url]) => (
          <a key={url} href={url} target="_blank" rel="noreferrer">
            {label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </div>
      {study && (
        <div className="caseStudy">
          <button
            type="button"
            className={caseOpen ? 'caseToggle open' : 'caseToggle'}
            aria-expanded={caseOpen}
            aria-controls={panelId}
            onClick={() => setCaseOpen(!caseOpen)}
          >
            {caseOpen ? 'Hide case study' : 'Read the case study'}
            <ChevronDown size={16} aria-hidden="true" />
          </button>
          {caseOpen && (
            <div className="casePanel" id={panelId}>
              <div className="caseBlock">
                <h4>Problem</h4>
                <p>{study.problem}</p>
              </div>
              <div className="caseBlock">
                <h4>Approach</h4>
                <p>{study.approach}</p>
              </div>
              <div className="caseBlock">
                <h4>Architecture</h4>
                <p>{study.architecture}</p>
              </div>
              <div className="caseBlock">
                <h4>Results</h4>
                <ul className="caseMetrics">
                  {study.results.map(([label, value]) => (
                    <li key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              {study.note && <p className="caseNote">{study.note}</p>}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function AgentLab() {
  const [activeAgent, setActiveAgent] = useState(0);
  const agent = agentWorkflows[activeAgent];

  return (
    <section className="section agentSection" id="agents">
      <div className="sectionHeader splitHeader">
        <div>
          <p className="sectionLabel">AI agent workflow</p>
          <h2>Using agents as capable collaborators, not black boxes.</h2>
        </div>
        <p>
          I combine agent-assisted execution with analytics discipline: clear scope, connected tools,
          verification, and measurable outcomes.
        </p>
      </div>

      <div className="agentLab">
        <div className="agentTabs" role="tablist" aria-label="AI agent workflow examples">
          {agentWorkflows.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={activeAgent === index}
              className={activeAgent === index ? 'agentTab active' : 'agentTab'}
              onClick={() => setActiveAgent(index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.name}</strong>
              <small>{item.role}</small>
            </button>
          ))}
        </div>

        <div className="agentPanel" role="tabpanel">
          <div className="terminalBar">
            <span />
            <span />
            <span />
            <p>agent-workflow / {agent.name.toLowerCase().replaceAll(' ', '-')}</p>
          </div>
          <Bot size={34} aria-hidden="true" />
          <p className="sectionLabel">{agent.role}</p>
          <h3>{agent.name}</h3>
          <p>{agent.description}</p>
          <div className="agentOutputs">
            {agent.outputs.map((output) => (
              <span key={output}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {output}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === 'All' || project.category === filter;
      const searchable = `${project.title} ${project.description} ${project.tech.join(' ')}`.toLowerCase();
      return matchesFilter && searchable.includes(normalizedQuery);
    });
  }, [filter, query]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <header className="nav">
        <a className="logo" href="#top" onClick={closeMenu} aria-label="Ridhan Parvendhan home">
          RP<span>.</span>
        </a>
        <nav className={menuOpen ? 'navLinks open' : 'navLinks'} aria-label="Primary navigation">
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#agents" onClick={closeMenu}>AI Agents</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <div className="navActions">
          <button
            type="button"
            className="iconButton"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <button
            type="button"
            className="iconButton menuButton"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroText">
            <div className="availability">
              <span />
              Open to AI Automation Engineer, Data Analyst, and Data Scientist opportunities in Riga and remote
            </div>
            <p className="kicker">Data Analyst / AI Automation Engineer / Analytics Builder</p>
            <h1>
              I turn data, AI agents, and automation into <span>business outcomes.</span>
            </h1>
            <p className="heroIntro">
              I am Ridhan Parvendhan, a Data Analyst and AI Automation Engineer based in Riga with
              3+ years of experience building LLM-powered automation workflows, real-time data
              pipelines, and BI reporting systems — with independent DS projects in fraud detection,
              AML monitoring, and security threat detection.
            </p>
            <div className="buttons">
              <a className="primaryButton" href="#projects">
                Explore my work
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a className="textButton" href="mailto:ridhanparvendhan@gmail.com">
                Let&apos;s talk
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="heroProof" aria-label="Portfolio highlights">
              <div><strong>29</strong><span>Selected project stories</span></div>
              <div><strong>10</strong><span>Live project demos</span></div>
              <div><strong>4+</strong><span>Years building data and AI systems</span></div>
            </div>
          </div>

          <div className="heroVisual">
            <div className="photoFrame">
              <img src="/ridhan-photo.png" alt="Ridhan Parvendhan" />
            </div>
            <div className="floatingCard cardOne">
              <Database size={18} aria-hidden="true" />
              <span>Analytics engineering</span>
            </div>
            <div className="floatingCard cardTwo">
              <Bot size={18} aria-hidden="true" />
              <span>Agentic workflows</span>
            </div>
            <div className="floatingCard cardThree">
              <Workflow size={18} aria-hidden="true" />
              <span>Automation delivery</span>
            </div>
          </div>
        </section>

        <section className="capabilityStrip" aria-label="Core capabilities">
          <div><BarChart3 size={22} /><span>Business intelligence</span></div>
          <div><Database size={22} /><span>Analytics engineering</span></div>
          <div><Bot size={22} /><span>AI agents</span></div>
          <div><Zap size={22} /><span>Workflow automation</span></div>
          <div><Code2 size={22} /><span>Data products</span></div>
        </section>

        <section className="section" id="projects">
          <div className="sectionHeader splitHeader">
            <div>
              <p className="sectionLabel">Selected and GitHub work</p>
              <h2>Projects built to answer real operational questions.</h2>
            </div>
            <p>
              The collection highlights selected public work, with the strongest recent analytics,
              machine-learning, and automation evidence featured first.
            </p>
          </div>

          <div className="projectControls">
            <div className="filters" aria-label="Filter projects by category">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={filter === category ? 'filter active' : 'filter'}
                  onClick={() => setFilter(category)}
                  aria-pressed={filter === category}
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="searchBox">
              <Search size={18} aria-hidden="true" />
              <span className="srOnly">Search projects</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects or tools"
              />
            </label>
          </div>

          <div className="resultsLine" aria-live="polite">
            Showing {filteredProjects.length} of {projects.length} project stories
          </div>

          <div className="projectGrid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <AgentLab />

        <section className="section" id="experience">
          <div className="sectionHeader splitHeader">
            <div>
              <p className="sectionLabel">Experience</p>
              <h2>Technical depth grounded in business operations.</h2>
            </div>
            <p>
              My work sits where reporting, support operations, systems thinking, and process
              improvement meet.
            </p>
          </div>
          <div className="timeline">
            <article>
              <p className="timelineDate">Apr 2024 – Present</p>
              <div>
                <h3>AI Automation Engineer</h3>
                <p className="company">ALIEF MAJU ENTERPRISE / Malaysia (Remote)</p>
                <p>Built 9 n8n automation pipelines, integrated OpenAI and Anthropic LLM APIs for document processing and reporting, built RAG pipelines with vector databases, automated SQL validation frameworks; reduced team manual reporting effort by 40+ hours per week.</p>
              </div>
            </article>
            <article>
              <p className="timelineDate">Jan 2023 – Apr 2024</p>
              <div>
                <h3>Data Analyst</h3>
                <p className="company">ALIEF MAJU ENTERPRISE / Malaysia (Remote)</p>
                <p>Analysed procurement and logistics data using SQL, Python, and Excel; built Tableau, Power BI, and Looker dashboards monitoring 200+ supplier KPIs; delivered weekly management reports in Google Sheets.</p>
              </div>
            </article>
            <article>
              <p className="timelineDate">Jun 2025 - May 2026</p>
              <div>
                <h3>Senior Product Specialist</h3>
                <p className="company">TELUS Digital / Riga, Latvia</p>
                <p>Resolved advanced advertising issues, analyzed case and backend patterns, and contributed operational insight for process improvement.</p>
              </div>
            </article>
            <article>
              <p className="timelineDate">Nov 2024 - Jun 2025</p>
              <div>
                <h3>Product Specialist</h3>
                <p className="company">TELUS Digital / Riga, Latvia</p>
                <p>Supported business users across advertising, billing, policy, and platform issues while collaborating with technical and product teams.</p>
              </div>
            </article>
            <article>
              <p className="timelineDate">Sep 2023 - Dec 2023</p>
              <div>
                <h3>Technical Specialist Intern</h3>
                <p className="company">Demola Global / Riga, Latvia</p>
                <p>Built a chatbot and website concept to improve university information access for mature-age students.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section learningSection">
          <div className="sectionHeader splitHeader">
            <div>
              <p className="sectionLabel">Education and toolkit</p>
              <h2>A broad technical base, applied with focus.</h2>
            </div>
            <p>
              Formal computer science education, professional analytics certification, and a
              continually evolving AI-assisted delivery toolkit.
            </p>
          </div>
          <div className="educationGrid">
            <a href="https://rnu.lv/en/" target="_blank" rel="noreferrer">
              <span>Master of Science</span>
              <strong>Computer Science</strong>
              <p>Riga Nordic University / 120 ECTS</p>
              <ArrowUpRight size={18} />
            </a>
            <a href="https://www.rtu.lv/" target="_blank" rel="noreferrer">
              <span>Bachelor of Engineering Science</span>
              <strong>Computer Science and Control</strong>
              <p>Riga Technical University / 180 ECTS</p>
              <ArrowUpRight size={18} />
            </a>
            <a href="https://coursera.org/share/5fc528ef7a85c5043b393dc742731088" target="_blank" rel="noreferrer">
              <span>Professional Certificate</span>
              <strong>Google Data Analytics</strong>
              <p>Google Career Certificates</p>
              <ArrowUpRight size={18} />
            </a>
            <a href="https://www.credly.com/badges/8324a909-d39e-4462-a1f1-b49acca69aba/linked_in_profile" target="_blank" rel="noreferrer">
              <span>Credential</span>
              <strong>Data Visualization with Python</strong>
              <p>IBM / Coursera</p>
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="skillGrid" aria-label="Technical skills">
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </section>

        <section className="contact" id="contact">
          <div>
            <p className="sectionLabel">Start a conversation</p>
            <h2>Have a data problem, an automation idea, or an agent workflow to build?</h2>
            <p>
              I am open to data analytics, BI, AI automation, operations analytics, and workflow
              transformation opportunities.
            </p>
          </div>
          <div className="contactLinks">
            <a href="mailto:ridhanparvendhan@gmail.com"><Mail size={19} />Email</a>
            <a href="https://github.com/RidhanPar/" target="_blank" rel="noreferrer"><Code2 size={19} />GitHub</a>
            <a href="https://www.linkedin.com/in/ridhan-parvendhan-0253b6226/" target="_blank" rel="noreferrer"><ArrowUpRight size={19} />LinkedIn</a>
          </div>
        </section>
      </main>

      <footer>
        <p>Ridhan Parvendhan / Data, AI automation, and operations</p>
        <a href="#top">Back to top <ArrowUpRight size={15} /></a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
