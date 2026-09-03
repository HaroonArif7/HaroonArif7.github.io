import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitMerge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const containerRef = useRef(null);
  const itemsRef = useRef(null);

  useGSAP(() => {
    const items = itemsRef.current?.children ? Array.from(itemsRef.current.children) : [];
    if (!items.length) return;

    // Safety: Make sure DOM elements stay visible initially
    gsap.set(items, { opacity: 1, clearProps: 'transform' });

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  const timelinePhases = [
    {
      phase: 'Phase 1 — Foundations',
      title: 'Python & Data Analytics Specialist',
      desc: 'Mastered Python programming, SQL, and data analysis methodologies. Earned the Google Data Analytics Professional Certification, focusing on data cleaning, spreadsheet analytics, and data visualization.'
    },
    {
      phase: 'Phase 2 — Machine Learning',
      title: 'Predictive Modeling & Data Science',
      desc: 'Expanded into supervised and unsupervised Machine Learning. Completed the IBM Machine Learning with Python credential, implementing regression, classification, clustering models, and feature engineering.'
    },
    {
      phase: 'Phase 3 — Software Engineering',
      title: 'Backend Architecture & APIs',
      desc: 'Architected robust Python web backends and microservices using FastAPI, Django REST Framework, and PostgreSQL. Integrated containerization with Docker and implemented structured Pydantic data schemas.'
    },
    {
      phase: 'Phase 4 — AI & Automation',
      title: 'Autonomous AI Agents & Workflows',
      desc: 'Engineering multi-agent AI systems, LLM tool integrations, and complex business process automations via n8n, Python, and API ecosystems to eliminate manual business overhead.'
    }
  ];

  return (
    <section className="section" id="experience" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><GitMerge size={16} /> Growth Trajectory</span>
          <h2 className="section-title">Professional <span>Journey</span></h2>
          <p className="section-subtitle">How I evolved from foundational analytics to specialized AI & automation engineering.</p>
        </div>

        <div className="timeline-container" ref={itemsRef}>
          {timelinePhases.map((tp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-card">
                <span className="timeline-phase">{tp.phase}</span>
                <h3 className="timeline-title">{tp.title}</h3>
                <p className="timeline-desc">{tp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
