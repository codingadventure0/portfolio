import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from '../components/ProjectCard';
import '../assets/styles/projects.css';
import MouseEffect from '../components/MouseEffect';

// Importing Imges
import pragyanImage from '/images/KnowYourPragyan.jpeg';
import marsImage from '/images/Mars.jpg';
import leave from '/images/leave.png';
import jarvis from '/images/jarvis.jpg';
import fuzzer from '/images/Fuzzer.webp';
import alumni from '/images/alumni.jpeg';
import AirbnbClone from '/images/AirbnbClone.webp';
import robotCar from '/images/robotCar.jpg';


const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const projects = [
    {
      id: 1,
      title: 'Pragyan Rover Model (Chandrayaan 3 Simulation)',
      description: 'Remote-controlled rover simulating ISRO’s Pragyan rover operations.',
      image: pragyanImage ,
      tags: ['Embedded Systems', 'IoT', 'Arduino'],
      category: 'Embedded Systems',
      link: '/projects/1',
      featured: true
    },
    {
      id: 2,
      title: 'Mars Rover Model',
      description: 'Joystick-controlled rover using dual ESP32 with live video feed and display support.',
      image: marsImage,
      tags: ['ESP32', 'IoT', 'Real-time'],
      category: 'Embedded Systems',
      link: '/projects/2'
    },
    {
      id: 3,
      title: 'GEMINI-AI Jarvis',
      description: 'AI-powered personal assistant with Google Gemini and OpenAI integration.',
      image: jarvis,
      tags: ['AI', 'NLP', 'Automation'],
      category: 'AI/ML',
      link: '/projects/3',
      featured: true
    },
    {
      id: 4,
      title: 'Web Application Fuzzer',
      description: 'Security tool to identify vulnerabilities in web applications.',
      image: fuzzer,
      tags: ['Cybersecurity', 'Python', 'Security'],
      category: 'Cybersecurity',
      link: '/projects/4'
    },
    {
      id: 5,
      title: 'Faculty Leave Management',
      description: 'Full-stack application with role-based authentication.',
      image: leave,
      tags: ['Node.Js', 'MongoDB', 'Full-stack'],
      category: 'Web Development',
      link: '/projects/6'
    },
    {
      id: 6,
      title: 'Wanderlust - Airbnb Clone',
      description: 'Online rental marketplace with secure booking and property listing features.',
      image: AirbnbClone,
      tags: ['Django', 'PostgreSQL', 'Full-stack'],
      category: 'Web Development',
      link: '/projects/6'
    },
    {
      id: 7,
      title: 'Multipurpose Robot Car',
      description: 'Robot car with voice/manual/obstacle/human-following modes and real-world applications.',
      image: robotCar,
      tags: ['Arduino', 'Sensors', 'Robotics'],
      category: 'Embedded Systems',
      link: '/projects/7'
    },
    {
      id: 8,
      title: 'Advanced Alumni Portal(ProtoType)',
      description: 'Interactive alumni directory with geolocation mapping and dynamic filters.',
      image: alumni,
      tags: ['React', 'Node.js', 'MongoDB'],
      category: 'Web Development',
      link: '/projects/9'
    }
  ];

  const filters = ['All', 'Web Development', 'AI/ML', 'Embedded Systems', 'Cybersecurity'];

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <div className="projects-page" ref={ref}>
      <MouseEffect />
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="projects-hero"
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            My <span>Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore my work and see how I solve problems with technology
          </motion.p>
        </div>
      </motion.section>

      <section className="projects-section">
        <div className="container">
          <motion.div 
            className="projects-filter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? 'active' : ''}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.span 
                    className="underline"
                    layoutId="filterUnderline"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;