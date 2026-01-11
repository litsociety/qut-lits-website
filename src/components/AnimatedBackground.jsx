import React, { useEffect, useState, memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = memo(function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Generate particles once on mount (memoized to prevent recreation)
  const particles = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1.5,
      duration: Math.random() * 15 + 12,
      delay: Math.random() * 3,
    })), []
  );

  useEffect(() => {
    let rafId = null;
    let lastX = 50;
    let lastY = 50;
    let throttleTimeout = null;

    const handleMouseMove = (e) => {
      if (throttleTimeout) return;
      
      throttleTimeout = setTimeout(() => {
        rafId = requestAnimationFrame(() => {
          const newX = (e.clientX / window.innerWidth) * 100;
          const newY = (e.clientY / window.innerHeight) * 100;
          
          // Only update if change is significant (reduces updates)
          if (Math.abs(newX - lastX) > 2 || Math.abs(newY - lastY) > 2) {
            setMousePosition({ x: newX, y: newY });
            lastX = newX;
            lastY = newY;
          }
          
          rafId = null;
        });
        throttleTimeout = null;
      }, 50); // Throttle to 20fps max for mouse tracking
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  return (
    <>
      {/* Main Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-dark-blue via-dark-purple to-dark-blue -z-10" />
      
      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Primary animated orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: ['-25%', '25%', '-25%'],
            y: ['-25%', '25%', '-25%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: '20%',
            top: '20%',
          }}
        />
        
        <motion.div
          className="absolute w-96 h-96 bg-purple/10 rounded-full blur-3xl"
          animate={{
            x: ['25%', '-25%', '25%'],
            y: ['25%', '-25%', '25%'],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            right: '20%',
            bottom: '20%',
          }}
        />

        <motion.div
          className="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['20%', '-20%', '20%'],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        />

        {/* Mouse-following gradient orb */}
        <motion.div
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
          animate={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
          }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeOut",
          }}
          style={{
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/10"
            initial={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(particle.id) * 50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 194, 203, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 194, 203, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial Gradient Overlay for Depth */}
      <div className="fixed inset-0 -z-10 bg-gradient-radial from-transparent via-transparent to-dark-blue/50"       />
    </>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;

