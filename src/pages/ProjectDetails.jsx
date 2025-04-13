import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaRobot, FaShieldAlt, FaCalendarAlt, FaTools } from 'react-icons/fa';
import { SiArduino, SiPython, SiReact, SiNodedotjs } from 'react-icons/si';
import '../assets/styles/projectsdetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

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
        '/images/pragyan-project.jpg',
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
        '/images/Mars.jpg',
        '/images/Mars-rover.jpg',
        '/images/rover-remote.jpg',
        '/images/mars-group.jpg',
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

  useEffect(() => {
    const handleScroll = () => {
      setIsBackToTopVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project not found</h2>
        <button onClick={() => navigate('/projects')}>Back to Projects</button>
      </div>
    );
  }

  const getCategoryIcon = (tags) => {
    if (tags.some(tag => tag.includes('AI') || tag.includes('Assistant'))) {
      return <FaRobot className="project-category-icon" />;
    } else if (tags.some(tag => tag.includes('Embedded') || tag.includes('IoT'))) {
      return <SiArduino className="project-category-icon" />;
    } else if (tags.some(tag => tag.includes('Cybersecurity'))) {
      return <FaShieldAlt className="project-category-icon" />;
    } else if (tags.some(tag => tag.includes('Full-stack'))) {
      return <FaCode className="project-category-icon" />;
    } else if (tags.some(tag => tag.includes('Web'))) {
      return <SiReact className="project-category-icon" />;
    } else if (tags.some(tag => tag.includes('Node'))) {
      return <SiNodedotjs className="project-category-icon" />;
    } else if (tags.some(tag => tag.includes('Python'))) {
      return <SiPython className="project-category-icon" />;
    }
    return <FaTools className="project-category-icon" />;
  };

  return (
    <div className="project-details-container">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="project-details-hero"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), url(${project.image})` }}
      >
        <div className="project-details-hero-content">
          <motion.button
            onClick={() => navigate('/projects')}
            className="project-details-back-button"
            whileHover={{ x: -5 }}
          >
            <FaArrowLeft /> Back to Projects
          </motion.button>

          <div className="project-details-header">
            <div className="project-details-category">
              {getCategoryIcon(project.tags)}
              <span>{project.tags[0]}</span>
            </div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <div className="project-details-links">
              {project.githubLink && (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                >
                  <FaGithub /> View Code
                </motion.a>
              )}
              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-details-live-link"
                  whileHover={{ y: -3 }}
                >
                  <FaExternalLinkAlt /> Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="project-details-content">
        <div className="project-details-overview">
          <div className="project-details-description">
            <h2>Project Overview</h2>
            <p>{project.longDescription}</p>
          </div>

          <div className="project-details-meta">
            <div className="project-details-card">
              <h3>Project Details</h3>
              <div className="project-details-item">
                <span>Category:</span>
                <div className="project-details-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-details-item">
                <span>Technologies:</span>
                <div className="project-details-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-details-item">
                <span>Date:</span>
                <p><FaCalendarAlt /> 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="project-details-features">
          <h2>Key Features</h2>
          <div className="project-features-grid">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-feature-card"
              >
                <div className="project-feature-number">{index + 1}</div>
                <h3>{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="project-details-gallery">
          <h2>Project Gallery</h2>
          <div className="project-gallery-grid">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-gallery-item"
                whileHover={{ scale: 1.02 }}
              >
                <img src={image} alt={`${project.title} screenshot ${index + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <motion.button
        className={`project-details-back-to-top ${isBackToTopVisible ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ↑
      </motion.button>
    </div>
  );
};

export default ProjectDetails;