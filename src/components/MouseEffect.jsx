import React, { useEffect, useRef } from "react";
import "../assets/styles/mouse.css"; // Import the CSS file

const MouseEffect = () => {
  const canvasRef = useRef(null);
  const particles = [];
  const lastClickTime = useRef([]);
  const clickCoolDown = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function getRandomColor() {
      return `rgba(${108 + Math.random() * 10}, ${99 + Math.random() * 10}, ${255}, 0.8)`;
    }

    class Particle {
      constructor(x, y, speedMultiplier = 1, isClickEffect = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.opacity = 0.8;
        this.color = getRandomColor(isClickEffect ? 0.9 : 0.8);
        this.speedX = (Math.random() * 3 - 1.5) * speedMultiplier;
        this.speedY = (Math.random() * 3 - 1.5) * speedMultiplier;
        this.isClickEffect = isClickEffect;
        this.life = isClickEffect ? 50 : 30;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015;
        this.life--;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleMouseMove = (event) => {
      for (let i = 0; i < 6; i++) {
        particles.push(new Particle(event.clientX, event.clientY));
      }
    };

    const handleClick = (event) => {
      const now = Date.now();
      if(now - lastClickTime.current < clickCoolDown){
        return; // Skip if clicks are too rapid
      }
      lastClickTime.current = now;
      for (let i = 0; i < 40; i++) {
        const size = Math.random() * 12 + 8;
        particles.push(new Particle(event.clientX, event.clientY, size, 3, true));
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0 || particles.life <= 0) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.addEventListener("click", handleClick);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animate);
    };
  }, []);

  return <canvas ref={canvasRef} className="glow-canvas"></canvas>;
};

export default MouseEffect;
