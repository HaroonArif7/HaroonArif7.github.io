import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Code2, ScatterChart, Server, Database, Bot, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef(null);
  const gridRef = useRef(null);
useGSAP(() => {
  const items = gridRef.current?.children
    ? Array.from(gridRef.current.children)
    : [];

  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top 75%',
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
  });
}, {
  scope: containerRef,
  dependencies: [activeFilter],
});
  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'programming', label: 'Programming' },
    { id: 'datascience', label: 'Data Science & AI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'databases', label: 'Databases' },
    { id: 'automation', label: 'Automation & AI Agents' },
    { id: 'cloud', label: 'Cloud & DevOps' }
  ];

  const skillCards = [
    {
      category: 'programming',
      icon: <Code2 size={20} />,
      title: 'Programming',
      skills: ['Python (Advanced)', 'C', 'C++', 'JavaScript (ES6+)']
    },
    {
      category: 'datascience',
      icon: <ScatterChart size={20} />,
      title: 'Data Science & AI',
      skills: ['Machine Learning', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'PyTorch']
    },
    {
      category: 'backend',
      icon: <Server size={20} />,
      title: 'Backend & Web',
      skills: ['Django', 'Django REST Framework', 'Flask', 'FastAPI', 'Pydantic']
    },
    {
      category: 'databases',
      icon: <Database size={20} />,
      title: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Analytics']
    },
    {
      category: 'automation',
      icon: <Bot size={20} />,
      title: 'Automation & AI Agents',
      skills: ['n8n Workflows', 'AI Agents', 'LLM Workflows', 'Web Scraping', 'API Integration']
    },
    {
      category: 'cloud',
      icon: <Cloud size={20} />,
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'CI/CD & Git']
    }
  ];

  const filteredCards = activeFilter === 'all'
    ? skillCards
    : skillCards.filter(card => card.category === activeFilter);

  return (
    <section className="section" id="skills" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><Code size={16} /> Tech Stack</span>
          <h2 className="section-title">Technical Skills & <span>Core Competencies</span></h2>
          <p className="section-subtitle">An organized breakdown of technologies I use to build scalable systems.</p>
        </div>

        {/* Filter Buttons */}
        <div className="skills-filter">
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

        {/* Skills Grid */}
        <div className="skills-grid" ref={gridRef}>
          {filteredCards.map((card, idx) => (
            <div key={idx} className="skill-category-card" data-category={card.category}>
              <h3 className="skill-category-title">
                <div className="skill-category-icon">{card.icon}</div>
                {card.title}
              </h3>
              <div className="skill-items-list">
                {card.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
