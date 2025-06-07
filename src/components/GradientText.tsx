import React, { useEffect, useState } from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  colors: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors,
  animationSpeed = 2,
  showBorder = false,
  className = '',
}) => {
  const [animationId] = useState(
    () => `gradientAnim${Math.random().toString(36).substr(2, 9)}`
  );
  const gradientColors = colors.join(', ');

  useEffect(() => {
    // Inject keyframes into document head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes ${animationId} {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, [animationId]);

  return (
    <span
      className={className}
      style={{
        background: `linear-gradient(45deg, ${gradientColors})`,
        backgroundSize: '400% 400%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animation: `${animationId} ${animationSpeed}s ease-in-out infinite`,
        display: 'inline-block',
        border: showBorder ? '1px solid transparent' : 'none',
        willChange: 'background-position',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
