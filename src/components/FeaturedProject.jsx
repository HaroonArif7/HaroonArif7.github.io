import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Github, MessageSquare, GitFork } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const items = containerRef.current?.children ? Array.from(containerRef.current.children) : [];
    if (!items.length) return;

    // Safety: Ensure elements are visible immediately in DOM
    gsap.set(items, { opacity: 1, clearProps: 'transform' });

    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section className="section" ref={containerRef}>
      <div className="container">
        <div className="featured-project-card">
          <div className="featured-project-content">
            <span className="featured-tag"><Star size={14} /> FLAGSHIP PROJECT</span>
            <h3 className="featured-title">Autonomous AI Multi-Agent Workflow Engine</h3>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              An enterprise agentic system built to automate multi-department business requests without manual intervention.
            </p>

            <div className="flow-step-box">
              <div className="flow-step">
                <span className="flow-label">Problem</span>
                <span className="flow-value">Support teams manually searched 4 separate platforms to aggregate customer data and route requests.</span>
              </div>
              <div className="flow-step">
                <span className="flow-label">Solution</span>
                <span className="flow-value">Architected an AI agent pipeline using Python, LangChain, and n8n to classify requests, query databases, and perform automated actions.</span>
              </div>
              <div className="flow-step">
                <span className="flow-label">Result</span>
                <span className="flow-value">Reduced request processing time by 85% with 99.2% schema execution accuracy.</span>
              </div>
            </div>

            <div className="project-tech-tags" style={{ marginBottom: '1.5rem' }}>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">LangChain</span>
              <span className="tech-tag">FastAPI</span>
              <span className="tech-tag">n8n</span>
              <span className="tech-tag">OpenAI API</span>
              <span className="tech-tag">PostgreSQL</span>
              <span className="tech-tag">Docker</span>
            </div>

            <div className="hero-cta-group">
              <a href="https://github.com/HaroonArif7" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                <Github size={16} /> View GitHub Repo
              </a>
              <a href="#contact" className="btn btn-secondary btn-sm">
                <MessageSquare size={16} /> Discuss Implementation
              </a>
            </div>
          </div>

          <div className="featured-project-diagram glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <div style={{ fontSize: '3.5rem', color: 'var(--primary-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <GitFork size={56} />
            </div>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Agentic Execution Flow</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Input Request ➔ Prompt Classification ➔ Dynamic Tool Selection ➔ API Execution ➔ Verified JSON Response
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
