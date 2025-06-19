import React from 'react';
import AnimatedSection from './AnimatedSection';

type SectionTitleProps = {
  icon?: React.ElementType;
  title: string;
  subtitle: string;
  iconColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  as?: 'h1' | 'h2';
};

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  iconColor="text-blue-600", 
  titleColor="text-gray-800", 
  subtitleColor="text-gray-600",
  as: HeadingTag = 'h2' 
}) => (
  <AnimatedSection>
    <div className="text-center mb-10 md:mb-16">
      {Icon && <Icon className={`w-14 h-14 mx-auto mb-4 ${iconColor}`} />}
      <HeadingTag className={`text-3xl md:text-4xl font-extrabold mb-3 ${titleColor}`}>{title}</HeadingTag>
      <p className={`md:text-lg max-w-3xl mx-auto ${subtitleColor}`}>{subtitle}</p>
    </div>
  </AnimatedSection>
);

export default SectionTitle; 