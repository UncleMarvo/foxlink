"use client"

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
}

export function ParticleBackground({ 
  particleCount = 20, 
  colors = ['#fc5403', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'] 
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'bg-particle absolute rounded-full opacity-20 pointer-events-none';
      
      // Random size between 2px and 8px
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(particle);
    }

    // Animate particles
    const particles = container.querySelectorAll('.bg-particle');
    
    gsap.to(particles, {
      y: -100,
      x: 'random(-50, 50)',
      duration: 'random(15, 25)',
      repeat: -1,
      ease: 'none',
      stagger: {
        amount: 10,
        from: 'random'
      }
    });

    // Cleanup
    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, [particleCount, colors]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
} 