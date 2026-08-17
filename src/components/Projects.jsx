import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutGrid, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    gsap.from(gridRef.current.children, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'datascience', label: 'Data Science' },
    { id: 'automation', label: 'Automation' },
    { id: 'python', label: 'Python / Web' }
  ];

  const projectList = [
    {
      category: 'datascience',
      badge: 'Data Science & ML',
      title: 'Predictive Customer Churn Analytics',
      desc: 'End-to-end data cleaning, feature engineering, and Machine Learning pipeline designed to predict customer churn risks using XGBoost and Scikit-Learn.',
      tags: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit']
    },
    {
      category: 'automation',
      badge: 'Automation & Web',
      title: 'Enterprise Web Scraping Platform',
      desc: 'High-throughput distributed web scraper built with Playwright and Pydantic validation, featuring proxy rotation and automated HTML extraction.',
      tags: ['Python', 'Playwright', 'Pydantic', 'MongoDB']
    },
    {
      category: 'ai',
      badge: 'AI & Automation',
      title: 'n8n Lead Qualification Engine',
      desc: 'Automated workflow that parses incoming sales leads, enriches data via OpenAI API, and routes qualified leads directly to HubSpot and Slack.',
      tags: ['n8n', 'OpenAI', 'Webhooks', 'HubSpot API']
    },
    {
      category: 'python',
      badge: 'Python / Backend',
      title: 'FastAPI Financial Analytics REST API',
      desc: 'Asynchronous microservice providing high-speed financial metric aggregations, JWT authentication, and structured PostgreSQL queries.',
      tags: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker']
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectList
    : projectList.filter(p => p.category === activeFilter);

  return (
    <section className="section" id="projects" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><LayoutGrid size={16} /> Portfolio</span>
          <h2 className="section-title">Selected <span>Engineering Projects</span></h2>
          <p className="section-subtitle">Real-world AI, Data Science, Python, and Automation solutions.</p>
        </div>

        {/* Project Category Filters */}
        <div className="skills-filter projects-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" ref={gridRef}>
          {filteredProjects.map((p, idx) => (
            <div key={idx} className="glass-card project-card" data-category={p.category}>
              <div>
                <div className="project-card-header">
                  <span className="project-category-badge">{p.badge}</span>
                  <div className="project-links-group">
                    <a href="https://github.com/HaroonArif7" target="_blank" rel="noopener" className="project-link-icon" title="View Source">
                      <Github size={16} />
                    </a>
                  </div>
                </div>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.desc}</p>
              </div>
              <div>
                <div className="project-tech-tags">
                  {p.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
