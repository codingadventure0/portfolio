import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaRobot, FaShieldAlt, FaCalendarAlt, FaMapMarkerAlt, FaTools } from 'react-icons/fa';
import { SiArduino, SiPython, SiReact, SiNodedotjs } from 'react-icons/si';
// import '../assets/styles/projectsdetails.css';
import MouseEffect from '../components/MouseEffect';
// import ProjectGallery from '../components/ProjectGallery';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: 'Pragyan Rover Model',
      description: 'Chandrayaan 3 simulation with Arduino and ESP32 microcontrollers.',
      longDescription: 'Designed and developed a remotely controlled rover using Arduino, ESP32, and multiple microcontrollers, simulating Chandrayaan 3 operations. This project received recognition from ISRO scientists and was appreciated for its real-time control features.',
      image: '/images/pragyan.jpg',
      tags: ['Embedded Systems', 'IoT', 'Arduino'],
      githubLink: '#',
      liveLink: '#',
      features: [
        'Real-time remote control',
        'Multiple sensor integration',
        'ISRO recognized design',
        'Custom PCB implementation'
      ],
      technologies: ['Arduino', 'ESP32', 'C++', 'Bluetooth Module', 'WebCam'],
      images: [
        '/images/pragyan-1.jpg',
        '/images/pragyan-2.jpg',
        '/images/pragyan-3.jpg'
      ]
    },
    {
      id: 2,
      title: 'Mars Rover Model',
      description: 'Joystick-controlled Mars rover using dual ESP32 microcontrollers.',
      longDescription: 'Built a Mars rover model controlled via a joystick-based remote using two ESP32 microcontrollers. The rover captures and transmits real-time photos and videos to connected displays, allowing remote monitoring.',
      image: '/images/marsrover.jpg',
      tags: ['ESP32', 'Remote Control', 'IoT'],
      githubLink: 'https://github.com/codingadventure0/Rover-using-esp32.git',
      liveLink: '#',
      features: [
        'Dual ESP32 control system',
        'Joystick navigation',
        'Real-time video streaming',
        'Display compatibility with mobile and large screens'
      ],
      technologies: ['ESP32', 'Camera Module', 'LED Display', 'Wireless Transmission'],
      images: [
        '/images/marsrover-1.jpg',
        '/images/marsrover-2.jpg',
        '/images/marsrover-3.jpg'
      ]
    },
    {
        id: 3,
        title: 'GEMINI-AI Jarvis',
        description: 'AI-powered assistant integrated with Google Gemini and OpenAI.',
        longDescription: 'Created a smart assistant that uses voice commands to perform actions like web searches, system control, emotional responses, and automation tasks. Integrated with Gemini for intelligent fallback and advanced conversational capabilities.',
        image: '/images/jarvis.jpg',
        tags: ['AI Assistant', 'Python', 'Voice AI'],
        githubLink: 'https://github.com/codingadventure0/Gemini-AI-Jarvis-The-Future-of-Assistance.git',
        liveLink: '#',
        features: [
          'Continuous listening mode',
          'Email automation and weather updates',
          'Voice-controlled system commands',
          'Emotional and contextual responses'
        ],
        technologies: ['Python', 'Google Gemini API', 'OpenAI API', 'SpeechRecognition', 'pyttsx3'],
        images: [
          '/images/jarvis-1.jpg',
          '/images/jarvis-2.jpg',
          '/images/jarvis-3.jpg'
        ]
      },
      
    {
        id: 4,
        title: 'Web Application Fuzzer',
        description: 'Security scanner for web apps to detect common vulnerabilities.',
        longDescription: 'Developed a web application fuzzer that detects vulnerabilities such as SQL injection, XSS, and insecure file uploads. This tool automates testing of URLs, parameters, and form fields to ensure application integrity.',
        image: '/images/fuzzer.jpg',
        tags: ['Cybersecurity', 'Automation', 'Python'],
        githubLink: 'https://github.com/codingadventure0/Fuzzer.git',
        liveLink: '#',
        features: [
          'Automated security testing',
          'Detects multiple vulnerability types',
          'Reports in structured format',
          'Supports parameter fuzzing'
        ],
        technologies: ['Python', 'Node.js', 'Burp Suite'],
        images: [
          '/images/fuzzer-1.jpg',
          '/images/fuzzer-2.jpg'
        ]
      },
      
    {
        id: 5,
        title: 'Faculty Leave Management System',
        description: 'Role-based full-stack leave tracking system for institutions.',
        longDescription: 'Built a faculty leave management platform where faculty can apply for leaves and admins can manage approvals. Includes calendar integration, notifications, and analytics.',
        image: '/images/leave.jpg',
        tags: ['Full-stack', 'Node.js', 'MongoDB'],
        githubLink: '#',
        liveLink: '#',
        features: [
          'JWT-based authentication',
          'Admin and faculty roles',
          'Calendar sync and analytics',
          'Real-time status updates'
        ],
        technologies: ['Node.js', 'MongoDB', 'Express.js', 'Bootstrap'],
        images: [
          '/images/leave-1.jpg',
          '/images/leave-2.jpg'
        ]
      },
      
    {
        id: 6,
        title: 'Wanderlust - Airbnb Clone',
        description: 'Accommodation booking platform inspired by Airbnb.',
        longDescription: 'Developed a rental marketplace enabling users to register, list properties, book stays, and manage reservations. Implemented with full CRUD functionality and secure authentication.',
        image: '/images/wanderlust.jpg',
        tags: ['Node.Js', 'Rental System', 'Web App'],
        githubLink: 'https://github.com/codingadventure0/wanderlust-airbnb-clone.git',
        liveLink: '#',
        features: [
          'Listing and search functionality',
          'User login and booking management',
          'Interactive map integration',
          'Admin and guest dashboards'
        ],
        technologies: ['Python', 'Django', 'PostgreSQL'],
        images: [
          '/images/wanderlust-1.jpg',
          '/images/wanderlust-2.jpg'
        ]
      },
    {
      id: 7,
      title: 'Multipurpose Robot Car',
      description: 'Multi-mode robot car with voice, manual, obstacle, and human-following features.',
      longDescription: 'Developed a versatile robot car capable of operating in multiple modes including voice control, manual navigation, obstacle avoidance, and human following. This project is ideal for education, assistive technology, and automation demos.',
      image: '/images/robotcar.jpg',
      tags: ['Robotics', 'Automation', 'STEM'],
      githubLink: '#',
      liveLink: '#',
      features: [
        'Voice command operation',
        'Obstacle avoidance sensors',
        'Human-following algorithm',
        'Bluetooth-based control'
      ],
      technologies: ['Arduino', 'Sensors', 'Motors', 'Bluetooth Module'],
      images: [
        '/images/robotcar-1.jpg',
        '/images/robotcar-2.jpg',
        '/images/robotcar-3.jpg'
      ]
    },
    {
      id: 8,
      title: 'Advanced Alumni Portal',
      description: 'Interactive alumni network platform with location-based filtering.',
      longDescription: 'Built a responsive platform for alumni networking featuring interactive maps, filterable search, and secure profile management. Users can locate peers, share experiences, and stay connected.',
      image: '/images/alumni.jpg',
      tags: ['React', 'MongoDB', 'Node.js'],
      githubLink: 'https://github.com/codingadventure0/Alumni-Association.git',
      liveLink: '#',
      features: [
        'Interactive alumni map',
        'Profile updates and directory',
        'Search and filter options',
        'Fully responsive UI'
      ],
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      images: [
        '/images/alumni-1.jpg',
        '/images/alumni-2.jpg'
      ]
    }
  ];

  const project = projects.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  if (!project) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="project-not-found"
      >
        <h2>Project not found</h2>
        <button onClick={() => navigate('/projects')}>Back to Projects</button>
      </motion.div>
    );
  }

  // Get appropriate icon based on project category
  const getCategoryIcon = (tags) => {
    if (tags.some(tag => tag.includes('AI') || tag.includes('Assistant'))) {
      return <FaRobot className="category-icon" />;
    } else if (tags.some(tag => tag.includes('Embedded') || tag.includes('IoT'))) {
      return <SiArduino className="category-icon" />;
    } else if (tags.some(tag => tag.includes('Cybersecurity'))) {
      return <FaShieldAlt className="category-icon" />;
    } else if (tags.some(tag => tag.includes('Full-stack'))) {
      return <FaCode className="category-icon" />;
    } else if (tags.some(tag => tag.includes('Web'))) {
      return <SiReact className="category-icon" />;
    } else if (tags.some(tag => tag.includes('Node'))) {
      return <SiNodedotjs className="category-icon" />;
    } else if (tags.some(tag => tag.includes('Python'))) {
      return <SiPython className="category-icon" />;
    }
    return <FaTools className="category-icon" />;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="project-details-page"
      >
        <MouseEffect />
        
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="project-hero"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), url(${project.image})`,
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="hero-overlay"></div>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="back-button"
            >
              <button onClick={() => navigate('/projects')}>
                <FaArrowLeft /> Back to Projects
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero-content"
            >
              <div className="project-category">
                {getCategoryIcon(project.tags)}
                <span>{project.tags[0]}</span>
              </div>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <div className="project-links">
                {project.githubLink && (
                  <motion.a
                    whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(108, 99, 255, 0.4)' }}
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> View Code
                  </motion.a>
                )}
                {project.liveLink && (
                  <motion.a
                    whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(255, 255, 255, 0.2)' }}
                    className="live-demo"
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="scroll-indicator"
          >
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <span>Scroll Down</span>
          </motion.div>
        </motion.section>

        {/* Main Content */}
        <section className="project-content">
          <div className="container">
            {/* Overview Section */}
            <div className="project-overview">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="project-description"
              >
                <h2>Project <span>Overview</span></h2>
                <p>{project.longDescription}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="project-details"
              >
                <div className="details-card">
                  <h3>Project <span>Details</span></h3>
                  <div className="detail-item">
                    <span>Category:</span>
                    <div className="tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="detail-item">
                    <span>Technologies:</span>
                    <div className="tech-stack">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="detail-item">
                    <span>Date:</span>
                    <p><FaCalendarAlt /> 2023</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features Section */}
            <div className="project-features">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Key <span>Features</span>
              </motion.h2>
              
              <div className="features-grid">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="feature-card"
                    whileHover={{ y: -10 }}
                  >
                    <div className="feature-number">{index + 1}</div>
                    <h3>{feature}</h3>
                    <div className="feature-highlight"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            {/* <ProjectGallery images={project.images} title={project.title} /> */}
          </div>
        </section>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;