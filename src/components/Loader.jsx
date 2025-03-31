import React, { useEffect, useRef } from 'react';
import '../assets/styles/Loader.css';


const Loader = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    // Set your portfolio's color palette here
    const colors = [
      '#6c63ff', // Primary purple
      '#4d44db', // Darker purple
      '#a29bfe', // Lighter purple
      '#ffffff', // White
    ];

    // Programming keywords for particles
    const keywords = ['const', 'function()', 'return', 'import', 'export', 'class', 'async', 'await', '=>', '{}', '()', '[]', "O(n logn)"];

    // Create particles
    particles.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      text: keywords[Math.floor(Math.random() * keywords.length)],
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw center orb
      const gradient = ctx.createRadialGradient(
        width/2, height/2, 0, 
        width/2, height/2, Math.min(width, height)/3
      );
      gradient.addColorStop(0, 'rgba(108, 99, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(108, 99, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(width/2, height/2, Math.min(width, height)/3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Update and draw particles
      particles.current.forEach(particle => {
        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.angle += particle.rotationSpeed;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle
        ctx.font = `${particle.size}rem 'Courier New', monospace`;
        ctx.fillStyle = particle.color;
        ctx.fillText(particle.text, particle.x, particle.y);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div className="code-particle-loader">
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      <div className="loader-content">
        <div className="loader-text">
          <span className="loader-letter" style={{ '--delay': '0s' }}>L</span>
          <span className="loader-letter" style={{ '--delay': '0.1s' }}>O</span>
          <span className="loader-letter" style={{ '--delay': '0.2s' }}>A</span>
          <span className="loader-letter" style={{ '--delay': '0.3s' }}>D</span>
          <span className="loader-letter" style={{ '--delay': '0.4s' }}>I</span>
          <span className="loader-letter" style={{ '--delay': '0.5s' }}>N</span>
          <span className="loader-letter" style={{ '--delay': '0.6s' }}>G</span>
          <span className="loader-letter" style={{ '--delay': '0.7s' }}>.</span>
          <span className="loader-letter" style={{ '--delay': '0.75s' }}>.</span>
          <span className="loader-letter" style={{ '--delay': '0.8s' }}>.</span>
          <span className="loader-letter" style={{ '--delay': '0.85s' }}>.</span>
          <span className="loader-letter" style={{ '--delay': '0.9s' }}>.</span>
        </div>
        <div className="progress-track">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;