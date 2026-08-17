import React from 'react';
import LenisScroll from './components/LenisScroll.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Journey from './components/Journey.jsx';
import AutomationShowcase from './components/AutomationShowcase.jsx';
import FeaturedProject from './components/FeaturedProject.jsx';
import Projects from './components/Projects.jsx';
import Certifications from './components/Certifications.jsx';
import Blog from './components/Blog.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <LenisScroll>
      <div className="portfolio-app">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Journey />
          <AutomationShowcase />
          <FeaturedProject />
          <Projects />
          <Certifications />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </LenisScroll>
  );
}
