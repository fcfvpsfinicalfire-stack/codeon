
import React, { useEffect, useRef } from 'react';

const MouseParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouse = { x: 0, y: 0 };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsla(${210 + Math.random() * 40}, 100%, 70%, 0.8)`;
        this.life = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.015;
        if (this.size > 0.1) this.size -= 0.05;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MouseParticles;
