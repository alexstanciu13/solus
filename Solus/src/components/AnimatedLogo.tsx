import { useState, useEffect } from 'react';

interface AnimatedLogoProps {
  onNavigate: (page: string) => void;
  isHomePage: boolean;
  isModalOpen?: boolean;
  mobileMenuOpen?: boolean;
}

export function AnimatedLogo({ onNavigate, isHomePage, isModalOpen, mobileMenuOpen }: AnimatedLogoProps) {
  const [scrollY, setScrollY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 768);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Only render on home page
  if (!isHomePage) {
    return null;
  }

  // Hide when modal is open
  if (isModalOpen) {
    return null;
  }

  // Hide when mobile menu is open
  if (mobileMenuOpen) {
    return null;
  }

  // Animation trigger points
  const scrollTriggerStart = 50; // Start animating at 50px scroll
  const scrollTriggerEnd = 350; // Finish animating at 350px scroll
  
  // Calculate progress (0 to 1)
  const progress = Math.min(Math.max((scrollY - scrollTriggerStart) / (scrollTriggerEnd - scrollTriggerStart), 0), 1);

  // Easing function for smoother animation
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  const easedProgress = easeInOutCubic(progress);

  // Color transition from white to black (white when progress=0, black when progress=1)
  const textColor = `rgb(${Math.round(255 * (1 - easedProgress))}, ${Math.round(255 * (1 - easedProgress))}, ${Math.round(255 * (1 - easedProgress))})`;

  // Position calculation
  // Start: upper portion of hero (centered horizontally)
  // End: header position (2.5rem from top, left padding)
  // Note: We need to account for the transform: translate(-50%, -50%) centering
  const headerLeftPadding = viewportWidth >= 1024 ? 64 : 32; // 4rem or 2rem in pixels
  const headerTop = 40; // 2.5rem = 40px
  
  // Estimated width of "SOLUS" text at base size (40px) - approximately 160px
  const estimatedLogoWidth = 160;
  // To account for translate(-50%, -50%), we need to position at headerLeft + half width
  const headerLeft = headerLeftPadding + (estimatedLogoWidth / 2);
  
  // Responsive hero positioning - higher on mobile, lower on desktop
  const heroTopPercent = viewportWidth < 768 ? 0.22 : 0.26;
  const heroTop = viewportHeight * heroTopPercent;
  const heroLeft = viewportWidth * 0.5;
  
  // Interpolate positions
  const currentTop = heroTop + (easedProgress * (headerTop - heroTop));
  const currentLeft = heroLeft + (easedProgress * (headerLeft - heroLeft));
  
  // Responsive scale calculation: smaller multiplier on mobile
  // Mobile: 40px * 2 = 80px, Tablet: 40px * 3 = 120px, Desktop: 40px * 4 = 160px
  const heroScaleMultiplier = viewportWidth < 640 ? 1.5 : viewportWidth < 1024 ? 2.5 : 3.5;
  const scale = 1 + ((1 - easedProgress) * heroScaleMultiplier);
  
  // Keep transform consistent throughout animation for linear trajectory
  const transform = `translate(-50%, -50%) scale(${scale})`;

  return (
    <button
      onClick={() => onNavigate('home')}
      className="font-playfair tracking-luxury"
      style={{
        position: 'fixed',
        top: `${currentTop}px`,
        left: `${currentLeft}px`,
        transform: transform,
        fontSize: '40px', // Base size for header
        fontWeight: 700,
        color: textColor,
        letterSpacing: '0.05em',
        opacity: 1,
        cursor: 'pointer',
        zIndex: 50,
        pointerEvents: 'auto',
        transition: 'opacity 0.2s ease',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.7';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      SOLUS
    </button>
  );
}