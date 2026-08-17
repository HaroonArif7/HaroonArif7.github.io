import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <a href="#home" className="logo">
          <div className="logo-icon">HA</div>
          <span>Haroon Arif</span>
        </a>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '500px' }}>
          Data Scientist | AI Engineer | Python Developer | AI Automation Specialist
        </p>

        <div className="footer-socials">
          <a href="https://github.com/HaroonArif7" target="_blank" rel="noopener" className="social-btn" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/haroon-arif-09832924a/" target="_blank" rel="noopener" className="social-btn" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="https://x.com/HafizHaroonArif" target="_blank" rel="noopener" className="social-btn" aria-label="Twitter">
            <Twitter size={18} />
          </a>
        </div>

        <p className="copyright">
          © 2026 Haroon Arif. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
