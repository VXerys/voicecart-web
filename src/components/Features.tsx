import React, { useEffect, useRef, useState } from 'react';
import { Mic, VolumeX, Brain, BarChart, Zap, Share2 } from 'lucide-react';

interface FeaturesProps {
  t: any;
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}> = ({ icon, title, description, index, isVisible }) => {
  return (
    <div
      className={`bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-700 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] group transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      }}
    >
      <div className="p-3 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg w-fit mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

const Features: React.FC<FeaturesProps> = ({ t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tipsVisible, setTipsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current) {
            setIsVisible(entry.isIntersecting);
          }
          if (entry.target === tipsRef.current) {
            setTipsVisible(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (tipsRef.current) {
      observer.observe(tipsRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (tipsRef.current) {
        observer.unobserve(tipsRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: t.featureCards.voiceRecognition.title,
      description: t.featureCards.voiceRecognition.description,
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: t.featureCards.smartFiltering.title,
      description: t.featureCards.smartFiltering.description,
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: t.featureCards.realTimeBudget.title,
      description: t.featureCards.realTimeBudget.description,
    },
    {
      icon: <VolumeX className="h-6 w-6" />,
      title: t.featureCards.noiseReduction.title,
      description: t.featureCards.noiseReduction.description,
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t.featureCards.noInstallation.title,
      description: t.featureCards.noInstallation.description,
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: t.featureCards.listExport.title,
      description: t.featureCards.listExport.description,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent"></div>
      <div className="absolute -top-10 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Header dengan animasi */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.featuresTitle}
          </h2>
          <p className="text-gray-400 text-lg">
            {t.featuresSubtitle}
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Voice Input Tips section dengan animasi terpisah */}
        <div
          ref={tipsRef}
          className={`mt-16 p-6 md:p-8 bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-700 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] max-w-3xl mx-auto transform ${
            tipsVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-8 opacity-0 scale-95'
          }`}
          style={{
            transitionDelay: tipsVisible ? '300ms' : '0ms',
          }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            {t.voiceInputTips.title}
          </h3>
          <ul className="space-y-3 text-gray-300">
            {t.voiceInputTips.tips.map((tip: string, index: number) => (
              <li
                key={index}
                className={`flex items-start transform transition-all duration-500 ${
                  tipsVisible
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-6 opacity-0'
                }`}
                style={{
                  transitionDelay: tipsVisible
                    ? `${500 + index * 100}ms`
                    : '0ms',
                }}
              >
                <span className="bg-purple-500/20 text-purple-400 rounded-full p-1 mr-3 mt-1 transition-transform duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;