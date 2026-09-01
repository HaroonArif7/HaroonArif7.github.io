import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, CheckCircle2, MapPin, Award, Terminal, Cpu } from 'lucide-react';
import profilePic from '../assets/haroon-profile.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const imageCardRef = useRef(null);
  const textCardRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(() => {
    gsap.from([imageCardRef.current, textCardRef.current], {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    gsap.from(statsRef.current.children, {
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section className="section" id="about" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><User size={16} /> Professional Identity</span>
          <h2 className="section-title">Solving Complex Problems Through <span>Data & Automation</span></h2>
          <p className="section-subtitle">Bridging the gap between technical complexity and real-world business results.</p>
        </div>

        <div className="about-grid">
          {/* Prominent Profile Card */}
          <div ref={imageCardRef} className="glass-card about-profile-card">
            <div className="about-img-container">
              <img
                src={profilePic}
                alt="Haroon Arif — Professional Data Scientist & AI Engineer"
                className="about-portrait-img"
                loading="lazy"
              />
              <div className="about-img-badge">
                <CheckCircle2 size={15} color="#38bdf8" /> Google & IBM Certified
              </div>
            </div>

            <div className="about-profile-details">
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.2rem' }}>Haroon Arif</h3>
              <p style={{ color: 'var(--primary-blue)', fontWeight: '600', fontSize: '0.925rem', marginBottom: '1.2rem' }}>
                Data Scientist & AI Engineer
              </p>

              <div className="profile-meta-list">
                <div className="meta-item">
                  <Award size={16} color="var(--primary-blue)" />
                  <span>Google Certified Data Analyst</span>
                </div>
                <div className="meta-item">
                  <Award size={16} color="var(--primary-blue)" />
                  <span>IBM Machine Learning Certified</span>
                </div>
                <div className="meta-item">
                  <Terminal size={16} color="var(--primary-blue)" />
                  <span>Python & AI Agent Architecture</span>
                </div>
                <div className="meta-item">
                  <MapPin size={16} color="var(--primary-blue)" />
                  <span>Open for Global Consulting & Remote Roles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Text & Visual Stat Cards */}
          <div className="about-content-wrapper">
            <div ref={textCardRef} className="about-text glass-card" style={{ marginBottom: '1.75rem' }}>
              <p>
                I am a <span className="highlight">Google-Certified Data Analyst</span> and <span className="highlight">AI Engineer</span> with strong experience in Python, Data Science, and Machine Learning, backed by an IBM Certification in Machine Learning.
              </p>
              <p>
                I help businesses and technical teams transform raw, unstructured data into actionable insights, predictive models, and autonomous AI systems. I do not just write code — I build resilient, production-ready software solutions that solve genuine operational bottlenecks.
              </p>
              <p>
                Whether you need to automate multi-step business workflows, build intelligent AI agents, extract market data via scalable web scraping, or engineer predictive models, I deliver solutions focused on accuracy, speed, and business ROI.
              </p>
            </div>

            <div ref={statsRef} className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-number">3+</div>
                <div className="stat-card-label">Years Experience</div>
                <div className="stat-card-sub">Data & Python Development</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-number">100%</div>
                <div className="stat-card-label">Python Centric</div>
                <div className="stat-card-sub">Core Software Engine</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-number">AI + Data</div>
                <div className="stat-card-label">Specialization</div>
                <div className="stat-card-sub">Agents & ML Models</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-number">Automation</div>
                <div className="stat-card-label">Business Focus</div>
                <div className="stat-card-sub">n8n & LLM Workflows</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
