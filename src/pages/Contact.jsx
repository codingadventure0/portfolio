import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from 'emailjs-com';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../assets/styles/contact.css';
// import MouseEffect from '../components/MouseEffect'

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_0hs5seq', // 'YOUR_SERVICE_ID'
      'template_v71jj9k',//'YOUR_TEMPLATE_ID',
      formRef.current,
      'vLn1N-WoYSWK8QZBS',//'YOUR_USER_ID'
    )
    .then((result) => {
      console.log(result.text);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, (error) => {
      console.log(error.text);
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    });
  };

  const contactItems = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      content: "Hajipur, India",
      onClick: () => window.open("https://www.google.com/maps/place/Hajipur,+Bihar", "_blank")
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "abhishek23iot17.gecv@gmail.com",
      onClick: () => window.open("mailto:abhishek23iot17.gecv@gmail.com", "_blank")
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      content: "+91 9523945646",
      onClick: () => window.open("tel:+919523945646", "_blank")
    }
  ];

  // const socialLinks = [
  //   {
  //     icon: <FaLinkedin />,
  //     url: "https://www.linkedin.com/in/abhishek-kumar977/",
  //     name: "LinkedIn"
  //   },
  //   {
  //     icon: <FaGithub />,
  //     url: "https://github.com/codingadventure0",
  //     name: "GitHub"
  //   }
  // ];

  return (
    <div className="contact-page" ref={ref}>
{/*       <MouseEffect/> */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="contact-hero"
      >
        <div className="container">
          <h1>Get In <span>Touch</span></h1>
          <p>Looking to hire a skilled developer, build your website, or start a new project? I’m available for freelance work and ready to help bring your ideas to life. Let’s collaborate and create something amazing together! Reach out to discuss your project.</p>
        </div>
      </motion.section>

      <section className="contact-section">
        <div className="container">
          <motion.div 
            className="contact-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-info"
            >
              <motion.h2 
                whileInView={{ x: 0 }}
                initial={{ x: -20 }}
                transition={{ duration: 0.4 }}
              >
                Contact Information
              </motion.h2>
              <motion.p
                whileInView={{ x: 0 }}
                initial={{ x: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Feel free to reach out to me for any questions or opportunities.
              </motion.p>

              <div className="info-items">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="info-item"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="info-icon">
                      {item.icon}
                    </div>
                    <div className="info-content">
                      <h3>{item.title}</h3>
                      <p>{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="social-links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {/* <h3>Follow Me</h3>
                <div className="social-icons">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </motion.a>
                  ))}
                </div> */}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="contact-form-container"
            >
              <motion.h2
                whileInView={{ x: 0 }}
                initial={{ x: 20 }}
                transition={{ duration: 0.4 }}
              >
                Send Me a Message
              </motion.h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </motion.div>
                
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </motion.div>
                
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                  />
                </motion.div>
                
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="5"
                    required
                  ></textarea>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <motion.button
                    type="submit"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(108, 99, 255, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    {isSubmitting ? (
                      <span className="spinner"></span>
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
                
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      className={`form-message ${submitStatus}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {submitStatus === 'success' 
                        ? 'Message sent successfully!' 
                        : 'Failed to send message. Please try again.'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
