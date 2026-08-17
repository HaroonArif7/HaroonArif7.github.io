import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Search, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
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
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const certs = [
    {
      img: 'google certified.png',
      issuer: 'Google',
      title: 'Google Certified Data Analyst',
      desc: 'Foundational data analytics concepts, SQL database querying, spreadsheet analysis, and data-driven decision making.'
    },
    {
      img: 'machine wwith python.png',
      issuer: 'IBM',
      title: 'Machine Learning With Python',
      desc: 'Supervised and unsupervised ML models, regression, classification, clustering algorithms, and practical model evaluation.'
    },
    {
      img: 'pcap.png',
      issuer: 'KodeKloud',
      title: 'PCAP — Certified Associate in Python',
      desc: 'Advanced Python programming, Object-Oriented Programming (OOP), modular coding, file handling, and algorithms.'
    },
    {
      img: 'AI cer.png',
      issuer: 'HP LIFE',
      title: 'AI for Beginners',
      desc: 'Foundational Artificial Intelligence principles, real-world business applications, data role in AI, and ethical implications.'
    },
    {
      img: 'hp.png',
      issuer: 'HP LIFE',
      title: 'Data Science & Analytics',
      desc: 'Industry data science methodologies, analytical tools, and business problem-solving frameworks.'
    }
  ];

  return (
    <section className="section" id="certificates" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag"><Award size={16} /> Credentials</span>
          <h2 className="section-title">Verified <span>Certifications</span></h2>
          <p className="section-subtitle">Official industry certifications validating data science, machine learning, and programming expertise.</p>
        </div>

        <div className="certs-grid" ref={gridRef}>
          {certs.map((cert, idx) => (
            <div key={idx} className="glass-card cert-card" onClick={() => setSelectedCert(cert)}>
              <div className="cert-img-wrapper">
                <img src={cert.img} alt={cert.title} />
                <div className="cert-hover-overlay"><Search size={24} /></div>
              </div>
              <span className="cert-issuer">{cert.issuer}</span>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-desc">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div className="modal-overlay active" onClick={() => setSelectedCert(null)}>
          <div className="modal-content-wrapper" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" aria-label="Close modal" onClick={() => setSelectedCert(null)}>
              <X size={20} />
            </button>
            <img className="modal-img-preview" src={selectedCert.img} alt={selectedCert.title} />
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.35rem' }}>{selectedCert.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{selectedCert.desc}</p>
          </div>
        </div>
      )}
    </section>
  );
}
