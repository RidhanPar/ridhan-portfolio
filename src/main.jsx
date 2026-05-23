import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  {
    title: 'AI Operations & Workflow Automation Platform',
    type: 'AI Automation',
    description:
      'Enterprise-style AI operations platform for SLA monitoring, ticket routing, workflow automation, AI summaries, and operational dashboards.',
    tech: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'OpenAI API'],
    links: [
      ['GitHub', 'https://github.com/RidhanPar/ai-ops-workflow-automation-platform']
    ]
  },
  {
    title: 'Customer Support Intelligence Platform',
    type: 'Machine Learning + Operations Analytics',
    description:
      'Built a support analytics platform that predicts SLA breach risk, monitors ticket performance, and recommends actions for support teams.',
    tech: ['Python', 'Streamlit', 'scikit-learn', 'Pandas', 'Plotly', 'SQL'],
    links: [
      ['GitHub', 'https://github.com/RidhanPar/customer-support-intelligence-platform']
    ]
  },
  {
    title: 'EduPulse Student Performance Prediction',
    type: 'Machine Learning System',
    description:
      'Developed a student early warning platform that predicts academic risk, explains feature importance, and compares predictions with actual outcomes.',
    tech: ['Python', 'Flask', 'scikit-learn', 'Pandas', 'HTML', 'CSS'],
    links: [
      ['Live Demo', 'https://edupulse-platform.onrender.com/'],
      ['GitHub', 'https://github.com/RidhanPar/edupulse-platform']
    ]
  },
  {
    title: 'Smart Workforce & Approval Automation System',
    type: 'Self-Initiated TELUS Innovation',
    description:
      'Created internal Google Sheets automation for taxi approval, shift swap validation, workforce coordination, and operational visibility.',
    tech: ['Google Sheets', 'Advanced Formulas', 'SQL', 'Power BI'],
    links: []
  },
  {
    title: 'Data Visualization and BI Using Looker',
    type: 'Business Intelligence',
    description:
      'Designed an interactive Looker Studio dashboard to analyze order trends, regional sales distribution, customer segments, and product categories.',
    tech: ['Looker Studio', 'Data Visualization', 'BI Reporting'],
    links: [
      ['Dashboard', 'https://lookerstudio.google.com/reporting/94f4c3d9-5233-457c-8e15-354910b8b7ae']
    ]
  },
  {
    title: 'Casino Data Visualization Project',
    type: 'Tableau Dashboard',
    description:
      'Created multiple Tableau dashboards showing monthly trends, quarterly changes, casino statistics, and operational insights.',
    tech: ['Tableau', 'Calculated Fields', 'Parameters', 'Dashboards'],
    links: [
      ['Tableau', 'https://public.tableau.com/app/profile/ridhan.parvendhan/viz/Evol_task/WagerT1#1']
    ]
  },
  {
    title: 'Movie Industry Data Analysis',
    type: 'Python Data Analysis',
    description:
      'Analyzed movie industry data using Python to clean data, explore correlations, and visualize financial performance patterns.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    links: [
      ['GitHub', 'https://github.com/RidhanPar/DataAnalysisProjects/blob/main/MovieDataAnalysisPython.ipynb']
    ]
  },
  {
    title: 'Housing Data Cleaning Project',
    type: 'SQL Data Cleaning',
    description:
      'Cleaned Nashville housing data using SQL to standardize dates, split address fields, remove duplicates, and improve reporting readiness.',
    tech: ['SQL', 'CTE', 'ROW_NUMBER', 'CASE', 'Data Cleaning'],
    links: [
      ['GitHub', 'https://github.com/RidhanPar/DataAnalysisProjects/blob/main/DataCleaningSQLProject.sql']
    ]
  },
  {
    title: 'COVID-19 Data Analysis',
    type: 'SQL + Tableau',
    description:
      'Explored global COVID-19 deaths and vaccination data using SQL and built a Tableau dashboard to present key findings.',
    tech: ['SQL', 'Tableau', 'CTE', 'Views', 'Window Functions'],
    links: [
      ['SQL Script', 'https://github.com/RidhanPar/DataAnalysisProjects/blob/main/CovidDataExplorationScript.sql'],
      ['Dashboard', 'https://public.tableau.com/views/Covid19Visualisation_17142555358570/Dashboard1?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link']
    ]
  },
  {
    title: 'Advanced Excel Data Analytics Project',
    type: 'Excel Dashboard',
    description:
      'Built an Excel analytics dashboard using pivot tables, data cleaning, filters, and charts to analyze behavioral and customer trends.',
    tech: ['Excel', 'Pivot Tables', 'Dashboard', 'Data Cleaning'],
    links: []
  }
];

