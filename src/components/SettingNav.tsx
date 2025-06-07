import React, { useRef, useEffect, useState } from 'react';

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  onItemClick?: (href: string) => void;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 12,
  particleDistances = [70, 8],
  particleR = 80,
  timeVariance = 200,
  colors = [1, 2, 3, 4],
  initialActiveIndex = 0,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number
  ) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    // Clear existing particles
    const existingParticles = element.querySelectorAll('.particle');
    existingParticles.forEach((p) => p.remove());

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color})`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);

        requestAnimationFrame(() => {
          element.classList.add('active');
        });

        setTimeout(() => {
          try {
            if (element.contains(particle)) {
              element.removeChild(particle);
            }
          } catch {}
        }, t);
      }, 30);
    }
  };

  const updateActiveBackground = (targetElement?: HTMLElement) => {
    if (!backgroundRef.current || !navRef.current) return;

    const activeElement =
      targetElement || (navRef.current.children[activeIndex] as HTMLElement);
    if (!activeElement) return;

    // Calculate position relative to the nav list
    let left = 0;
    for (let i = 0; i < activeIndex; i++) {
      const sibling = navRef.current.children[i] as HTMLElement;
      if (sibling) {
        left += sibling.offsetWidth + 4; // 4px is the gap
      }
    }

    const width = activeElement.offsetWidth;

    backgroundRef.current.style.cssText = `
      position: absolute;
      left: ${left}px;
      top: 0;
      width: ${width}px;
      height: 100%;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8));
      border-radius: 9999px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
    `;
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    const element = e.currentTarget;
    if (activeIndex === index) return;

    setActiveIndex(index);

    // Update background position immediately
    updateActiveBackground(element);

    // Create particles
    makeParticles(element);

    if (onItemClick) {
      onItemClick(items[index].href);
    }
  };

  useEffect(() => {
    updateActiveBackground();

    const handleResize = () => {
      updateActiveBackground();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
          :root {
            --color-1: #8B5CF6;
            --color-2: #A78BFA;
            --color-3: #C4B5FD;
            --color-4: #3B82F6;
          }
          .gooey-nav-container {
            background: transparent;
            border-radius: 9999px;
            padding: 4px;
            position: relative;
            overflow: visible;
          }
          .gooey-nav-item {
            position: relative;
            z-index: 2;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 500;
            font-size: 14px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            padding: 10px 20px;
            border-radius: 9999px;
            text-decoration: none;
            display: block;
            user-select: none;
          }
          .gooey-nav-item:hover {
            color: rgba(255, 255, 255, 0.9);
            transform: translateY(-1px);
          }
          .gooey-nav-item.active {
            color: white;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
          }
          .gooey-nav-list {
            display: flex;
            gap: 4px;
            list-style: none;
            margin: 0;
            padding: 0;
            position: relative;
            z-index: 2;
          }
          .gooey-nav-list li {
            position: relative;
            overflow: visible;
          }
          
          /* Particle Animation Styles */
          .particle {
            position: absolute;
            top: calc(50% - 10px);
            left: calc(50% - 10px);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            opacity: 0;
            animation: particle var(--time, 1200ms) ease-out forwards;
          }
          
          .point {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: var(--color);
            opacity: 0;
            transform: scale(0);
            animation: point var(--time, 1200ms) ease-out forwards;
          }
          
          @keyframes particle {
            0% {
              transform: translate(var(--start-x), var(--start-y)) rotate(0deg) scale(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            20% {
              transform: translate(var(--start-x), var(--start-y)) rotate(calc(var(--rotate) * 0.1)) scale(var(--scale));
              opacity: 1;
            }
            70% {
              transform: translate(var(--end-x), var(--end-y)) rotate(calc(var(--rotate) * 0.7)) scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: translate(calc(var(--end-x) * 0.3), calc(var(--end-y) * 0.3)) rotate(var(--rotate)) scale(0);
              opacity: 0;
            }
          }
          
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            20% {
              transform: scale(calc(var(--scale) * 0.5));
              opacity: 1;
            }
            50% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            80% {
              transform: scale(calc(var(--scale) * 0.8));
              opacity: 0.8;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
        `}
      </style>

      <div className="gooey-nav-container" ref={containerRef}>
        <div ref={backgroundRef} />
        <ul className="gooey-nav-list" ref={navRef}>
          {items.map((item, index) => (
            <li key={index} onClick={(e) => handleClick(e, index)}>
              <a
                href={item.href}
                className={`gooey-nav-item ${
                  activeIndex === index ? 'active' : ''
                }`}
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GooeyNav;
