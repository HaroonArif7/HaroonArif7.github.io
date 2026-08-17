import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
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

  const posts = [
    {
      tag: 'AI & AUTOMATION',
      title: 'Building Multi-Agent AI Workflows with Python & n8n',
      excerpt: 'A detailed guide on architecting self-healing LLM workflows with tool-calling capabilities and structured Pydantic outputs.'
    },
    {
      tag: 'DATA SCIENCE',
      title: 'Practical Data Analytics: Moving From Spreadsheets to ML',
      excerpt: 'How businesses can leverage Python, SQL, and Pandas to automate exploratory data analysis and build predictive models.'
    },
    {
      tag: 'WEB SCRAPING',
      title: 'Optimizing Web Scraping Pipelines for Anti-Bot Resilience',
      excerpt: 'Strategies for maintaining 99.9% uptime when extracting high-volume web listings using Playwright and proxy rotation.'
    }
  ];

  return (
    <section className="section" id="blog" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><BookOpen size={16} /> Technical Articles</span>
          <h2 className="section-title">Engineering <span>Insights</span></h2>
          <p className="section-subtitle">Articles on AI engineering, Python optimization, and automation workflows.</p>
        </div>

        <div className="blog-grid" ref={gridRef}>
          {posts.map((post, idx) => (
            <div key={idx} className="glass-card blog-card">
              <span className="blog-tag">{post.tag}</span>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: '600' }}>Coming Soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
