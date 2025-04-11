import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/global.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1 });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to scroll to a section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle About navigation from other pages
  const handleAboutClick = (e) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== '/') {
      navigate('/'); 
      setTimeout(() => scrollToSection('about'), 500); 
    } else {
      scrollToSection('about');
    }
  };

  const navLinks = [
    { path: '/portfolio', name: 'Home' },
    { path: '/projects', name: 'Projects' },
    { path: '/contact', name: 'Contact' },
    { name: 'About', id: 'about' },
  ];

  return (
    <motion.nav
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container">
        <Link to="/portfolio" className="logo">
          <span>MERN</span>Stack Innovator
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {link.path ? (
                <Link to={link.path} onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ) : (
                <a href={`#${link.id}`} onClick={handleAboutClick}>
                  {link.name}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;