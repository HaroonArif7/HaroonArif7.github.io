import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutGrid, Github, Activity, Terminal, Bot, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    const items = gridRef.current?.children ? Array.from(gridRef.current.children) : [];
    if (!items.length) return;

    gsap.from(items, {
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
  }, { scope: containerRef, dependencies: [activeFilter] });

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
      tags: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit'],
      visualType: 'ml-metrics',
      metricVal: '89.4% ROC-AUC',
      metricLabel: 'Model Accuracy',
      icon: <Activity size={22} color="#38bdf8" />
    },
    {
      category: 'automation',
      badge: 'Automation & Web',
      title: 'Enterprise Web Scraping Platform',
      desc: 'High-throughput distributed web scraper built with Playwright and Pydantic validation, featuring proxy rotation and automated HTML extraction.',
      tags: ['Python', 'Playwright', 'Pydantic', 'MongoDB'],
      visualType: 'scraper-nodes',
      metricVal: '50k+ Daily',
      metricLabel: 'Extracted Listings',
      icon: <Terminal size={22} color="#06b6d4" />
    },
    {
      category: 'ai',
      badge: 'AI & Automation',
      title: 'n8n Lead Qualification Engine',
      desc: 'Automated workflow that parses incoming sales leads, enriches data via OpenAI API, and routes qualified leads directly to HubSpot and Slack.',
      tags: ['n8n', 'OpenAI', 'Webhooks', 'HubSpot API'],
      visualType: 'workflow-nodes',
      metricVal: '15 Hrs/Wk',
      metricLabel: 'Saved Overhead',
      icon: <Bot size={22} color="#818cf8" />
    },
    {
      category: 'python',
      badge: 'Python / Backend',
      title: 'FastAPI Financial Analytics REST API',
      desc: 'Asynchronous microservice providing high-speed financial metric aggregations, JWT authentication, and structured PostgreSQL queries.',
      tags: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
      visualType: 'api-latency',
      metricVal: '< 40ms',
      metricLabel: 'Endpoint Latency',
      icon: <Zap size={22} color="#34d399" />
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectList
    : projectList.filter(p => p.category === activeFilter);

  return (
    <section className="section" id="projects" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><LayoutGrid size={16} /> Portfolio Showcase</span>
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
              
              {/* Visual Graphic Banner Header */}
              <div className="project-banner-visual">
                <div className="banner-icon-badge">{p.icon}</div>
                <div className="banner-metric-box">
                  <div className="num">{p.metricVal}</div>
                  <div className="label">{p.metricLabel}</div>
                </div>
                <div className="banner-grid-overlay"></div>
              </div>

              <div className="project-card-body">
                <div className="project-card-header">
                  <span className="project-category-badge">{p.badge}</span>
                  <div className="project-links-group">
                    <a href="https://github.com/HaroonArif7" target="_blank" rel="noopener noreferrer" className="project-link-icon" title="View Repository">
                      <Github size={16} />
                    </a>
                  </div>
                </div>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.desc}</p>

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