function App() {
  return (
    <div className="site">
      <header className="nav">
        <div className="logo">Ridhan Parvendhan<span>.</span></div>
        <div className="navLinks">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </header>

      <section className="hero">
  <div className="heroText">
    <div className="pill">
      Data Analyst • AI Automation • Data Science
    </div>

    <h1>
      Hi, I’m Ridhan. <span>I turn data into smarter workflows.</span>
    </h1>

    <p>
      Computer Science graduate based in Riga, focused on data analytics,
      AI automation, dashboards, machine learning, and workflow improvement.
    </p>

    <div className="buttons">
      <a className="goldBtn" href="#projects">View Projects</a>

      <a className="goldBtn" href="/Ridhan.pdf" download>
        Download CV
      </a>

      <a className="plainBtn" href="mailto:ridhanparvendhan@gmail.com">
        Contact Me
      </a>
    </div>
  </div>

  <div className="photoColumn">
    <div className="photoFrame">
      <img
        src="/ridhan-photo.png"
        alt="Ridhan Parvendhan"
        className="profilePhoto"
      />
    </div>
  </div>
</section>
      <section className="stats">
        <div>
          <h3>Operations Experience</h3>
          <p>Enterprise support background with SLA awareness, reporting, ticket analysis, and workflow improvement.</p>
        </div>
        <div>
          <h3>Automation Builder</h3>
          <p>Created self-initiated tools for approval workflows, shift swaps, taxi eligibility, and tracking visibility.</p>
        </div>
        <div>
          <h3>Data Storyteller</h3>
          <p>Built dashboards and analysis projects using SQL, Python, Tableau, Looker Studio, Excel, and Power BI.</p>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="sectionHeader">
          <span>Experience</span>
          <h2>Enterprise support, analytics, and automation mindset.</h2>
        </div>

        <div className="timeline">
          <div className="timelineItem">
            <h3>Senior Product Specialist</h3>
            <p className="muted">TELUS Digital • Riga, Latvia • 2025 – Present</p>
            <p>Troubleshoot advanced advertising issues, analyze backend/case data, identify recurring patterns, and support process improvement through operational insights.</p>
          </div>

          <div className="timelineItem">
            <h3>Product Specialist</h3>
            <p className="muted">TELUS Digital • Riga, Latvia • 2024 – 2025</p>
            <p>Supported business users across account, advertising, billing, policy, and platform issues while collaborating with product, legal, and technical teams.</p>
          </div>

          <div className="timelineItem">
            <h3>Data Analyst</h3>
            <p className="muted">ALIEF MAJU ENTERPRISE • Malaysia • 2021 – 2024</p>
            <p>Collected, processed, and analyzed datasets, created reports and dashboards, maintained CRM systems, and supported marketing and business insights.</p>
          </div>

          <div className="timelineItem">
            <h3>Technical Specialist Intern</h3>
            <p className="muted">Demola Global • Riga, Latvia • 2023</p>
            <p>Built a chatbot and website concept to improve university information access for mature-age students.</p>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="sectionHeader">
          <span>Projects</span>
          <h2>Selected work across AI, analytics, BI, and automation.</h2>
        </div>

        <div className="projectGrid">
          {projects.map((project) => (
            <div className="projectCard" key={project.title}>
              <p className="type">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="tags">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>

              {project.links.length > 0 && (
                <div className="projectLinks">
                  {project.links.map(([label, url]) => (
                    <a key={url} href={url} target="_blank">{label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="education">
        <div className="sectionHeader">
          <span>Education & Certifications</span>
          <h2>Academic background and verified learning.</h2>
        </div>

        <div className="eduGrid">
          <div className="eduCard">
            <h3>Master of Science in Computer Science</h3>
            <p>ISMA University of Applied Sciences • Riga</p>
            <a href="https://isma.lv/" target="_blank">University Website</a>
          </div>

          <div className="eduCard">
            <h3>Bachelor Degree of Engineering Science in Computer Science and Control</h3>
            <p>Riga Technical University • 180 ECTS</p>
            <a href="https://www.rtu.lv/" target="_blank">University Website</a>
          </div>

          <div className="eduCard">
            <h3>Data Visualization with Python</h3>
            <p>IBM / Coursera</p>
            <a href="https://www.credly.com/badges/8324a909-d39e-4462-a1f1-b49acca69aba/linked_in_profile" target="_blank">Credential</a>
          </div>

          <div className="eduCard">
            <h3>Google Data Analytics Professional Certificate</h3>
            <p>Google Career Certificates</p>
          </div>
        </div>
      </section>

      <section className="section skills">
        <div className="sectionHeader">
          <span>Skills</span>
          <h2>Tools I use to solve business problems.</h2>
        </div>

        <div className="skillGrid">
          {['Python', 'SQL', 'Power BI', 'Tableau', 'Looker Studio', 'Excel', 'Google Sheets', 'Machine Learning', 'FastAPI', 'React', 'Docker', 'Streamlit', 'PostgreSQL', 'Data Cleaning', 'Dashboard Development', 'Workflow Automation'].map(skill => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contactBox">
          <h2>Let’s build smarter workflows.</h2>
          <p>Open to AI automation, data analytics, BI, operations analytics, workflow transformation, and process improvement opportunities.</p>

          <div className="contactButtons">
            <a className="goldBtn" href="mailto:ridhanparvendhan@gmail.com">Email Me</a>
            <a className="plainBtn" href="https://github.com/RidhanPar/" target="_blank">GitHub</a>
            <a className="plainBtn" href="https://ridhan-portfolio.vercel.app/" target="_blank">Portfolio</a>
            <a className="plainBtn" href="https://www.linkedin.com/in/ridhan-parvendhan-0253b6226/" target="_blank">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);