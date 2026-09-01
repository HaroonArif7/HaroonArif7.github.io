import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Zap, Brain, Wrench, Database, TrendingUp, RefreshCw, Globe, FileSearch, ArrowRightLeft, DollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AutomationShowcase() {
  const containerRef = useRef(null);
  const diagramRef = useRef(null);

  useGSAP(() => {
    const items = diagramRef.current?.children ? Array.from(diagramRef.current.children) : [];
    if (!items.length) return;

    gsap.from(items, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    });
  }, { scope: containerRef });

  const workflowSteps = [
    { icon: <Zap size={22} />, title: '1. Trigger', sub: 'Webhook / CRM / Event' },
    { icon: <Brain size={22} />, title: '2. AI Agent', sub: 'LLM Routing & Logic' },
    { icon: <Wrench size={22} />, title: '3. Tools', sub: 'Scraping / APIs / Python' },
    { icon: <Database size={22} />, title: '4. Data Processing', sub: 'Validation & ETL' },
    { icon: <TrendingUp size={22} />, title: '5. Business Result', sub: 'Automated Action' }
  ];

  const features = [
    { icon: <RefreshCw size={18} />, title: 'Business Process Automation', desc: 'Eliminate repetitive manual data entry by connecting CRMs, databases, and communication tools.' },
    { icon: <Bot size={18} />, title: 'Custom LLM & AI Agents', desc: 'Deploy AI agents equipped with custom toolsets to resolve complex multi-step inquiries.' },
    { icon: <Globe size={18} />, title: 'Enterprise Web Scraping', desc: 'Extract and structure raw web data automatically with robust anti-bot handling and proxy management.' },
    { icon: <FileSearch size={18} />, title: 'Automated Reporting', desc: 'Aggregate analytics data into real-time executive summaries and automated Slack/Email alerts.' },
    { icon: <ArrowRightLeft size={18} />, title: 'API & Webhook Bridges', desc: 'Connect disparate legacy systems with clean Python FastAPI microservices and n8n webhooks.' },
    { icon: <DollarSign size={18} />, title: 'Cost & Time Reduction', desc: 'Drastically cut operational latency while reducing manual error rates to zero.' }
  ];

  return (
    <section className="section" id="automation" ref={containerRef}>
      <div className="container">
        <div className="automation-showcase-box">
          <div className="automation-header">
            <span className="section-tag"><Bot size={16} /> Dedicated AI Showcase</span>
            <h2 className="section-title">Autonomous AI & <span>Workflow Automation</span></h2>
            <p className="section-subtitle">Building intelligent systems that connect apps, execute multi-agent decisions, and automate routine business tasks.</p>
          </div>

          {/* Visual Workflow Diagram */}
          <div className="workflow-diagram" ref={diagramRef}>
            {workflowSteps.map((ws, idx) => (
              <React.Fragment key={idx}>
                <div className="workflow-node">
                  <div className="node-icon">{ws.icon}</div>
                  <div className="node-title">{ws.title}</div>
                  <div className="node-sub">{ws.sub}</div>
                </div>
                {idx < workflowSteps.length - 1 && <div className="workflow-connector"></div>}
              </React.Fragment>
            ))}
          </div>

          {/* Features Grid */}
          <div className="automation-features-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="auto-feature">
                <h4>{feat.icon} {feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
