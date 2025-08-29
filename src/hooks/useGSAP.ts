import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Simple floating animations for decorative elements
    gsap.to('.floating-sparkle', {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.8
    });

    gsap.to('.floating-star', {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: 'none'
    });

    gsap.to('.floating-zap', {
      x: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Gentle pulse for background elements
    gsap.to('.bg-pulse', {
      scale: 1.05,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Subtle hover animations for buttons
    const buttons = document.querySelectorAll('.gsap-button');
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.02,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    });

    // Gentle icon animations on feature cards
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Cleanup function
    return () => {
      // Kill all GSAP animations
      gsap.killTweensOf('.floating-sparkle');
      gsap.killTweensOf('.floating-star');
      gsap.killTweensOf('.floating-zap');
      gsap.killTweensOf('.bg-pulse');
    };
  }, []);

  return { containerRef };
}; 