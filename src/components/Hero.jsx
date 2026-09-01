import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Folder,
  Send,
  FileText,
  Download,
  Brain,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas.jsx';
import profilePic from '../assets/haroon-profile.jpg';

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const badgeRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    const elements = [
      badgeRef.current,
      titleRef.current,
      descRef.current,
      cardRef.current
    ].filter(Boolean);

    // Keep Hero content visible even if GSAP has any issue.
    gsap.set(elements, {
      opacity: 1,
      clearProps: 'transform'
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });

    tl.from(badgeRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6
    })
      .from(
        titleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8
        },
        '-=0.3'
      )
      .from(
        descRef.current,
        {
          y: 25,
          opacity: 0,
          duration: 0.8
        },
        '-=0.5'
      )
      .from(
        cardRef.current,
        {
          y: 20,
          scale: 0.97,
          opacity: 0,
          duration: 0.8
        },
        '-=0.4'
      );
  }, { scope: containerRef });

  return (
    <section
      className="hero-section"
      id="home"
      ref={containerRef}
    >
      {/* 3D React Three Fiber Node Canvas */}
      <Hero3DCanvas />

      <div className="container">
        <div className="hero-grid">

          {/* Text Content */}
          <div className="hero-content">

            <div ref={badgeRef} className="hero-badge">
              <span className="badge-dot"></span>
              Available for AI, Data & Automation Projects
            </div>

            <h1 ref={titleRef} className="hero-title">
              I Build Intelligent Systems That{' '}
              <span className="gradient-text">
                Turn Data Into Business Value.
              </span>
            </h1>

            <p ref={descRef} className="hero-description">
              Google-Certified Data Analyst and AI Engineer with deep expertise
              in Python, Machine Learning, AI Agents, n8n Automation Workflows,
              and Data Analytics. Building practical solutions that automate
              processes and solve real technical challenges.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">

              <a
                href="#projects"
                className="btn btn-primary"
              >
                <Folder size={18} />
                View My Work
              </a>

              <a
                href="#contact"
                className="btn btn-secondary"
              >
                <Send size={18} />
                Let's Work Together
              </a>

              <a
                href="/Haroon-Arif-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <FileText size={16} />
                View CV
              </a>

              <a
                href="/Haroon-Arif-CV.pdf"
                download="Haroon-Arif-CV.pdf"
                className="btn btn-outline btn-sm"
              >
                <Download size={16} />
                Download CV
              </a>

            </div>
          </div>

          {/* Profile & Visual Showcase Card */}
          <div className="hero-visual-wrapper">

            <div
              className="hero-card-stack"
              ref={cardRef}
            >

              <div className="hero-profile-card">

                <div className="profile-header">

                  <div className="profile-avatar-wrapper">
                    <img
                      src={profilePic}
                      alt="Haroon Arif — AI Engineer & Data Scientist"
                      className="profile-avatar"
                      loading="eager"
                    />

                    <span
                      className="online-indicator"
                      title="Available for projects"
                    ></span>
                  </div>

                  <div className="profile-info">
                    <h3>Haroon Arif</h3>

                    <p className="profile-role">
                      Data Scientist & AI Engineer
                    </p>

                    <span className="profile-badge">
                      <CheckCircle2
                        size={13}
                        color="#38bdf8"
                      />
                      Google & IBM Certified
                    </span>
                  </div>

                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.9rem',
                    lineHeight: '1.5'
                  }}
                >
                  Engineering multi-agent AI systems, predictive ML pipelines,
                  and automated business workflows designed for growth.
                </p>

                <div className="tech-ticker">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Machine Learning</span>
                  <span className="tech-tag">AI Agents</span>
                  <span className="tech-tag">n8n</span>
                  <span className="tech-tag">FastAPI</span>
                  <span className="tech-tag">Data Analytics</span>
                </div>

              </div>

              {/* Floating Stat Badges */}

              <div className="floating-stat-badge badge-top-right">
                <div className="stat-icon">
                  <Brain size={20} />
                </div>

                <div className="stat-text">
                  <div className="num">3+ Years</div>
                  <div className="label">AI & Data Exp.</div>
                </div>
              </div>

              <div className="floating-stat-badge badge-bottom-left">
                <div className="stat-icon">
                  <ShieldCheck size={20} />
                </div>

                <div className="stat-text">
                  <div className="num">Google & IBM</div>
                  <div className="label">Certified Expert</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
