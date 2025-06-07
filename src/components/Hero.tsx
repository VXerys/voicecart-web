import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Language } from '../constants/translations';
import mainLogo from '/public/images/person-rocket-1.svg';
import GradientText from './GradientText';

interface HeroProps {
  t: {
    title: string;
    subtitle: string;
    tryDemo: string;
    learnMore: string;
  };
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-16 pb-8 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden relative">
      <div
        className={`absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl transition-all duration-1500 ease-out ${
          isLoaded
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-50 -translate-x-20'
        }`}
      ></div>
      <div
        className={`absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl transition-all duration-1500 ease-out delay-200 ${
          isLoaded
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-50 translate-x-20'
        }`}
      ></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 z-10">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 ease-out ${
                isLoaded
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
            >
              {t.title}
              <GradientText
                colors={['#60a5fa', '#a855f7', '#06b6d4', '#8b5cf6']}
                animationSpeed={4}
                showBorder={false}
                className={`inline-block transform transition-all duration-1200 ease-out delay-300 ${
                  isLoaded
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-8 opacity-0 scale-90'
                }`}
              >
                {' '}
                VoiceCart
              </GradientText>
            </h1>

            <p
              className={`text-gray-300 text-lg md:text-xl mb-8 leading-relaxed transform transition-all duration-1000 ease-out delay-500 ${
                isLoaded
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              {t.subtitle}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transform transition-all duration-1000 ease-out delay-700 ${
                isLoaded
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <button
                onClick={() =>
                  document
                    .getElementById('demo')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full flex items-center justify-center hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all duration-500 group hover:scale-105 active:scale-95 transform ${
                  isLoaded
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-6 opacity-0'
                }`}
                style={{ transitionDelay: isLoaded ? '800ms' : '0ms' }}
              >
                {t.tryDemo}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById('features')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`px-8 py-3 bg-transparent text-white border border-gray-700 rounded-full hover:border-purple-400 hover:bg-purple-400/5 transition-all duration-500 hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transform ${
                  isLoaded
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-6 opacity-0'
                }`}
                style={{ transitionDelay: isLoaded ? '900ms' : '0ms' }}
              >
                {t.learnMore}
              </button>
            </div>
          </div>

          <div
            className={`flex-1 relative z-10 max-w-[400px] mx-auto lg:mx-0 transform transition-all duration-1200 ease-out delay-1000 ${
              isLoaded
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-12 opacity-0 scale-90'
            }`}
          >
            <div className="relative group svg-container">
              <div className="svg-smooth-float">
                <div className="svg-gentle-rotate">
                  <img
                    src={mainLogo}
                    alt="Smart shopping with voice technology"
                    className={`w-full h-auto max-w-full transition-all duration-700 ease-out group-hover:scale-105 svg-main ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      filter:
                        'drop-shadow(0 20px 60px rgba(139, 92, 246, 0.25))',
                      imageRendering: 'crisp-edges',
                      WebkitFontSmoothing: 'antialiased',
                    }}
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-cyan-500/15 rounded-2xl blur-2xl opacity-0 group-hover:opacity-80 transition-all duration-1000 -z-10 scale-110 smooth-glow"></div>
            </div>

            <div
              className={`absolute -top-6 -right-6 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1500 delay-1200 smooth-orbit-1 ${
                isLoaded ? 'opacity-60' : 'opacity-0'
              }`}
            ></div>
            <div
              className={`absolute -bottom-8 -left-8 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1500 delay-1400 smooth-orbit-2 ${
                isLoaded ? 'opacity-45' : 'opacity-0'
              }`}
            ></div>
            <div
              className={`absolute top-1/3 -left-10 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1500 delay-1600 smooth-orbit-3 ${
                isLoaded ? 'opacity-35' : 'opacity-0'
              }`}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .svg-container {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .svg-smooth-float,
        .svg-gentle-rotate {
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        
        .svg-smooth-float {
          animation: smoothFloat 8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          transform-origin: center center;
        }
        
        .svg-gentle-rotate {
          animation: gentleRotate 16s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          transform-style: preserve-3d;
        }
        
        .smooth-glow {
          animation: smoothGlowPulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
        }
        
        .smooth-orbit-1 {
          animation: smoothOrbit1 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        
        .smooth-orbit-2 {
          animation: smoothOrbit2 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .smooth-orbit-3 {
          animation: smoothOrbit3 14s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        
        @keyframes smoothFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-12px) translateX(3px) scale(1.01);
          }
          50% {
            transform: translateY(-18px) translateX(0px) scale(1.02);
          }
          75% {
            transform: translateY(-8px) translateX(-3px) scale(1.01);
          }
        }
        
        @keyframes gentleRotate {
          0% {
            transform: rotateY(0deg) rotateZ(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(2deg) rotateZ(1deg) rotateX(0.5deg);
          }
          50% {
            transform: rotateY(0deg) rotateZ(-1deg) rotateX(-0.5deg);
          }
          75% {
            transform: rotateY(-2deg) rotateZ(0deg) rotateX(0.5deg);
          }
          100% {
            transform: rotateY(0deg) rotateZ(0deg) rotateX(0deg);
          }
        }
        
        @keyframes smoothGlowPulse {
          0% {
            opacity: 0;
            transform: scale(110%) rotate(0deg);
          }
          50% {
            opacity: 0.4;
            transform: scale(120%) rotate(1deg);
          }
          100% {
            opacity: 0.2;
            transform: scale(125%) rotate(0deg);
          }
        }
        
        @keyframes smoothShimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
            opacity: 0;
          }
        }
        
        @keyframes smoothOrbit1 {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(6px, -12px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translate(0px, -16px) rotate(180deg) scale(1.2);
          }
          75% {
            transform: translate(-6px, -8px) rotate(270deg) scale(1.1);
          }
        }
        
        @keyframes smoothOrbit2 {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(-8px, 4px) rotate(120deg) scale(0.9);
          }
          66% {
            transform: translate(4px, -8px) rotate(240deg) scale(1.1);
          }
        }
        
        @keyframes smoothOrbit3 {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
          20% {
            transform: translate(8px, -6px) rotate(72deg) scale(1.2);
          }
          40% {
            transform: translate(2px, -12px) rotate(144deg) scale(0.8);
          }
          60% {
            transform: translate(-6px, -8px) rotate(216deg) scale(1.1);
          }
          80% {
            transform: translate(-4px, 2px) rotate(288deg) scale(0.9);
          }
        }
        
        .svg-container:hover .svg-smooth-float {
          animation-play-state: paused;
        }
        
        .svg-container:hover .svg-gentle-rotate {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .svg-smooth-float,
          .svg-gentle-rotate,
          .smooth-orbit-1,
          .smooth-orbit-2,
          .smooth-orbit-3,
          .smooth-glow,
          .smooth-shimmer {
            animation-duration: 30s;
            animation-timing-function: linear;
          }
        }
        
        .svg-main {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transform: translateZ(0);
        }
        
        .svg-container * {
          transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </section>
  );
};

export default Hero;
