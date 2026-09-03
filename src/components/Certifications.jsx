import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Search, ExternalLink, X, ShieldCheck } from 'lucide-react';

import googleCertImg from '../assets/google-certified-full.png';
import ibmCertImg from '../assets/machine-with-python.png';
import pcapCertImg from '../assets/pcap.png';
import hpAiCertImg from '../assets/hp-ai-beginners.png';
import hpDataCertImg from '../assets/hp.png';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    const items = gridRef.current?.children
      ? Array.from(gridRef.current.children)
      : [];

    if (!items.length) return;

    // Safety First: Ensure cards are visible immediately in DOM
    gsap.set(items, {
      opacity: 1,
      clearProps: 'transform'
    });

    const animations = gsap.fromTo(
      items,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    ScrollTrigger.refresh();

    return () => {
      animations.kill();
    };
  }, { scope: containerRef });

  const certs = [
    {
      img: googleCertImg,
      issuer: 'Google (Coursera)',
      title: 'Google Certified Data Analyst',
      verifyUrl: 'https://coursera.org/verify/3YB9ZFQW89OQ',
      verifyId: '3YB9ZFQW89OQ',
      desc: 'Foundational data analytics concepts, SQL database querying, spreadsheet analysis, R programming, and data-driven decision making.'
    },
    {
      img: ibmCertImg,
      issuer: 'IBM',
      title: 'Machine Learning With Python',
      verifyUrl: null,
      desc: 'Supervised and unsupervised ML models, regression, classification, clustering algorithms, and practical model evaluation techniques.'
    },
    {
      img: pcapCertImg,
      issuer: 'KodeKloud',
      title: 'PCAP — Certified Associate in Python',
      verifyId: '21421a1c-bd70-40bf-879f-1596333e4c0e',
      verifyUrl: null,
      desc: 'Advanced Python programming, Object-Oriented Programming (OOP), modular coding, file handling, and preparations for PCAP certification.'
    },
    {
      img: hpAiCertImg,
      issuer: 'HP LIFE Foundation',
      title: 'AI for Beginners',
      verifyId: '796ff896-fffb-4c4f-8522-0260e15dcbe9',
      verifyUrl: null,
      desc: 'Foundational Artificial Intelligence principles, real-world business applications, data role in AI, and ethical implications.'
    },
    {
      img: hpDataCertImg,
      issuer: 'HP LIFE Foundation',
      title: 'Data Science & Analytics',
      verifyId: '2bbf96ed-0811-47db-927d-930328645632',
      verifyUrl: null,
      desc: 'Industry data science methodologies, analytical tools, and data-driven business problem-solving frameworks.'
    }
  ];

  return (
    <section
      className="section"
      id="certificates"
      ref={containerRef}
    >
      <div className="container">

        <div className="section-header">
          <span className="section-tag">
            <Award size={16} /> Credentials
          </span>

          <h2 className="section-title">
            Verified <span>Certifications</span>
          </h2>

          <p className="section-subtitle">
            Official industry credentials validating data science,
            machine learning, and software engineering expertise.
          </p>
        </div>

        <div
          className="certs-grid"
          ref={gridRef}
        >
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="glass-card cert-card"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="cert-img-wrapper">
                <img
                  src={cert.img}
                  alt={cert.title}
                  loading="eager"
                />

                <div className="cert-hover-overlay">
                  <Search size={22} />

                  <span
                    style={{
                      fontSize: '0.85rem',
                      marginLeft: '0.4rem',
                      fontWeight: '600'
                    }}
                  >
                    Preview Certificate
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span className="cert-issuer">
                  {cert.issuer}
                </span>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="cert-verify-link"
                    title="Verify Credential"
                  >
                    <ShieldCheck size={14} />
                    Verify
                  </a>
                )}
              </div>

              <h3 className="cert-title">
                {cert.title}
              </h3>

              <p className="cert-desc">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="modal-overlay active"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="modal-content-wrapper"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              aria-label="Close modal"
              onClick={() => setSelectedCert(null)}
            >
              <X size={20} />
            </button>

            <img
              className="modal-img-preview"
              src={selectedCert.img}
              alt={selectedCert.title}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}
            >
              <h3 style={{ fontSize: '1.4rem' }}>
                {selectedCert.title}
              </h3>

              {selectedCert.verifyUrl && (
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <ExternalLink size={14} />
                  Verify Official Certificate
                </a>
              )}
            </div>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                marginBottom: '0.75rem'
              }}
            >
              {selectedCert.desc}
            </p>

            {selectedCert.verifyId && (
              <span
                style={{
                  fontSize: '0.775rem',
                  color: 'var(--text-dim)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                Credential ID: {selectedCert.verifyId}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
