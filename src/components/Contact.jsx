import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Send, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const containerRef = useRef(null);

  useGSAP(() => {
    const items = containerRef.current?.children ? Array.from(containerRef.current.children) : [];
    if (!items.length) return;

    gsap.from(items, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showAlert('Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showAlert('Thank you! Your message has been sent successfully.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1200);
  };

  const showAlert = (msg, type) => {
    setAlert({ show: true, msg, type });
    setTimeout(() => setAlert({ show: false, msg: '', type: '' }), 5000);
  };

  return (
    <section className="section" id="contact" ref={containerRef}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-tag"><Mail size={16} /> Get In Touch</span>
            <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>
              Have a Problem <span>Worth Automating?</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Let's build something useful. Whether you need an AI agent, data analytics pipeline, custom Python software, or workflow automation, I am available for projects and consultations.
            </p>

            <div className="contact-info-list">
              <div className="contact-item">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-val">hafizharoonarif@gmail.com</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Linkedin size={20} /></div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-val">
                    <a href="https://www.linkedin.com/in/haroon-arif-09832924a/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-blue)' }}>
                      haroon-arif-09832924a
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Github size={20} /></div>
                <div>
                  <div className="contact-label">GitHub</div>
                  <div className="contact-val">
                    <a href="https://github.com/HaroonArif7" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-blue)' }}>
                      github.com/HaroonArif7
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card">
            <form className="contact-form" onSubmit={handleSubmit} action="https://formspree.io/f/xbjnqvgw" method="POST">
              <div className="form-group-row">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group-row">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="message"
                className="form-control"
                placeholder="Your Message / Project Details *"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              {alert.show && (
                <div className={`form-alert ${alert.type}`}>
                  {alert.msg}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? <Loader2 size={18} className="spin" /> : <Send size={18} />} Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
