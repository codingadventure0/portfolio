import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Add this import

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation with scroll to top
  const handleNavigate = (to) => {
    navigate(to); // Navigate to the route
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="footer"
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>MERN Stack Innovator</h3>
            <p>
              A passionate developer creating innovative solutions with cutting-edge technologies.
            </p>
            <div className="social-links">
              <a href="https://github.com/codingadventure0" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/abhishek-kumar977/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/root_access_abhi/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/portfolio" onClick={() => handleNavigate()}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="#about" onClick={() => handleNavigate()}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" onClick={() => handleNavigate()}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Info</h3>
            <ul>
              <li>abhishek23iot17.gecv@gmail.com</li>
              <li>+91 9523945646</li>
              <li>Hajipur, India</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Abhishek Kumar. All rights reserved.</p>
          <p>Designed & Developed with ❤️ by Abhishek Kumar</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;