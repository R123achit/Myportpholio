import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    let rafId;

    const updateMousePosition = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const isInteractive = 
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.closest('button') ||
        e.target.closest('a');

      isHovering.current = isInteractive;
    };

    const animate = () => {
      // Peak-level smooth cursor dot (ultra-fast response - 70% speed)
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.7;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.7;

      // Smooth ring (fast follow - 35% speed)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.35;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.35;

      // Smooth trail (medium follow - 15% speed)
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.15;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.15;

      // Use transform for GPU acceleration instead of left/top
      if (cursorDotRef.current) {
        const scale = isHovering.current ? 1.5 : 1;
        cursorDotRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      if (cursorRingRef.current) {
        const scale = isHovering.current ? 1.8 : 1;
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot - Ultra smooth */}
      <div
        ref={cursorDotRef}
        className="fixed w-2.5 h-2.5 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ 
          willChange: 'transform',
          transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      />

      {/* Cursor ring - Smooth follow */}
      <div
        ref={cursorRingRef}
        className="fixed w-7 h-7 border-2 border-purple-500/80 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{ 
          willChange: 'transform',
          transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      />

      {/* Cursor trail - Smooth trail effect */}
      <div
        ref={cursorTrailRef}
        className="fixed w-14 h-14 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full pointer-events-none z-[9997] blur-xl hidden md:block"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      />
    </>
  );
};

export default CustomCursor;
